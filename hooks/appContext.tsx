import { createContext, useState, useContext, useEffect, type PropsWithChildren } from 'react';
import { AppContextType, StudentProfile } from '@/constants/types';
import { studentService } from '@/services/student';
import { useSession } from '@/hooks/ctx';

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: PropsWithChildren) {
    const [profile, setProfile] = useState<StudentProfile | null>(null);
    const updateProfile = (newProfile: StudentProfile) => setProfile(newProfile);
    const { user } = useSession();

    useEffect(() => {
        async function getStudentProfile(){
            try {
                await studentService.getStudentProfile(user?.id!)
                .then((response) => updateProfile(response));
            } catch (error) {
                console.error("Error fetching enrolled courses:", error);
            }
        }

        getStudentProfile();
    }, []);
    console.log(profile);

    return (
        <AppContext.Provider value={{ profile, updateProfile}}
        >
            {children}
        </AppContext.Provider>
    );
};


export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within AppContextProvider");
    }
    return context;
}

import { createContext, useState, useContext, type PropsWithChildren } from 'react';
import { AppContextType, StudentProfile } from '@/constants/types';

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: PropsWithChildren) {
    const [profile, setProfile] = useState<StudentProfile | null>(null);
    const updateProfile = (newProfile: StudentProfile) => setProfile(newProfile);

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

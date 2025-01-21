import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import { useAuth } from './useAuth';
import type { SignUpCredentials, UserProfile, StudentProfile } from '@/constants/types';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
    user: UserProfile | null;
    student: StudentProfile | null;
    loading: boolean;
    error: string | null;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    signup: (credetials: SignUpCredentials) => Promise<number>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    student: null,
    loading: false,
    error: null,
    login: async () => {},
    signup: async () => 0,
    logout: async () => {},
    isAuthenticated: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);

    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

// get user from storage
async function getUserFromStorage() {
    const user = await SecureStore.getItemAsync('user');
    return user ? JSON.parse(user) : null;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const auth = useAuth();
    console.log("Context called", auth.user);

    // print user info from storage
    getUserFromStorage().then((user) => {
        console.log("User from storage", user);
    });
    return (
    <AuthContext.Provider
        value={auth}>
        {children}
    </AuthContext.Provider>
    );
}

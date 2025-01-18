import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import { useAuth } from './useAuth';
import type { UserProfile } from '@/constants/types';

interface LoginProps {
    email: string;
    password: string;
}

const user = {
    name: 'simcodes',
    email: 'sim@gmail.com',
    password: '123456',
}

interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false,
    error: null,
    login: async () => {},
    logout: async () => {},
    isAuthenticated: false,
});

// const AuthContext = createContext<{
//     signIn: (props: LoginProps) => void
//     signOut: () => void;
//     session?: string | null;
//     isLoading: boolean;
// }>({
//     signIn: () => null,
//     signOut: () => null,
//     session: null,
//     isLoading: false,
// });

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

export function SessionProvider({ children }: PropsWithChildren) {
    const auth = useAuth();
    return (
    <AuthContext.Provider
        value={auth}>
        {children}
    </AuthContext.Provider>
    );
}

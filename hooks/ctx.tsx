import { useContext, createContext, type PropsWithChildren } from 'react';
import { useAuth } from './useAuth';
import type { SignUpCredentials, UserProfile } from '@/constants/types';

interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    isTokenLoading: boolean;
    error: string | null;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    signup: (credetials: SignUpCredentials) => Promise<number | undefined>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false,
    isTokenLoading: false,
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

export function SessionProvider({ children }: PropsWithChildren) {
    const auth = useAuth();

    return (
    <AuthContext.Provider
        value={auth}>
        {children}
    </AuthContext.Provider>
    );
}

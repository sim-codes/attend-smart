import { createContext, useContext } from 'react';
import { useAuth } from '@/hooks/useAuth';
import type { UserProfile } from '@/constants/types';

interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<ReturnType<typeof useAuth> | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const auth = useAuth();

    return (
    <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
    );
}

export function useSession() {
    const context = useContext(AuthContext);
        if (!context) {
    throw new Error('useSession must be used within AuthProvider');
    }
    return context;
}
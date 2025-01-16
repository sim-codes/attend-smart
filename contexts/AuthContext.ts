// contexts/AuthContext.ts
import { createContext } from 'react';
import type { UserProfile } from '@/constants/types';

export interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
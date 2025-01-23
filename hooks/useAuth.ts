import { useCallback, useReducer, useEffect } from 'react';
import { useTokenStorage } from '../services/tokenStorage';
import { useUserStorage } from './useUserStorage';
import { authService } from '@/services/auth';
import type { LoginCredentials, SignUpCredentials, UserProfile } from '@/constants/types';

interface AuthState {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
}

type AuthAction =
    | { type: 'SET_LOADING' }
    | { type: 'SET_USER'; payload: UserProfile }
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'CLEAR_ERROR' }
    | { type: 'LOGOUT' };

const initialState: AuthState = {
    user: null,
    loading: false, // Changed from true since we use tokensLoading
    error: null
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: true, error: null };
        case 'SET_USER':
            return { ...state, user: action.payload, loading: false, error: null };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'CLEAR_ERROR':
            return { ...state, error: null };
        case 'LOGOUT':
            return { ...initialState };
        default:
            return state;
    }
}

export function useAuth() {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const { tokens, setTokens, loading: tokensLoading } = useTokenStorage();
    const { user, setUser } = useUserStorage();

    const clearError = useCallback(() => {
        dispatch({ type: 'CLEAR_ERROR' });
    }, []);

    const signup = useCallback(async (credentials: SignUpCredentials) => {
        try {
            dispatch({ type: 'SET_LOADING' });
            const statusCode = await authService.signup(credentials);
            dispatch({ type: 'LOGOUT' });
            return statusCode;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An error occurred during signup";
            dispatch({ type: 'SET_ERROR', payload: errorMessage });
            throw err;
        }
    }, []);

    const login = useCallback(async (credentials: LoginCredentials) => {
        try {
            dispatch({ type: 'SET_LOADING' });
            const response = await authService.login(credentials);
            await setTokens(response.data?.token!);
            await setUser(response.data?.user!);
            dispatch({ type: 'SET_USER', payload: response.data?.user! });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            dispatch({ type: 'SET_ERROR', payload: errorMessage });
            throw error;
        }
    }, [setTokens, setUser]);

    const logout = useCallback(async () => {
        try {
            dispatch({ type: 'SET_LOADING' });
            await setTokens(null);
            await setUser(null);
            dispatch({ type: 'LOGOUT' });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Logout failed' });
            throw error;
        }
    }, [setTokens, setUser]);

    useEffect(() => {
        if (!tokensLoading) {
            if (tokens && !user) {
                logout().catch(console.error);
            } else if (user) {
                dispatch({ type: 'SET_USER', payload: user });
            } else {
                dispatch({ type: 'LOGOUT' });
            }
        }
        dispatch({ type: 'LOGOUT' });
    }, [tokensLoading]);

    return {
        user: state.user,
        loading: state.loading,
        isTokenLoading: tokensLoading,
        error: state.error,
        login,
        signup,
        logout,
        clearError,
        isAuthenticated: !!state.user && !!tokens
    };
}

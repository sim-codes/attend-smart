// hooks/useAuth.ts
import { useCallback, useReducer, useEffect } from 'react';
import { useTokenStorage } from '../services/tokenStorage';
import { authService } from '@/services/auth';
import type { LoginCredentials, UserProfile } from '@/constants/types';

interface AuthState {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
}

type AuthAction =
    | { type: 'SET_LOADING' }
    | { type: 'SET_USER'; payload: UserProfile }
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'LOGOUT' };

const initialState: AuthState = {
    user: null,
    loading: true,
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
        case 'LOGOUT':
        return { ...state, user: null, loading: false, error: null };
        default:
        return state;
    }
}

export function useAuth() {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const { tokens, setTokens, loading: tokensLoading } = useTokenStorage();

    const login = useCallback(async (credentials: LoginCredentials) => {
        try {
            dispatch({ type: 'SET_LOADING' });
            const response = await authService.login(credentials);
            await setTokens(response.token);
            dispatch({ type: 'SET_USER', payload: response.user });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Login failed' });
            throw error;
        }
    }, [setTokens]);

    const logout = useCallback(async () => {
        await setTokens(null);
        dispatch({ type: 'LOGOUT' });
    }, [setTokens]);

  // Initialize auth state
    useEffect(() => {
        if (!tokensLoading) {
        if (tokens) {
            authService.getCurrentUser()
            .then(user => dispatch({ type: 'SET_USER', payload: user }))
            .catch(() => logout());
        } else {
            dispatch({ type: 'LOGOUT' });
        }
        }
    }, [tokens, tokensLoading, logout]);

    return {
        user: state.user,
        loading: state.loading || tokensLoading,
        error: state.error,
        login,
        logout,
        isAuthenticated: !!state.user
    };
}

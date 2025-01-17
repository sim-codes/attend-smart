// hooks/useAuth.ts
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
    const { user, setUser } = useUserStorage();

    const signup = async (credentials: SignUpCredentials) => {
        try {
            dispatch({ type: 'SET_LOADING' });
            const statusCode = await authService.signup(credentials);
            dispatch({ type: 'LOGOUT'});
            return statusCode;
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err instanceof  Error ? err.message : "An error occured during signup"});
            throw err;
        }
    }

    const login = useCallback(async (credentials: LoginCredentials) => {
        try {
            dispatch({ type: 'SET_LOADING' });
            const response = await authService.login(credentials);
            await setTokens(response.token);
            await setUser(response.user);
            dispatch({ type: 'SET_USER', payload: response.user });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Login failed' });
            throw error;
        }
    }, [setTokens, setUser]);

    const logout = useCallback(async () => {
        await setTokens(null);
        await setUser(null);
        dispatch({ type: 'LOGOUT' });
    }, [setTokens, setUser]);

  // Initialize auth state
    useEffect(() => {
        const checkAuth = async () => {
            const storedUser = await authService.getStoredUserData();
            if (storedUser) {
                dispatch({ type: 'SET_USER', payload: storedUser })
            } else {
                dispatch({ type: 'LOGOUT' });
            }
        };
        checkAuth();
    }, []);

    return {
        user: state.user,
        loading: state.loading || tokensLoading,
        error: state.error,
        login,
        signup,
        logout,
        isAuthenticated: !!state.user
    };
}

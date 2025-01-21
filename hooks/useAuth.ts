// hooks/useAuth.ts
import { useCallback, useReducer, useEffect } from 'react';
import { useTokenStorage } from '../services/tokenStorage';
import { useUserStorage } from './useUserStorage';
import { authService } from '@/services/auth';
import { studentService } from '@/services/student';
import type { LoginCredentials, SignUpCredentials, UserProfile, StudentProfile } from '@/constants/types';

interface AuthState {
    user: UserProfile | null;
    student: StudentProfile | null;
    loading: boolean;
    error: string | null;
}

type AuthAction =
    | { type: 'SET_LOADING' }
    | { type: 'SET_USER'; payload: UserProfile }
    | { type: 'SET_STUDENT'; payload: StudentProfile }
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'LOGOUT' };

const initialState: AuthState = {
    user: null,
    student: null,
    loading: true,
    error: null
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'SET_LOADING':
        return { ...state, loading: true, error: null };
        case 'SET_USER':
        return { ...state, user: action.payload, loading: false, error: null };
        case 'SET_STUDENT':
        return { ...state, student: action.payload, loading: false, error: null };
        case 'SET_ERROR':
        return { ...state, error: action.payload, loading: false };
        case 'LOGOUT':
        return { ...state, user: null, loading: false, error: null };
        default:
        return state;
    }
}

export function useAuth() {
    console.log("useAuth called");
    const [state, dispatch] = useReducer(authReducer, initialState);
    const { tokens, setTokens, loading: tokensLoading } = useTokenStorage();
    const { user, setUser } = useUserStorage();
    console.log("User from useAuth", user);

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
        user ? dispatch({ type: 'SET_USER', payload: user }) : dispatch({ type: 'LOGOUT' });
    }, []);

    return {
        user: state.user,
        student: state.student,
        loading: state.loading || tokensLoading,
        error: state.error,
        login,
        signup,
        logout,
        isAuthenticated: !!state.user
    };
}

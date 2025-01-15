import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '@/hooks/useStorageState';

interface LoginProps {
    email: string;
    password: string;
}

const user = {
    name: 'simcodes',
    email: 'sim@gmail.com',
    password: '123456',
}

const AuthContext = createContext<{
    signIn: (props: LoginProps) => void
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
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
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
    <AuthContext.Provider
        value={{
        signIn: ({ email, password }: LoginProps) => {
            if (email === user.email && password === user.password) {
                setSession(email);
            }
        },
        signOut: () => {
            setSession(null);
        },
        session,
        isLoading,
        }}>
        {children}
    </AuthContext.Provider>
    );
}

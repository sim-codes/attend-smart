import { setStorageItemAsync, useStorageState } from '@/services/storage';
import type { UserProfile } from '@/constants/types';
import { useCallback } from 'react';

const USER_STORAGE_KEY = 'user';

export function useUserStorage() {
    const [[_, user], setUserState] = useStorageState(USER_STORAGE_KEY);

    const setUser = useCallback(async (userData: UserProfile | null) => {
        if (userData) {
            await setUserState(JSON.stringify(userData));
        } else {
            await setUserState(null);
        }
    }, [setUserState]);

    return {
        user: user ? (JSON.parse(user) as UserProfile) : null,
        setUser,
        loading: user === undefined
    };
}

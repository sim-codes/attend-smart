import { useCallback } from 'react';
import { setStorageItemAsync, useStorageState } from './storage';
import { TokenDto } from '@/constants/types';

const TOKEN_STORAGE_KEYS = {
    ACCESS_TOKEN: 'auth.token.access',
    REFRESH_TOKEN: 'auth.token.refresh'
} as const;

export function useTokenStorage() {
    const [accessToken, setAccessToken] = useStorageState(TOKEN_STORAGE_KEYS.ACCESS_TOKEN);
    const [refreshToken, setRefreshToken] = useStorageState(TOKEN_STORAGE_KEYS.REFRESH_TOKEN);

    const setTokens = useCallback(async (tokens: TokenDto | null) => {
    if (tokens) {
        await setAccessToken(tokens.accessToken);
        await setRefreshToken(tokens.refreshToken);
    } else {
        await setAccessToken(null);
        await setRefreshToken(null);
    }
    }, [setAccessToken, setRefreshToken]);

    return {
    tokens: accessToken && refreshToken ? { accessToken, refreshToken } : null,
    setTokens,
    loading: accessToken === undefined || refreshToken === undefined
    };
}

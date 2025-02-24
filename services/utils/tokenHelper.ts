import { updateToken, logout } from '@/store/slices/authSlice';

const getStore = () => require('@/store/store').store;

export const tokenHelperService = {

    getAccessToken(): string | null {
        return getStore().getState().auth.accessToken || null;
    },

    getRefreshToken(): string | null {
        return getStore().getState().auth.refreshToken || null;
    },

    updateAccessToken(accessToken: string): void {
        getStore().dispatch(updateToken({ accessToken }));
    },

    clearTokens(): void {
        getStore().dispatch(logout());
    }
};

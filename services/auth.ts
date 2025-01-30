import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import type { LoginCredentials,
    LoginResponse, UserProfile,
    SignUpCredentials,
    CodeResponse, ChangePasswordCredentials
} from '@/constants/types';
import * as SecureStore from 'expo-secure-store';
import { ServiceHandler } from './utils/serviceHandler';

export const authService = {
    async login(credentials: LoginCredentials) {
        return ServiceHandler.execute<LoginResponse>(() =>
            apiClient.post(API_ENDPOINTS.authentication.login, credentials)
        );
    },

    async signup(credentials: SignUpCredentials) {
        return ServiceHandler.execute<CodeResponse>(() =>
            apiClient.post(API_ENDPOINTS.authentication.register, credentials)
        );
    },

    async changeStudentPassword(credentials: ChangePasswordCredentials) {
        return await ServiceHandler.execute<CodeResponse>(() =>
            apiClient.post(API_ENDPOINTS.authentication.changePassword, credentials)
        );
    },

    async getStoredUserData(): Promise<UserProfile | null> {
        const userData = await SecureStore.getItemAsync('auth.user');
        return userData ? JSON.parse(userData) : null;
    },

    async isAuthenticated() {
        const userData = await SecureStore.getItemAsync('auth.user');
        return !!userData;
    }
};

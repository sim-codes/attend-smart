import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import type { LoginCredentials,
    LoginResponse, UserProfile,
    SignUpCredentials,
    SignupResponse
} from '@/constants/types';
import * as SecureStore from 'expo-secure-store';
import { ServiceHandler } from './serviceHandler';

export const authService = {
    async login(credentials: LoginCredentials) {
        return ServiceHandler.execute<LoginResponse>(() =>
            apiClient.post(API_ENDPOINTS.authentication.login, credentials)
        );
    },

    async signup(credentials: SignUpCredentials) {
        const response = await ServiceHandler.execute<SignupResponse>(() =>
            apiClient.post(API_ENDPOINTS.authentication.register, credentials)
        );

        return response.data?.status;
    },

    async getCurrentUser() {
        return ServiceHandler.execute<UserProfile>(() =>
            apiClient.get(API_ENDPOINTS.student.getSingle.replace('{id}', 'me'))
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

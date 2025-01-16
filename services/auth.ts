import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import type { LoginCredentials, LoginResponse, UserProfile } from '@/constants/types';

export const authService = {
    async login(credentials: LoginCredentials) {
        console.log("From auth services:", credentials)
        const response = await apiClient.post<LoginResponse>(
            API_ENDPOINTS.authentication.login,
            credentials
        );
        console.log("Response auth services:", response)
        return response;
    },

    async getCurrentUser() {
        return await apiClient.get<UserProfile>(
            API_ENDPOINTS.student.getSingle.replace('{id}', 'me')
        );
    },
};

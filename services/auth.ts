// services/auth.ts
import { apiClient } from './api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import type { LoginCredentials, LoginResponse, UserProfile } from '@/constants/types';

export const authService = {
    async login(credentials: LoginCredentials) {
    const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.authentication.login,
        credentials
    );
    return response.data;
    },

    async getCurrentUser() {
        const response = await apiClient.get<UserProfile>(
            API_ENDPOINTS.student.getSingle.replace('{id}', 'me')
        );
        return response.data;
    }
};

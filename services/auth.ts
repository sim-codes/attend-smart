import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import type { LoginCredentials, LoginResponse, UserProfile } from '@/constants/types';
import { API_CONFIG } from '../constants/config';
import axios from 'axios';
import { useSession } from '@/hooks/useSession';

export const authService = {
    async login(credentials: LoginCredentials) {
        try {
            return await apiClient.post<LoginResponse>(
                API_ENDPOINTS.authentication.login,
                credentials
            );
        } catch (error) {
            console.error("Error during login request:", error);
            if (axios.isAxiosError(error)) {
                console.log('Network Error Details:', {
                    message: error.message,
                    code: error.code,
                    // @ts-ignore
                    response: error.response?.data,
                    // @ts-ignore
                    status: error.response?.status,
                    url: error.config?.url
                });
            }
            throw error;
        }
    },

    async getCurrentUser() {
        return await apiClient.get<UserProfile>(
            API_ENDPOINTS.student.getSingle.replace('{id}', 'me')
        );
        return;
    },
};

import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { ChangePasswordCredentials } from '@/constants/types/forms';
import { UserProfile, LoginResponse, LoginCredentials, SignUpCredentials } from '@/constants/types/auth';
import { CodeResponse } from '@/constants/types/api';
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
    }
};

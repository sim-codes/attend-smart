import axios from 'axios';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { TokenDto, LoginResponse } from '@/constants/types';
import { API_CONFIG } from '@/constants/config';
import * as SecureStore from 'expo-secure-store';
import { setStorageItemAsync } from '@/services/storage';

const BASE_URL = API_CONFIG.BASE_URL;

export const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
});

// Add token to requests
apiClient.interceptors.request.use(async (config) => {
    try {
    const accessToken = await SecureStore.getItemAsync('auth.token.access');

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
    } catch (error) {
        return Promise.reject(error);
    }
});

// Handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const accessToken = await SecureStore.getItemAsync('auth.token.access');
            const refreshToken = await SecureStore.getItemAsync('auth.token.refresh');

            if (!accessToken || !refreshToken) {
                throw new Error('No tokens available');
            }

            // Call refresh endpoint
            const response = await axios.post<LoginResponse>(
                `${BASE_URL}${API_ENDPOINTS.authentication.refreshToken}`,
                { accessToken, refreshToken }
            );

            // Store new tokens
            await setStorageItemAsync('auth.token.access', response.data.token.accessToken);
            await setStorageItemAsync('auth.token.refresh', response.data.token.refreshToken);

            // Retry original request
            originalRequest.headers.Authorization = `Bearer ${response.data.token.accessToken}`;
            return apiClient(originalRequest);
        } catch (refreshError) {
            // Clear tokens on refresh failure
            await setStorageItemAsync('auth.token.access', null);
            await setStorageItemAsync('auth.token.refresh', null);
            return Promise.reject(refreshError);
        }
    }

        return Promise.reject(error);
    }
);

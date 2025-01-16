// services/api.ts
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { API_ENDPOINTS, PUBLIC_ENDPOINTS } from '@/constants/endpoints';
import { TokenDto, LoginResponse } from '@/constants/types';
import * as SecureStore from 'expo-secure-store';
import { setStorageItemAsync } from './storage';
import { API_CONFIG } from '@/constants/config';

const BASE_URL = API_CONFIG.BASE_URL;

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    console.log('Initializing API client with BASE_URL:', BASE_URL);
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        console.log('Request Config:', {
          url: config.url,
          method: config.method,
          headers: config.headers,
          data: config.data
      });

        const isPublicEndpoint = PUBLIC_ENDPOINTS.some(
          endpoint => config.url?.includes(endpoint)
        );

        if (!isPublicEndpoint) {
          const accessToken = await SecureStore.getItemAsync('auth.token.access');
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {

        const originalRequest = error.config;

        const isPublicEndpoint = PUBLIC_ENDPOINTS.some(
          endpoint => originalRequest.url?.includes(endpoint)
        );

        if (error.response?.status === 401 && !isPublicEndpoint && !originalRequest._retry) {
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

            // Update authorization header
            originalRequest.headers.Authorization = `Bearer ${response.data.token.accessToken}`;
            return this.client(originalRequest);
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
  }

  // Generic request method with type safety
  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle specific API errors
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
      }
      throw error;
    }
  }

  // HTTP verbs with type safety
  async get<T>(url: string, params?: object): Promise<T> {
    return this.request<T>({
      method: 'GET',
      url,
      params,
    });
  }

  async post<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    console.log("From api services:", data)
    return this.request<T>({
      method: 'POST',
      url,
      data,
      ...config,
    });
  }

  async put<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      method: 'PUT',
      url,
      data,
      ...config,
    });
  }

  async patch<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      method: 'PATCH',
      url,
      data,
      ...config,
    });
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      method: 'DELETE',
      url,
      ...config,
    });
  }

  // Form data method for file uploads
  async postForm<T>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      method: 'POST',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    });
  }

  // Method to upload multiple files
  async uploadFiles<T>(url: string, files: File[], additionalData?: object): Promise<T> {
    const formData = new FormData();
    
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
    }

    return this.postForm<T>(url, formData);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export type for use in services
export type ApiClientType = InstanceType<typeof ApiClient>;

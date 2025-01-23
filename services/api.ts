// services/api.ts
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { API_ENDPOINTS, PUBLIC_ENDPOINTS } from '@/constants/endpoints';
import { LoginResponse } from '@/constants/types';
import * as SecureStore from 'expo-secure-store';
import { setStorageItemAsync } from './storage';
import { API_CONFIG } from '@/constants/config';

const BASE_URL = API_CONFIG.BASE_URL;

class ApiClient {
  private client: AxiosInstance;

  constructor() {
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
        console.log(error.response?.status)

        if (error.response?.status === 401 && !isPublicEndpoint && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const accessToken = await SecureStore.getItemAsync('auth.token.access');
            const refreshToken = await SecureStore.getItemAsync('auth.token.refresh');

            if (!accessToken || !refreshToken) {
              throw new Error('No tokens available');
            }

            const payload = {
              accessToken: accessToken,
              refreshToken: refreshToken
            }

            // Call refresh endpoint
            const response = await axios.post<LoginResponse>(
              `${BASE_URL}${API_ENDPOINTS.authentication.refreshToken}`,
              payload
            );

            console.log('Token Refreshed:', response);

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

  private async request<T, H = undefined>(
    config: AxiosRequestConfig,
    includeHeaders?: boolean
  ): Promise<H extends undefined ? T : { data: T; headers: any }> {
    try {
      const response = await this.client(config);

      if (includeHeaders) {
        return {
          data: response.data,
          headers: response.headers
        } as H extends undefined ? T : { data: T; headers: any };
      }

      return response.data as H extends undefined ? T : { data: T; headers: any };
    } catch (error) {
      throw axios.isAxiosError(error)
        ? new Error(error.response?.data?.message || error.message)
        : error;
    }
  }

  async get<T, H = undefined>(
    url: string,
    params?: object,
    includeHeaders?: boolean
  ): Promise<H extends undefined ? T : { data: T; headers: any }> {
    return this.request<T, H>({ method: 'GET', url, params }, includeHeaders);
  }

  async post<T, H = undefined>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig,
    includeHeaders?: boolean
  ): Promise<H extends undefined ? T : { data: T; headers: any }> {
    return this.request<T, H>({
      method: 'POST',
      url,
      data,
      ...config,
    }, includeHeaders);
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

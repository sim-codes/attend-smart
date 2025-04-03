import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_ENDPOINTS, PUBLIC_ENDPOINTS } from '@/constants/endpoints';
import { TokenDto } from '@/constants/types/auth';
import { tokenHelperService } from './utils/tokenHelper';
import { updateToken, logout } from '@/store/slices/authSlice';
import { API_CONFIG } from '@/constants/config';

export const BASE_URL = API_CONFIG.BASE_URL;

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
          const accessToken = tokenHelperService.getAccessToken();

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
          endpoint => originalRequest.url === endpoint
        );

        if (error.response?.status === 401 && !isPublicEndpoint && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const accessToken = tokenHelperService.getAccessToken();
            const refreshToken = tokenHelperService.getRefreshToken();

            if (!accessToken || !refreshToken) {
              throw new Error('No tokens available');
            }

            const payload = {
              accessToken: accessToken,
              refreshToken: refreshToken
            };

            // Call refresh endpoint
            const response = await axios.post<TokenDto>(
              `${BASE_URL}${API_ENDPOINTS.authentication.refreshToken}`,
              payload
            );

            // Update token in Redux store
            tokenHelperService.updateAccessToken(response.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return this.client(originalRequest);

          } catch (refreshError) {
            tokenHelperService.clearTokens();
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

  // Rest of the methods remain the same
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

export const apiClient = new ApiClient();
export type ApiClientType = InstanceType<typeof ApiClient>;

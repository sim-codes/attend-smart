import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { EnrollmentResponse } from '@/constants/types';

export const enrollmentService = {
    async getEnrolledCourses(studentId: string) {
        try {
            return await apiClient.get<EnrollmentResponse[]>(
                API_ENDPOINTS.enrollment.getAll.replace('{studentId}', studentId)
            );
        } catch (error) {
            console.error("Error during get enrolled courses request:", error);
            if (axios.isAxiosError(error)) {
                console.log('Network Error Details:', {
                    message: error.message,
                    code: error.code,
                    response: error.response?.data,
                    status: error.response?.status,
                    url: error.config?.url
                });
            }
            throw error;
        }
    }
}

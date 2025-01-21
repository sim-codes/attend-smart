import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import axios from 'axios';
import { StudentProfile } from '@/constants/types';

export const studentService = {
    async getStudentProfile(studentId: string) {
        try {
            return await apiClient.get<StudentProfile>(
                API_ENDPOINTS.student.getSingle.replace('{id}', studentId)
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

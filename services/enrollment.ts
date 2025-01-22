import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import axios from 'axios';
import { EnrollmentResponse } from '@/constants/types';
import { ServiceHandler } from './serviceHandler';

export const enrollmentService = {
    async getEnrolledCourses(studentId: string) {
        return ServiceHandler.execute<EnrollmentResponse>(() =>
            apiClient.get(API_ENDPOINTS.enrollment.getAll.replace('{studentId}', studentId))
        );
    }
}

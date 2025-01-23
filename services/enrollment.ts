import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { EnrollmentResponse, CourseApiResponse, EnrollmentPayload } from '@/constants/types';
import { ServiceHandler } from './serviceHandler';

export const enrollmentService = {
    async getEnrolledCourses(studentId: string) {
        return ServiceHandler.execute<EnrollmentResponse[]>(() =>
            apiClient.get(API_ENDPOINTS.enrollment.getAll.replace('{studentId}', studentId))
        );
    },

    async enrollStudentInCourse(studentId: string, payload: EnrollmentPayload) {
        return ServiceHandler.execute<CourseApiResponse>(() =>
            apiClient.post(API_ENDPOINTS.enrollment.create.replace('{studentId}', studentId), payload)
        );
    }
}

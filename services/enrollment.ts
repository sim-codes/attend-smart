import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { EnrollmentResponse, CourseApiResponse, EnrollmentPayload } from '@/constants/types';
import { ServiceHandler } from './utils/serviceHandler';

export const enrollmentService = {
    async getEnrolledCourses(studentId: string) {
        return ServiceHandler.execute<EnrollmentResponse[]>(() =>
            apiClient.get(API_ENDPOINTS.enrollment.getAll(studentId))
        );
    },

    async enrollStudentInCourse(studentId: string, payload: EnrollmentPayload) {
        return ServiceHandler.execute<CourseApiResponse>(() =>
            apiClient.post(API_ENDPOINTS.enrollment.create(studentId), payload)
        );
    },

    async removeEnrolledCourse(studentId: string, courseId: string ) {
        return ServiceHandler.execute(() =>
            apiClient.delete(API_ENDPOINTS.enrollment.delete(studentId, courseId))
        );
    }
}

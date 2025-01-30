import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { ServiceHandler } from './utils/serviceHandler';
import { CourseApiResponse, ApiResponseWithHeader } from '@/constants/types';


export const courseService = {
    async getCoursesByDepartment(departmentId: string) {
        return ServiceHandler.execute(() =>
            apiClient.get<ApiResponseWithHeader<CourseApiResponse>>(API_ENDPOINTS.course.getAllForDepartment(departmentId), {}, true)
        );
    },

    async getSchedulesByCourseIds(courseIds: {ids: string[]}) {
        return ServiceHandler.execute(() =>
            apiClient.get(API_ENDPOINTS.classSchedule.getAllByCourseIds, courseIds)
        );
    }
}

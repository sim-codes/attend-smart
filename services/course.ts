import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { ServiceHandler } from './utils/serviceHandler';
import { CourseApiResponse } from '@/constants/types/course';
import { ApiResponseWithHeader } from '@/constants/types/common';


export const courseService = {
    async getCoursesByDepartment(departmentId: string) {
        return ServiceHandler.execute(() =>
            apiClient.get<CourseApiResponse>(API_ENDPOINTS.course.getAllForDepartment(departmentId))
        );
    },

    async getSchedulesByCourseIds(courseIds: {ids: string[]}) {
        return ServiceHandler.execute(() =>
            apiClient.get(API_ENDPOINTS.classSchedule.getAllByCourseIds, courseIds)
        );
    }
}

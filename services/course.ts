import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { ServiceHandler } from './serviceHandler';
import { CourseApiResponse } from '@/constants/types';


export const courseService = {
    async getCoursesByDepartment(departmentId: string) {
        return ServiceHandler.execute<CourseApiResponse[]>(() =>
            apiClient.get(API_ENDPOINTS.course.getAllForDepartment.replace("{departmentId}", departmentId))
        );
    }
}

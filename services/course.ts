import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { ServiceHandler } from './serviceHandler';
import { CourseApiResponse, ApiResponseWithHeader } from '@/constants/types';


export const courseService = {
    async getCoursesByDepartment(departmentId: string) {
        return ServiceHandler.execute(() =>
            apiClient.get<ApiResponseWithHeader<CourseApiResponse>>(API_ENDPOINTS.course.getAllForDepartment.replace("{departmentId}", departmentId), {}, true)
        );
    }
}

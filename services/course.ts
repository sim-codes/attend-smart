import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { ServiceHandler } from './serviceHandler';


export const courseService = {
    async getDepartmentalCourses(departmentId: string) {
        return ServiceHandler.execute(() =>
            apiClient.get(API_ENDPOINTS.course.getAllForDepartment)
        );
    }
}

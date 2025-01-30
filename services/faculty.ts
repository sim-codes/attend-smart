import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { ServiceHandler } from './utils/serviceHandler';
import { FacultyAndDepartmentApiResponse } from '@/constants/types/api';

export const facultyService = {
    async getFaculties() {
        return ServiceHandler.execute<FacultyAndDepartmentApiResponse[]>(() =>
            apiClient.get(API_ENDPOINTS.faculty.getAll)
        );
    }
}

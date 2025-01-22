import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { ServiceHandler } from './serviceHandler';
import { FacultyApiResponse } from '@/constants/types';

export const facultyService = {
    async getFaculties() {
        return ServiceHandler.execute<FacultyApiResponse>(() =>
            apiClient.get(API_ENDPOINTS.faculty.getAll)
        );
    }
}

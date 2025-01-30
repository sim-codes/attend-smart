import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { ServiceHandler } from './utils/serviceHandler';
import { FacultyAndDepartmentApiResponse } from '@/constants/types';

export const departmentService = {
    async getDepartmentsByFaculty(facultyId: string) {
        return ServiceHandler.execute<FacultyAndDepartmentApiResponse[]>(() =>
            apiClient.get(API_ENDPOINTS.department.getAll(facultyId))
        );
    }
}

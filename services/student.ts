import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { StudentProfile, ProfileCreationCredentials } from '@/constants/types';
import { ServiceHandler } from './serviceHandler';

export const studentService = {
    async getStudentProfile(studentId: string) {
        return ServiceHandler.execute<StudentProfile>(() =>
            apiClient.get(API_ENDPOINTS.student.getSingle.replace('{id}', studentId))
        );
    },

    async createStudentProfile(userId: string, payload: ProfileCreationCredentials) {
        return ServiceHandler.execute<StudentProfile>(() =>
            apiClient.post(API_ENDPOINTS.student.create.replace("{id}", userId), payload)
        );
    }
}

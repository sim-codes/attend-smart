import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { StudentProfile, ProfileCreationCredentials, CodeResponse, StudentProfileUpdateCredentials } from '@/constants/types';
import { ServiceHandler } from './utils/serviceHandler';


export const studentService = {
    async getStudentProfile(studentId: string) {
        return ServiceHandler.execute<StudentProfile>(() =>
            apiClient.get(API_ENDPOINTS.student.getSingle(studentId))
        );
    },

    async createStudentProfile(userId: string, payload: ProfileCreationCredentials) {
        return ServiceHandler.execute<StudentProfile>(() =>
            apiClient.post(API_ENDPOINTS.student.create(userId), payload)
        );
    },

    async updateStudentProfile(userId: string, payload: StudentProfileUpdateCredentials) {
        return ServiceHandler.execute<CodeResponse>(() =>
            apiClient.put(API_ENDPOINTS.student.update(userId), payload)
        );
    }
}

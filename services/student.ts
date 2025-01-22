import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import axios from 'axios';
import { StudentProfile } from '@/constants/types';
import { ServiceHandler } from './serviceHandler';

export const studentService = {
    async getStudentProfile(studentId: string) {
        return ServiceHandler.execute<StudentProfile>(() =>
            apiClient.get(API_ENDPOINTS.student.getSingle.replace('{id}', studentId))
        );
    }
}

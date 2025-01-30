import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { ServiceHandler } from './serviceHandler';
import { FacultyAndDepartmentApiResponse } from '@/constants/types';

interface AttendancePayload {
    status: string;
    notes?: string;
    courseId: string;
    studentLon: number;
    studentLat: number;
}

export const attendanceService = {
    async submitAttendance(studentId: string, payload: AttendancePayload) {
        return ServiceHandler.execute(() =>
            apiClient.post(API_ENDPOINTS.attendance.signWithoutLocation(studentId), payload)
        );
    }
}

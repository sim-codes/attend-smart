import { AttendancePayload, AttendanceRecord } from '@/constants/types/attendance';
import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { ServiceHandler } from './utils/serviceHandler';
import { ApiResponseWithHeader } from '@/constants/types/common';

export const attendanceService = {
    async submitAttendance(studentId: string, payload: AttendancePayload) {
        return ServiceHandler.execute(() =>
            apiClient.post(API_ENDPOINTS.attendance.signWithoutLocation(studentId), payload)
        );
    },

    async submitAttendanceWithLocation(studentId: string, payload: AttendancePayload) {
        return ServiceHandler.execute(() =>
            apiClient.post(API_ENDPOINTS.attendance.sign(studentId), payload)
        );
    },

    async getStudentAttendanceRecords(studentId: string) {
        return ServiceHandler.execute(() =>
            apiClient.get<ApiResponseWithHeader<AttendanceRecord>>(API_ENDPOINTS.attendance.getAll + `?userId=${studentId}&pageSize=50`, {}, true),
        );
    }
}

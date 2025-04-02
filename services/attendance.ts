import { AttendaceApiResponse, AttendancePayload, AttendanceRecord } from '@/constants/types/attendance';
import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { ServiceHandler } from './utils/serviceHandler';
import { ApiResponseWithHeader } from '@/constants/types/common';
import axios from 'axios';

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
            apiClient.get<AttendaceApiResponse>(API_ENDPOINTS.attendance.getAll + `?userId=${studentId}&pageSize=50`),
        );
    },

    async verifyFace(payload: FaceVerificationPayload) {
        return ServiceHandler.execute(() => {
            return axios.post('https://dcv7qtf3-8000.uks1.devtunnels.ms/match_faces', payload)
        })
    }
}

interface FaceVerificationPayload{
    known_face_url: string;
    unknown_face_url: string;
    tolerance: number;
}

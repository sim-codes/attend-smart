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
        const image1Extension = payload.image1.split('.').pop()?.toLowerCase();
        const image2Extension = payload.image2.split('.').pop()?.toLowerCase();

        const image1Name = `image1.${image1Extension}`;
        const image2Name = `image2.${image2Extension}`;

        const formData = new FormData();
        formData.append('image1', {
            uri: payload.image1,
            name: image1Name,
            type: image1Extension === 'png' ? 'image/png' : 'image/jpeg',
        } as any);

        formData.append('image2', {
            uri: payload.image2,
            name: image2Name,
            type: image2Extension === 'png' ? 'image/png' : 'image/jpeg',
        } as any);

        console.log("Form data", formData);

        const response =  ServiceHandler.execute(() => axios.post('https://dcv7qtf3-8000.uks1.devtunnels.ms/compare-faces'));

        // const response = await axios.get('https://dcv7qtf3-8000.uks1.devtunnels.ms')

        console.log("Face verification response", response);
        return response
    }
}

interface FaceVerificationPayload{
    image1: string;
    image2: string;
}

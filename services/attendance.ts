import { AttendaceApiResponse, AttendancePayload, AttendanceRecord } from '@/constants/types/attendance';
import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { ServiceHandler } from './utils/serviceHandler';
import { ApiResponseWithHeader } from '@/constants/types/common';
import axios from 'axios';
import { Platform } from 'react-native';

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
        const formData = new FormData();

        if (Platform.OS === 'web') {
            const image1Blob = payload.image1 as any as Blob;
            const image1MimeType = image1Blob.type;
            const image1FileType = image1MimeType.split('/')[1] || 'jpeg';
            const image1FileName = `image_${new Date().getTime()}.${image1FileType}`;

            formData.append('image1', image1Blob, image1FileName);

            if (payload.image2.startsWith('data:')) {
                const match = payload.image2.match(/^data:([^;]+);base64,(.+)$/);
                if (!match) {
                    alert('Invalid image format');
                    return null;
                }

                const [, mimeType, base64Data] = match;
                const fileType = mimeType.split('/')[1] || 'jpeg';
                const fileName = `image_${new Date().getTime()}.${fileType}`;

                // Convert base64 to blob
                const byteCharacters = atob(base64Data);
                const byteArrays = [];

                for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                    const slice = byteCharacters.slice(offset, offset + 512);

                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    const byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                }

                const blob = new Blob(byteArrays, { type: mimeType });
                formData.append('image2', blob as any, fileName);
            } else {
                const fetchResponse = await fetch(payload.image2);
                const blob = await fetchResponse.blob();
                const mimeType = blob.type;
                const fileType = mimeType.split('/')[1] || 'jpeg';
                const fileName = `image_${new Date().getTime()}.${fileType}`;

                formData.append('image2', blob, fileName);
            }
        } else {
            const image1Extension = payload.image1.split('.').pop()?.toLowerCase();
            const image2Extension = payload.image2.split('.').pop()?.toLowerCase();

            const image1Name = `image1.${image1Extension}`;
            const image2Name = `image2.${image2Extension}`;


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
        }

        console.log("Form data", formData);

        const response = ServiceHandler.execute(() => axios.post('http://localhost:8000/compare-faces', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        ));

        // const response = await axios.get('https://dcv7qtf3-8000.uks1.devtunnels.ms')

        console.log("Face verification response", response);
        return response
    },
}

interface FaceVerificationPayload {
    image1: string;
    image2: string;
}

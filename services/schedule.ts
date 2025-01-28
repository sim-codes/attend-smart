import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { ServiceHandler } from './serviceHandler';
import { ScheduleApiResponse } from '@/constants/types';

export const scheduleServices = {
    async getAllSchedules() {
        return ServiceHandler.execute<ScheduleApiResponse[]>(() =>
            apiClient.get(API_ENDPOINTS.classSchedule.getAll)
        );
    },

    async schedulesByCourseIds(payload: {ids: string[]}) {
        console.log('Payload being sent:', JSON.stringify(payload, null, 2));
        console.log('Endpoint:', API_ENDPOINTS.classSchedule.getAllByCourseIds);

        return ServiceHandler.execute<ScheduleApiResponse[]>(() =>
            apiClient.get(API_ENDPOINTS.classSchedule.getAllByCourseIds, payload)
        );
    }
}

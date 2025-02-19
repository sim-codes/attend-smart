import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { ServiceHandler } from '@/services/utils/serviceHandler';
import { ScheduleApiResponse } from '@/constants/types/schedule';

export const scheduleServices = {
    async getAllSchedules() {
        return ServiceHandler.execute<ScheduleApiResponse[]>(() =>
            apiClient.get(API_ENDPOINTS.classSchedule.getAll)
        );
    },

    async schedulesByCourseIds(payload: {ids: string[]}) {
        return ServiceHandler.execute<ScheduleApiResponse[]>(() =>
            apiClient.get(API_ENDPOINTS.classSchedule.getAllByCourseIds, payload)
        );
    }
}

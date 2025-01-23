import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { ServiceHandler } from './serviceHandler';
import { LevelApiResponse } from '@/constants/types';

export const levelService = {
    async getAllLevels() {
        return ServiceHandler.execute<LevelApiResponse[]>(() =>
            apiClient.get(API_ENDPOINTS.level.getAll)
        );
    }
}

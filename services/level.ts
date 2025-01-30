import { apiClient } from '@/services/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import { ServiceHandler } from './utils/serviceHandler';
import { LevelApiResponse } from '@/constants/types/api';

export const levelService = {
    async getAllLevels() {
        return ServiceHandler.execute<LevelApiResponse[]>(() =>
            apiClient.get(API_ENDPOINTS.level.getAll)
        );
    }
}

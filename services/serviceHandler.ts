import { apiClient } from "@/services/api";
import { AxiosError, AxiosResponse } from "axios";
import { ServiceResponse, ErrorResponse } from "@/constants/types";

export class ServiceHandler {
    static async execute<T>(
        serviceCall: () => Promise<T>
    ): Promise<ServiceResponse<T>> {
        try {
        const data = await serviceCall();
        return { data, success: true };
        } catch (error) {
        const errorResponse = this.handleError(error);
        return { error: errorResponse, success: false };
        }
    }

    private static handleError(error: unknown): ErrorResponse {
        if (error instanceof AxiosError) {
        return {
            message: error.response?.data?.message || error.message,
            code: error.response?.status?.toString(),
            details: error.response?.data
        };
        }

        if (error instanceof Error) {
        return {
            message: error.message,
            code: 'UNKNOWN_ERROR'
        };
        }

        return {
        message: 'An unexpected error occurred',
        code: 'UNKNOWN_ERROR'
        };
    }
}

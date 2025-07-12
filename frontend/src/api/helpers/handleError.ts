import type { ApiResponse } from "../types/api-types";

// Общий обработчик ошибок
export const handleError = (error: unknown): ApiResponse<never> => {
    if (error instanceof Error) {
        return { data: null, error: error.message, status: 500 };
    }
    return { data: null, error: 'Unknown error', status: 500 };
};

// Тип для query параметров
export type QueryParams = Record<string, string>;

/**
 * Унифицированный тип ответа для fetch
 */
export type ApiResponse<T> = {
    data: T | null;
    error: string | null;
    status: number;
};

// В данном файле будет настройка работы с api и базовые роуты

import { handleError } from './helpers/handleError';
import type { QueryParams, ApiResponse } from './types/api-types';

// Константы
const API_BASE_URL = new URL(import.meta.env.VITE_API_BASE_URL);

export const fetchApiGET =
    (route: string) =>
    async <T>(queryParams?: QueryParams): Promise<ApiResponse<T>> => {
        try {
            // Основной URL для запроса, со сменой роута
            const fetchURL = new URL(`api/${route}`, API_BASE_URL);
            const urlWithParams = queryParams
                ? `${fetchURL.href}?${new URLSearchParams(
                      queryParams
                  ).toString()}`
                : fetchURL.href;
            const res = await fetch(urlWithParams, {
                credentials: 'include',
            });
            // Проверка
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(
                    `HTTP ${res.status}: ${errorText || 'No error details'}`
                );
            }
            // Преобразование ответа в json
            const data = (await res.json()) as T;
            return { data, error: null, status: res.status };
        } catch (error) {
            return handleError(error);
        }
    };

export const fetchApiPOST =
    (route: string) =>
    async <T extends object, RT extends object>(
        body: T
    ): Promise<ApiResponse<RT>> => {
        // Основной URL для запроса, со сменой роута
        const fetchURL = new URL(`api/${route}`, API_BASE_URL);
        // Параметры запроса
        const requestOptions: RequestInit = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };
        try {
            // Сам запрос
            const res = await fetch(fetchURL.href, requestOptions);
            // Проверка
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(
                    `HTTP ${res.status}: ${errorText || 'No error details'}`
                );
            }
            // Преобразуем в json ответ
            const data = (await res.json()) as RT;
            return { data, error: null, status: res.status };
        } catch (error) {
            return handleError(error);
        }
    };

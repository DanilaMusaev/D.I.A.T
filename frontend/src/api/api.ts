// В данном файле будет настройка работы с api и базовые роуты

import type { QueryParams } from './types/api-types';

// Константы
const API_BASE_URL = new URL(import.meta.env.VITE_API_BASE_URL);

export const fetchApiGET =
    (route: string) =>
    async <T>(queryParams?: QueryParams) => {
        // Основной URL для запроса, со сменой роута
        const fetchURL = new URL(`api/${route}`, API_BASE_URL);
        // Сам запрос с Query Parameters
        const res = await fetch(
            new URL(
                `${
                    queryParams
                        ? Object.keys(queryParams).reduce((acc, qr) => {
                              return `${acc}${qr}=${queryParams[qr]}&`;
                          }, '?')
                        : ''
                }`,
                fetchURL
            ).href
        );
        // Преобразование ответа в json
        const data = (await res.json()) as T;

        return data;
    };

export const fetchApiPOST =
    (route: string) =>
    async <T extends object, RT extends object>(body: T) => {
        // Основной URL для запроса, со сменой роута
        const fetchURL = new URL(`api/${route}`, API_BASE_URL);
        // Параметры запроса
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };
        // Сам запрос
        const res = await fetch(fetchURL.href, requestOptions);
        // Преобразуем в json ответ
        const data = (await res.json()) as RT;

        return data;
    };

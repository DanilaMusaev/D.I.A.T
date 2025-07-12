// Класс с сервисом для связи с сервером для авторизации

import type { Email } from '../../state/auth/types';
import { fetchApiGET, fetchApiPOST } from '../api';
import type { AuthTypeBody, AuthTypeResponse } from './types';

class AuthService {
    // Поля/методы
    private _fetchRegistration: ReturnType<typeof fetchApiPOST>;
    private _fetchLogin: ReturnType<typeof fetchApiPOST>;
    private _fetchCheckAuthorization: ReturnType<typeof fetchApiGET>;

    constructor() {
        this._fetchRegistration = fetchApiPOST('users/registration');
        this._fetchLogin = fetchApiPOST('users/login');
        this._fetchCheckAuthorization = fetchApiGET('users/refresh');
    }

    public async registration(email: Email, password: string) {
        const res = await this._fetchRegistration<
            AuthTypeBody,
            AuthTypeResponse
        >({ email, password });
        // Проверка
        if (res.error) {
            throw new Error(res.error);
        }
        if (!res.data) {
            throw new Error(`Registration was failed`);
        }

        return res.data;
    }

    public async login(email: Email, password: string) {
        const res = await this._fetchLogin<AuthTypeBody, AuthTypeResponse>({
            email,
            password,
        });
        // Проверка
        if (res.error) {
            throw new Error(res.error);
        }
        if (!res.data) {
            throw new Error(`Login failed`);
        }
        return res.data;
    }

    public async checkAuth() {
        const res = await this._fetchCheckAuthorization<AuthTypeResponse>();
        // Проверка
        if (res.error) {
            throw new Error(res.error);
        }
        return res;
    }
}

export default new AuthService();

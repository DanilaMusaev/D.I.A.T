// Класс с сервисом для связи с сервером для авторизации

import type { Email } from '../state/auth/types';
import { fetchApiGETNoJSON, fetchApiPOST } from './api';
import type { AuthTypeBody, AuthTypeResponse } from './types/api-types';

class AuthService {
    // Поля/методы
    private _fetchRegistration: ReturnType<typeof fetchApiPOST>;
    private _fetchLogin: ReturnType<typeof fetchApiPOST>;
    private _fetchCheckAuthorization: ReturnType<typeof fetchApiGETNoJSON>;

    constructor() {
        this._fetchRegistration = fetchApiPOST('users/registration');
        this._fetchLogin = fetchApiPOST('users/login');
        this._fetchCheckAuthorization = fetchApiGETNoJSON('users/refresh');
    }

    public async registration(email: Email, password: string) {
        const res = await this._fetchRegistration<
            AuthTypeBody,
            AuthTypeResponse
        >({ email, password });

        return res;
    }

    public async login(email: Email, password: string) {
        const res = await this._fetchLogin<AuthTypeBody, AuthTypeResponse>({
            email,
            password,
        });

        return res;
    }

    public async checkAuth() {
        const res = await this._fetchCheckAuthorization();

        return res.ok;
    }
}

export default new AuthService();

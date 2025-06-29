import { ApiError } from '../exceptions/api-error.js';
import tokenService from '../services/token.service.js';

export function authMiddleware(req, res, next) {
    try {
        // Достаем токен из кук
        const { token } = req.cookies;
        // Проверка, что токен пришел
        if (!token) {
            return next(ApiError.UnauthorizedError());
        }
        // Валидация токена
        const decodeToken = tokenService.validateAccessToken(token);
        if (!decodeToken) {
            return next(ApiError.UnauthorizedError());
        }
        // Если все норм, то кидаем декодированную инфу в запрос и передаем управление следующему middleware
        req.user = decodeToken;
        next();
    } catch (err) {
        return next(ApiError.UnauthorizedError());
    }
}

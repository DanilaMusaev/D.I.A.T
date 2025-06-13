import { ApiError } from '../exceptions/api-error.js';
import userService from '../services/user.service.js';

class UsersController {
    async getUserById(req, res, next) {
        try {
            // Получаем необходимый id пользователя из query параметров
            const { userId } = req.query;
            // Проверка на наличие query в запросе
            if (!userId) {
                return next(ApiError.BadRequest('Query параметры должны быть в запросе'));
            }
            // Вызов функции сервиса для получения количества открытых паков данного пользователя
            const user = await userService.getUserById(userId);

            return res.json(user);
        } catch (err) {
            console.log(err);
            // Вызываем функцию next() для того, чтобы сработал middleware обработчика ошибок
            next(err);
        }
    }

    async registration(req, res, next) {
        try {
            // Получаем данные из тела запроса
            const { email, password } = req.body;
            // Небольшая валидация
            if (!email || !password) {
                return next(ApiError.BadRequest('Нет email или пароля'));
            }
            // Создаем пользователя
            const newUser = await userService.createUser(email, password);

            return res.json(newUser);
        } catch (err) {
            console.log(err);
            // Вызываем функцию next() для того, чтобы сработал middleware обработчика ошибок
            next(err);
        }
    }
}

export default new UsersController();

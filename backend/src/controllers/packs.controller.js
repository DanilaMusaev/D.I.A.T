import { ApiError } from '../exceptions/api-error.js';
import packsService from '../services/packs.service.js';

class PacksController {
    async getPacksQTY(req, res, next) {
        try {
            // Получаем необходимый id пользователя из query параметров
            const { userId } = req.query;
            if (!userId) {
                return next(ApiError.BadRequest('Query параметры должны быть в запросе'));
            }
            // Вызов функции сервиса для получения количества открытых паков данного пользователя
            const packsQTY = await packsService.getPacksQTY(userId);

            return res.json(packsQTY);
        } catch (err) {
            console.log(err);
            // Вызываем функцию next() для того, чтобы сработал middleware обработчика ошибок
            next(err);
        }
    }

    async updatePacksQTY(req, res, next) {
        try {
            // Получаем количество паков, необходимое к обновлению
            const { packsQuantity, userId } = req.body;
            // Простая проверка на наличие данных
            if (!packsQuantity || !userId) {
                return next(ApiError.BadRequest('В теле запроса не хватает данных'))
            }
            // Обновляем данные в бд и получаем измененные данные
            const updatedPacksQTY = await packsService.updatePacksQTY(packsQuantity, userId); 

            return res.json(updatedPacksQTY);
        } catch (err) {
            console.log(err);
            // Вызываем функцию next() для того, чтобы сработал middleware обработчика ошибок
            next(err);
        }
    }
}

export default new PacksController();

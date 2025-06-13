import { ApiError } from '../exceptions/api-error.js';
import ratingService from '../services/rating.service.js';

class RatingController {
    async getCurrRating(req, res, next) {
        try {
            // Получаем необходимый id пользователя из query параметров
            const { userId } = req.query;
            // Проверка на наличие query в запросе
            if (!userId) {
                return next(
                    ApiError.BadRequest('Query параметры должны быть в запросе')
                );
            }
            // Вызов функции сервиса для получения текущего рейтинга
            const rating = await ratingService.getRatingById(userId);

            return res.json(rating);
        } catch (err) {
            console.log(err);
            // Вызываем функцию next() для того, чтобы сработал middleware обработчика ошибок
            next(err);
        }
    }

    async updateCurrRating(req, res, next) {
        try {
            // Получаем данные из тела запроса
            const { ptsCount, userId } = req.body;
            // Небольшая проверка
            if (!ptsCount || !userId) {
                return next(
                    ApiError.BadRequest(
                        `Недостаточно данных в запросе для выполнения операции`
                    )
                );
            }
            // Обновляем запись в БД
            const newRating = await ratingService.updateRatingOne(
                ptsCount,
                userId
            );

            return res.json(newRating);
        } catch (err) {
            console.log(err);
            // Вызываем функцию next() для того, чтобы сработал middleware обработчика ошибок
            next(err);
        }
    }
}

export default new RatingController();

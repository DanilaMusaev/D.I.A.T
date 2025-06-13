import ratingRepository from '../db/repositories/ratingRepository.js';
import { ApiError } from '../exceptions/api-error.js';

class RatingService {
    /**
     * Метод для получения записи о пользователе в БД
     * @param {number} user_id
     * @returns {Promise<QueryResult>}
     */
    async getRatingById(user_id) {
        // Вызов функции из мини-репозитория БД для получения количества очков в рейтинге
        const rating = await ratingRepository.getOne({ user_id });

        if (!rating) {
            throw ApiError.BadRequest(
                `У пользователя с таким id: ${user_id} не существует записей о его рейтинге`
            );
        }

        return rating;
    }

    async createRatingRow(pts, user_id) {
        // Проверим, что еще нет записи о рейтинге пользователя с таким id
        const rating = await ratingRepository.getOne({ user_id });

        if (rating) {
            throw ApiError.BadRequest(
                `У пользователя с таким id уже есть запись в БД`
            );
        }
        // Создание новой записи в рейтинге
        const newRating = await ratingRepository.create(pts, user_id);

        return newRating;
    }

    async updateRatingOne(pts, user_id) {
        // Получем предыдущее количество рейтинга
        const beforePTS = await ratingRepository.getOne({ user_id });
        // Небольшая проверка
        if (!beforePTS) {
            throw ApiError.BadRequest(
                `У пользователя с id: ${user_id} нет записи о его рейтинге`
            );
        }
        // Добавляем/вычитаем к прошлому рейтингу новый
        let ptsCount = Number(beforePTS?.rating_pts) + Number(pts);
        // Проверка на то, чтобы рейтинг не стал отрицательным
        if (ptsCount < 0) {
            ptsCount = 0
        }
        // Обновляем запись в бд
        const newPTS = await ratingRepository.updateOne(ptsCount, { user_id });

        return newPTS
    }
}

export default new RatingService();

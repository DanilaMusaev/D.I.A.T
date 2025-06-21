import ratingRepository from '../db/repositories/ratingRepository.js';
import { ApiError } from '../exceptions/api-error.js';

class RatingService {
    /**
     * Метод для получения записи о пользователе в БД
     * @param {number} user_id
     * @returns {Promise<QueryResult>}
     */
    async getRatingById(user_id) {
        // Валидация
        try {
            user_id = Number(user_id);
        } catch (err) {
            throw ApiError.BadRequest(`id пользователя должен быть числом`);
        }
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
        // Валидация
        try {
            user_id = Number(user_id);
            pts = Number(pts);
        } catch (err) {
            throw ApiError.BadRequest(
                `Данные о рейтинге и id пользователя должны быть числом`
            );
        }
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
        // Валидация
        try {
            user_id = Number(user_id);
            pts = Number(pts);
        } catch (err) {
            throw ApiError.BadRequest(
                `Данные о рейтинге и id пользователя должны быть числом`
            );
        }
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
            ptsCount = 0;
        }
        // Обновляем запись в бд
        const newPTS = await ratingRepository.updateOne(ptsCount, { user_id });
        // Также создаем запись матча в таблице с месячными данными
        await ratingRepository.createNewMatchRow(pts, user_id);

        return newPTS;
    }

    async createNewMatchRow(ptsErn, user_id) {
        // Валидация
        try {
            user_id = Number(user_id);
            ptsErn = Number(ptsErn);
        } catch (err) {
            throw ApiError.BadRequest(
                `Данные о рейтинге и id пользователя должны быть числом`
            );
        }
        // Запрос
        const newMatchRow = await ratingRepository.createNewMatchRow(
            ptsErn,
            user_id
        );

        return newMatchRow;
    }

    async getCurrTodayProg(user_id) {
        // Валидация
        try {
            user_id = Number(user_id);
        } catch (err) {
            throw ApiError.BadRequest(`id пользователя должен быть числом`);
        }
        // Запрос
        const todayProg = await ratingRepository.getCurrAndTodayProg({
            user_id,
        });

        return todayProg;
    }

    async getMonthProg(user_id) {
        // Валидация
        try {
            user_id = Number(user_id);
        } catch (err) {
            throw ApiError.BadRequest(`id пользователя должен быть числом`);
        }
        // Запрос
        const monthProg = await ratingRepository.getMonthDailyProgress({
            user_id,
        });

        return monthProg;
    }

    async getSeasonProg(user_id) {
        // Валидация
        try {
            user_id = Number(user_id);
        } catch (err) {
            throw ApiError.BadRequest(`id пользователя должен быть числом`);
        }
        // Запрос
        const seasonProg = await ratingRepository.getSeasonStats({ user_id });

        return seasonProg;
    }
}

export default new RatingService();

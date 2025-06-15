import packsRepository from '../db/repositories/packsRepository.js';
import ratingRepository from '../db/repositories/ratingRepository.js';
import usersRepository from '../db/repositories/usersRepository.js';
import { ApiError } from '../exceptions/api-error.js';

class UsersService {
    /**
     * Метод для получения записи о пользователе в БД
     * @param {number} user_id
     * @returns {Promise<QueryResult>}
     */
    async getUserById(user_id) {
        // Вызов функции из мини-репозитория БД для получения данных пользователя
        const user = await usersRepository.getOne({ id: user_id });

        if (!user) {
            throw ApiError.BadRequest(
                `Пользователя с таким id: ${user_id} не существует`
            );
        }

        return user;
    }

    /**
     * Метод для получения записи о пользователе в БД при логине.
     * Пока что не доделано
     * @param {string} email
     * @returns {Promise<QueryResult>}
     */
    async login(email) {
        // Вызов функции из мини-репозитория БД для получения количества паков от пользователя
        const user = await usersRepository.getOne({ email });

        if (!user) {
            throw ApiError.BadRequest(
                `Пользователя с таким email: ${email} не существует`
            );
        }

        return user;
    }

    async createUser(email, password) {
        // Проверим, что еще нет пользователей с таким же email
        const user = await usersRepository.getOne({ email });
        if (user) {
            throw ApiError.BadRequest(
                `Пользователь с таким email уже существует`
            );
        }
        // Создание нового пользователя
        const newUser = await usersRepository.create(email, password);
        // Вместе с созданием нового пользователя, создаем ему и запись в БД с его количеством паков, равной 0 по умолчанию
        const newPacksRow = await packsRepository.createOne(0, newUser.id);
        // Также создаем запись о количестве текущего рейтинга пользователя, по умолчанию 0
        const newRatingRow = await ratingRepository.create(0, newUser.id);

        return newUser;
    }
}

export default new UsersService();

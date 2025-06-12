import packsRepository from '../db/packsRepository.js';
import usersRepository from '../db/usersRepository.js';
import { ApiError } from '../exceptions/api-error.js';

class UsersService {
    /**
     * Метод для получения записи о пользователе в БД
     * @param {number} user_id
     * @returns {Promise<QueryResult>}
     */
    async getUserById(user_id) {
        // Вызов функции из мини-репозитория БД для получения количества паков от пользователя
        const user = await usersRepository.getOne({ id: user_id });

        if (!user) {
            throw ApiError.BadRequest(
                `Пользователя с таким id: ${user_id} не существует`
            );
        }

        return user;
    }

    async createUser(email, password) {
        // Проверим, что еще нет пользователей с таким же email
        const user = await usersRepository.getOne({email});
        if (user) {
            throw ApiError.BadRequest(
                `Пользователь с таким email уже существует`
            );
        }
        // Создание нового пользователя
        const newUser = await usersRepository.create(email, password);
        console.log(newUser);
        // Вместе с созданием нового пользователя, создаем ему и запись в БД с его количеством паков, равной 0 по умолчанию
        const newPacksRow = await packsRepository.createOne(0, newUser.id);
        
        return newUser;
    }
}

export default new UsersService();

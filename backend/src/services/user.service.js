import bcrypt from 'bcryptjs';
import packsRepository from '../db/repositories/packsRepository.js';
import ratingRepository from '../db/repositories/ratingRepository.js';
import usersRepository from '../db/repositories/usersRepository.js';
import { ApiError } from '../exceptions/api-error.js';
import { validateEmail } from './validators/simpleValid.js';
import { UserDto } from '../dto/user-dto.js';
import tokenService from './token.service.js';

class UsersService {
    /**
     * Метод для получения записи о пользователе в БД
     * @param {number} user_id
     * @returns {Promise<QueryResult>}
     */
    async getUserById(user_id) {
        // Валидация
        try {
            user_id = Number(user_id);
        } catch {
            throw ApiError.BadRequest(`id пользователя должен быть числом`);
        }
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
     * @returns {Promise<{token: string, user: UserDto}>}
     */
    async loginUser(email, password) {
        // Валидация email
        if (!validateEmail(email)) {
            throw ApiError.BadRequest(`Указанный email не является валидным`, [
                { email: 'email is not valid' },
            ]);
        }
        // Вызов функции из мини-репозитория БД для получения пользователя
        const user = await usersRepository.getOne({ email });
        if (!user) {
            throw ApiError.BadRequest(
                `Пользователя с таким email: ${email} не существует`
            );
        }
        // Проверка на совпадение паролей
        const isPassEq = await bcrypt.compare(password, user.password);
        if (!isPassEq) {
            throw ApiError.BadRequest(`Email или пароль неверные`, [
                { authError: 'Неверный email или пароль' },
            ]);
        }
        // Создаем Dto, чтобы не передать на клиент лишних полей
        const userDto = new UserDto(user);
        // Генерация токена
        const { accessToken } = tokenService.generateAccessToken({
            ...userDto,
        });

        return {
            token: accessToken,
            user: userDto,
        };
    }

    async createUser(email, password) {
        // Валидация email
        if (!validateEmail(email)) {
            throw ApiError.BadRequest(`Указанный email не является валидным`, [
                { email: 'email is not valid' },
            ]);
        }
        // Проверим, что еще нет пользователей с таким же email
        const user = await usersRepository.getOne({ email });
        if (user) {
            throw ApiError.BadRequest(
                `Пользователь с таким email уже существует`
            );
        }
        // Хешируем пароль
        const hashPassword = await bcrypt.hash(password, 3);
        // Создание нового пользователя
        const newUser = await usersRepository.create(email, hashPassword);
        // Вместе с созданием нового пользователя, создаем ему и запись в БД с его количеством паков, равной 0 по умолчанию
        const newPacksRow = await packsRepository.createOne(0, newUser.id);
        // Также создаем запись о количестве текущего рейтинга пользователя, по умолчанию 0
        const newRatingRow = await ratingRepository.create(0, newUser.id);
        // Dto пользователя, чтобы не вернуть на клиент ничего лишнего
        const userDto = new UserDto(newUser);
        // Генерация токена
        const { accessToken } = tokenService.generateAccessToken({
            ...userDto,
        });

        return { token: accessToken, user: userDto };
    }
}

export default new UsersService();

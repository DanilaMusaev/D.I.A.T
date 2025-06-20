import packsRepository from '../db/repositories/packsRepository.js';
import { ApiError } from '../exceptions/api-error.js';

class PacksService {
    async getPacksQTY(user_id) {
        // Вызов функции из мини-репозитория БД для получения количества паков от пользователя
        const packsQTY = await packsRepository.getOne({ user_id });
        // Проверка на существование записи о пользователе
        if (!packsQTY) {
            throw ApiError.BadRequest(
                `У пользователя с id: ${user_id} еще нет записи о количестве паков`
            );
        }
        return packsQTY;
    }
    async updatePacksQTY(newQty, user_id) {
        // Получаем уже имеющееся количество паков
        const beforeQTY = await packsRepository.getOne({ user_id });
        // Проверка на то, что данные есть
        if (!beforeQTY) {
            throw ApiError.BadRequest(
                `Пользователя с таким id: ${user_id} не существует`
            );
        }
        // Новое количество паков
        let newQTYpacks = Number(beforeQTY?.quantity) + Number(newQty);
        // Проверка на то, чтобы количество открытых паков не стало отрицательным
        if (newQTYpacks < 0) {
            newQTYpacks = 0;
        }
        // Обновление кол-ва паков в БД
        const newPacksQTY = await packsRepository.updateOne(newQTYpacks, {
            user_id,
        });

        return newPacksQTY;
    }
}

export default new PacksService();

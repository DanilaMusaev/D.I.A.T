import packsRepository from '../db/packsRepository.js';
import { ApiError } from '../exceptions/api-error.js';

class PacksService {
    async getPacksQTY(user_id) {
        // Вызов функции из мини-репозитория БД для получения количества паков от пользователя
        const packsQTY = await packsRepository.getOne({ user_id });
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
        const newQTYpacks = Number(beforeQTY?.quantity) + Number(newQty);
        // Обновление кол-ва паков в БД
        const newPacksQTY = await packsRepository.updateOne(newQTYpacks, {
            user_id,
        });

        return newPacksQTY;
    }
}

export default new PacksService();

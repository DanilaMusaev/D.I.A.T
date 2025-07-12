// Класс с сервисом для связи с сервером о информации с паками
import { fetchApiGET, fetchApiPOST } from '../api';
import type { PacksType, PacksTypeBody } from './types';

class PacksService {
    // Поля/методы
    private _fetchPacks: ReturnType<typeof fetchApiGET>;
    private _fetchUpdatePacks: ReturnType<typeof fetchApiPOST>;

    constructor() {
        //
        this._fetchPacks = fetchApiGET('packs');
        this._fetchUpdatePacks = fetchApiPOST('packs');
    }

    public async getPacksByUserId(
        userId: number
    ): Promise<PacksType['quantity']> {
        const res = await this._fetchPacks<PacksType>({
            userId: userId.toString(),
        });
        // Проверка
        if (res.error) {
            throw new Error(res.error);
        }
        if (!res.data) {
            throw new Error(`Failed to fetch data`);
        }
        return res.data.quantity;
    }

    public async updatePacksByUserId(
        userId: number,
        packsQTY: number
    ): Promise<PacksType['quantity']> {
        // Формирование тела запроса
        const packsBody: PacksTypeBody = {
            userId: userId,
            packsQuantity: packsQTY,
        };
        const res = await this._fetchUpdatePacks<PacksTypeBody, PacksType>(
            packsBody
        );
        // Проверка
        if (res.error) {
            throw new Error(res.error);
        }
        if (!res.data) {
            throw new Error(`Failed data update`);
        }
        return res.data.quantity;
    }
}

export default new PacksService();

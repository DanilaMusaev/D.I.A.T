// Класс с сервисом для связи с сервером о информации с паками

import { fetchApiGET, fetchApiPOST } from './api';
import type { PacksType, PacksTypeBody } from './types/api-types';

class PacksService {
    // Поля/методы 
    private _fetchPacks: ReturnType<typeof fetchApiGET>;
    private _fetchUpdatePacks: ReturnType<typeof fetchApiPOST>

    constructor() {
        // 
        this._fetchPacks = fetchApiGET('packs');
        this._fetchUpdatePacks = fetchApiPOST('packs');
    }

    public async getPacksByUserId(
        userId: number
    ): Promise<PacksType['quantity']> {
        const packsData = await this._fetchPacks<PacksType>({ userId });

        return packsData.quantity;
    }

    public async updatePacksByUserId(userId: number, packsQTY: number) {
        // Формирование тела запроса
        const packsBody: PacksTypeBody = {
            userId: userId,
            packsQuantity: packsQTY,
        };
        const updatedPacksData = await this._fetchUpdatePacks<PacksTypeBody, PacksType>(packsBody);

        return updatedPacksData.quantity;
    }
}

export default new PacksService();

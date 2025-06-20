// Класс с сервисом для связи с сервером о информации с паками

import { ConvertMonthRatingData } from '../utils/monthDataConvert';
import type { ValueTypeConvert } from '../utils/utilityTypes/ValueTypeConvert';
import { fetchApiGET, fetchApiPOST } from './api';
import type {
    CurrentRatingBody,
    CurrentRatingType,
    MonthRatingFromApi,
    UpdatedRatingType,
} from './types/api-types';

class RatingService {
    // Поля/методы
    private _fetchCurrentRating: ReturnType<typeof fetchApiGET>;
    private _fetchMonthRating: ReturnType<typeof fetchApiGET>;
    private _fetchUpdatePacks: ReturnType<typeof fetchApiPOST>;

    constructor() {
        //
        this._fetchCurrentRating = fetchApiGET('rating');
        this._fetchMonthRating = fetchApiGET('rating-month');
        this._fetchUpdatePacks = fetchApiPOST('rating');
    }

    public async getCurrentRating(
        userId: number
    ): Promise<ValueTypeConvert<CurrentRatingType, number>> {
        const currentRating = await this._fetchCurrentRating<CurrentRatingType>(
            { userId }
        );
        // Преобразование всех значений объекта в числа
        const doAllNumber = Object.fromEntries(
            Object.entries(currentRating).map(([key, value]) => [
                key,
                Number(value),
            ])
        ) as ValueTypeConvert<CurrentRatingType, number>;

        return doAllNumber;
    }

    public async getMonthRating(userId: number) {
        const monthRatingData = await this._fetchMonthRating<
            Array<MonthRatingFromApi>
        >({ userId });
        const newData = ConvertMonthRatingData(monthRatingData);
        return newData;
    }

    public async updateCurrentRating(
        ptsCount: number,
        userId: number
    ): Promise<number> {
        const updatedRating = await this._fetchUpdatePacks<
            CurrentRatingBody,
            UpdatedRatingType
        >({ ptsCount, userId });

        return updatedRating.rating_pts;
    }
}

export default new RatingService();

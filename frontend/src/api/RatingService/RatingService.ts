// Класс с сервисом для связи с сервером о информации о рейтинге

import { ConvertMonthRatingData } from '../../utils/monthDataConvert';
import type { ValueTypeConvert } from '../../utils/utilityTypes/ValueTypeConvert';
import { fetchApiGET, fetchApiPOST } from '../api';
import type {
    CurrentRatingBody,
    CurrentRatingType,
    MonthRatingFromApi,
    SeasonRatingFromApi,
    SeasonRatingType,
    UpdatedRatingType,
} from './types';

class RatingService {
    // Поля/методы
    private _fetchCurrentRating: ReturnType<typeof fetchApiGET>;
    private _fetchMonthRating: ReturnType<typeof fetchApiGET>;
    private _fetchSeasonRating: ReturnType<typeof fetchApiGET>;
    private _fetchUpdatePacks: ReturnType<typeof fetchApiPOST>;

    constructor() {
        // Инициализация API роутов
        this._fetchCurrentRating = fetchApiGET('rating');
        this._fetchMonthRating = fetchApiGET('rating-month');
        this._fetchUpdatePacks = fetchApiPOST('rating');
        this._fetchSeasonRating = fetchApiGET('rating-season');
    }

    public async getCurrentRating(
        userId: number
    ): Promise<ValueTypeConvert<CurrentRatingType, number>> {
        const res = await this._fetchCurrentRating<CurrentRatingType>({
            userId: userId.toString(),
        });
        if (res.error) {
            throw new Error(res.error);
        }
        if (!res.data) {
            throw new Error(`Failed to fetch data`);
        }
        // Преобразование всех значений объекта в числа
        const doAllNumber = Object.fromEntries(
            Object.entries(res.data).map(([key, value]) => [key, Number(value)])
        ) as ValueTypeConvert<CurrentRatingType, number>;

        return doAllNumber;
    }

    public async getMonthRating(userId: number) {
        const res = await this._fetchMonthRating<Array<MonthRatingFromApi>>({
            userId: userId.toString(),
        });
        if (res.error) {
            throw new Error(res.error);
        }
        if (!res.data) {
            throw new Error(`Failed to fetch data`);
        }
        const newData = ConvertMonthRatingData(res.data);
        return newData;
    }

    public async getSeasonRating(userId: number): Promise<SeasonRatingType> {
        const res = await this._fetchSeasonRating<SeasonRatingFromApi>({
            userId: userId.toString(),
        });
        if (res.error) {
            throw new Error(res.error);
        }
        if (!res.data) {
            throw new Error(`Failed to fetch data`);
        }
        // Преобразование информации
        const doAllNumber = Object.fromEntries(
            Object.entries(res.data).map(([key, value]) => [key, Number(value)])
        ) as ValueTypeConvert<SeasonRatingFromApi, number>;

        return doAllNumber;
    }

    public async updateCurrentRating(
        ptsCount: number,
        userId: number
    ): Promise<number> {
        const res = await this._fetchUpdatePacks<
            CurrentRatingBody,
            UpdatedRatingType
        >({ ptsCount, userId });
        if (res.error) {
            throw new Error(res.error);
        }
        if (!res.data) {
            throw new Error(`Failed data update`);
        }
        return res.data.rating_pts;
    }
}

export default new RatingService();

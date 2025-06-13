// Класс с сервисом для связи с сервером о информации с паками

import { fetchApiGET, fetchApiPOST } from './api';
import type { CurrentRatingBody, CurrentRatingType } from './types/api-types';

class RatingService {
    // Поля/методы
    private _fetchCurrentRating: ReturnType<typeof fetchApiGET>;
    private _fetchUpdatePacks: ReturnType<typeof fetchApiPOST>;

    constructor() {
        //
        this._fetchCurrentRating = fetchApiGET('rating');
        this._fetchUpdatePacks = fetchApiPOST('rating');
    }

    public async getCurrentRating(userId: number) {
        const currentRating = await this._fetchCurrentRating<CurrentRatingType>(
            { userId }
        );

        return currentRating.rating_pts;
    }

    public async updateCurrentRating(ptsCount: number, userId: number) {
        const updatedRating = await this._fetchUpdatePacks<
            CurrentRatingBody,
            CurrentRatingType
        >({ ptsCount, userId });

        return updatedRating.rating_pts;
    }
}

export default new RatingService();

/**
 * Тип тела запроса для текущего рейтинга/его обновления
 */
export interface CurrentRatingBody {
    ptsCount: number;
    userId: number;
}

/**
 * Возвращаемый с сервера тип с информацией о текущем рейтинге
 */
export interface CurrentRatingType {
    current_rating: number;
    today_total: string;
    today_matches_count: string;
}

/**
 * Возвращаемый с сервера тип, после обновления информации
 */
export interface UpdatedRatingType {
    id: number;
    rating_pts: number;
    user_id: number;
}

export interface MonthRatingFromApi {
    dayfrom: string;
    ptsearned: string;
}

export interface MonthRatingType {
    dayFrom: string;
    ptsEarned: number;
}

export interface SeasonRatingType {
    negative_count: number;
    positive_count: number;
    first_half_sum: number;
    second_half_sum: number;
}

export interface SeasonRatingFromApi {
    negative_count: string;
    positive_count: string;
    first_half_sum: string;
    second_half_sum: string;
}

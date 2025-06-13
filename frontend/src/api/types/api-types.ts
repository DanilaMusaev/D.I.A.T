// Тип для query параметров
export type QueryParams = {
    [key in string]: string | number;
};
/**
 * Тип тела запроса для паков
 */
export interface PacksTypeBody {
    packsQuantity: number;
    userId: number;
}
/**
 * Возвращаемый тип с сервера с инфой о паках
 */
export interface PacksType {
    id: number;
    quantity: number;
    user_id: number;
}

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
    id: number;
    rating_pts: number;
    user_id: number;
}

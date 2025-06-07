// Тип для query параметров
export type QueryParams = {
    [key in string]: string | number;
};
// Тип для тела запроса паков
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

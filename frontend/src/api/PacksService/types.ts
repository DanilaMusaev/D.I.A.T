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

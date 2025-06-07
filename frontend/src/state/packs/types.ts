/**
 * Тип состояния паков
 */
export interface PacksState {
    packs: number;
}
/**
 * Типы для actions состояния паков
 */
export interface PacksActions {
    getPacksQTY: (userId: number) => Promise<void>;
    updatePacksQTY: (userId: number, packsQTY: number) => Promise<void>;
}

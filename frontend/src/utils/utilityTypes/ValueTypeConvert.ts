/**
 * Преобразование типов значений в объекте на новые
 */
export type ValueTypeConvert<T, NewType> = {
    [K in keyof T]: NewType;
};

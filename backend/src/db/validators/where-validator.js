/**
 * Валидирует условия WHERE для SQL-запросов
 * @param {object} where - Объект условий { field: value }
 * @param {string[]} allowedColumns - Допустимые поля для фильтрации
 * @returns {[string, any]} - [поле, значение]
 * @throws {Error} - Если валидация не пройдена
 */
export function validateWhere(where, allowedColumns) {
    if (!where || Object.keys(where).length === 0) {
        throw new Error('WHERE condition is required');
    }

    const [key, value] = Object.entries(where)[0];

    if (typeof value === 'undefined' || value === null) {
        throw new Error(`Value for column "${key}" cannot be null/undefined`);
    }

    if (!allowedColumns.includes(key)) {
        throw new Error(
            `Invalid column: ${key}. Allowed: ${allowedColumns.join(', ')}`
        );
    }

    // Когда where имеет несколько ключей-значений, пока что без этого
    // for (const [key, value] of Object.entries(where)) {
    //     if (!allowedColumns.includes(key)) {
    //         throw new Error(`Invalid column: ${key}`);
    //     }
    //     // Доп. проверки значения...
    // }

    return [key, value];
}

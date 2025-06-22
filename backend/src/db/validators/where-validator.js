/**
 * Валидирует условия WHERE для SQL-запросов
 * @param {object} where Объект условий { field: value }
 * @param {string[]} allowedColumns Допустимые поля для фильтрации полей where
 * @param {boolean} [isWhereRequired=true] Поле, показывающее необходимость where поля доя запроса
 * @returns {[string, any]} [поле, значение]
 * @throws {Error} Если валидация не пройдена
 */
export function validateWhere(where, allowedColumns, isWhereRequired = true) {
    if (!where || Object.keys(where).length === 0) {
        if (isWhereRequired) throw new Error('WHERE condition is required');
        return [];
    }

    return Object.entries(where).map(([key, value]) => {
        if (!allowedColumns.includes(key)) {
            throw new Error(
                `Invalid column: ${key}. Allowed: ${allowedColumns.join(', ')}`
            );
        }
        if (value === null || value === undefined) {
            throw new Error(`Value for "${key}" cannot be null/undefined`);
        }
        return [key, value];
    });
}


/**
 * Конвертирует валидированные WHERE-условия в SQL с правильной нумерацией параметров (Пока что имеет только AND, IN операторы)
 * @param {Array} validatedWhere - Результат validateWhere()
 * @param {Array} existingParams - Уже существующие параметры запроса (по типу, [$1])
 * @returns {Object} { sql: string, params: any[] }
 */
export function convertWhereToPGQuery(
    validatedWhere = [],
    existingParams = []
) {
    if (validatedWhere.length === 0) {
        return {
            sql: '',
            params: existingParams, // Возвращаем исходные параметры без изменений
        };
    }

    const conditions = [];
    const newParams = [...existingParams]; // Копируем существующие параметры

    for (const [key, value] of validatedWhere) {
        const paramIndex = newParams.length + 1;

        if (Array.isArray(value)) {
            const placeholders = value
                .map((_, i) => `$${paramIndex + i}`)
                .join(', ');
            conditions.push(`${key} IN (${placeholders})`);
            newParams.push(...value);
        } else {
            conditions.push(`${key} = $${paramIndex}`);
            newParams.push(value);
        }
    }

    return {
        sql: conditions.join(' AND '),
        params: newParams,
    };
}

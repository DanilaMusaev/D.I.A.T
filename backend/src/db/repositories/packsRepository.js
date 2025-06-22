import pool from '../db.js';
import { validateWhere, convertWhereToPGQuery } from '../validators/where-validator.js';

class PacksRepository {
    constructor() {
        this.allowedColumns = ['id', 'user_id'];
    }
    /**
     * 
     * @param {{field: any}} where  - Условие для запроса в БД
     * @returns QueryResult<any>.rows[0]

     */
    async getOne(where) {
        // Валидация с формированием WHERE параметров
        const validWhere = validateWhere(where, this.allowedColumns);
        const { sql, params } = convertWhereToPGQuery(validWhere);

        try {
            // Запрос в БД для получения строки с информацией о количестве паков
            const QTY = await pool.query(
                `SELECT * FROM packs ${sql ? `WHERE ${sql}` : ``}`,
                params
            );

            return QTY.rows[0];
        } catch (err) {
            console.error(
                `DB Error in  ${this.constructor.name}.getOne:`,
                err.message
            );
            throw new Error('Failed to fetch packs quantity');
        }
    }

    /**
     *
     * @param {number} qty
     * @param {{field: any}} where
     * @returns QueryResult<any>.rows[0]
     */
    async updateOne(qty, where) {
        // Валидация
        if (!Number.isInteger(qty)) {
            throw new Error('Quantity value must be integer');
        }
        // Валидация с формированием WHERE параметров
        const validWhere = validateWhere(where, this.allowedColumns);
        const { sql, params } = convertWhereToPGQuery(validWhere, [qty]);

        try {
            // Обновление количества паков в БД
            const updatedQTY = await pool.query(
                `UPDATE packs SET quantity = $1 ${
                    sql ? `WHERE ${sql}` : ``
                } RETURNING *`,
                params
            );

            return updatedQTY.rows[0];
        } catch (err) {
            console.error(
                `DB Error in  ${this.constructor.name}.updateOne:`,
                err.message
            );
            throw new Error('Failed to update packs quantity');
        }
    }

    /**
     *
     * @param {number} qty - количество открытых паков
     * @param {number} user_id - id пользователя с этим количеством паков
     * @returns {Promise<QueryResult>}
     */
    async createOne(qty, user_id) {
        if (!Number.isInteger(qty) || !Number.isInteger(user_id)) {
            throw new Error('Invalid input types');
        }
        // Валидация с формированием WHERE параметров
        const validWhere = validateWhere({}, this.allowedColumns, false);
        const { sql, params } = convertWhereToPGQuery(validWhere, [
            qty,
            user_id,
        ]);

        try {
            // Создание записи о количестве паков пользователя
            const newRowPacks = await pool.query(
                `INSERT INTO packs (quantity, user_id) values ($1, $2) ${
                    sql ? `WHERE ${sql}` : ``
                } RETURNING *`,
                params
            );

            return newRowPacks.rows[0];
        } catch (err) {
            console.error(
                `DB Error in  ${this.constructor.name}.createOne:`,
                err.message
            );
            throw new Error('Failed to create new packs row');
        }
    }
}

export default new PacksRepository();

import pool from '../db.js';

class PacksRepository {
    /**
     * 
     * @param {{field: any}} where  - Условие для запроса в БД
     * @returns QueryResult<any>.rows[0]

     */
    async getOne(where) {
        try {
            // Запрос в БД для получения строки с информацией о количестве паков
            const QTY = await pool.query(
                `SELECT * FROM packs ${
                    where ? `WHERE ${Object.keys(where)[0]} = $1` : ''
                }`,
                [where[Object.keys(where)[0]]]
            );

            return QTY.rows[0];
        } catch (err) {
            console.log(err);
        }
    }

    /**
     *
     * @param {number} qty
     * @param {{field: any}} where
     * @returns QueryResult<any>.rows[0]
     */
    async updateOne(qty, where) {
        try {
            // Обновление количества паков в БД
            const updatedQTY = await pool.query(
                `UPDATE packs SET quantity = $1 ${
                    where ? `WHERE ${Object.keys(where)[0]} = $2` : ''
                } RETURNING *`,
                [qty, where[Object.keys(where)[0]]]
            );

            return updatedQTY.rows[0];
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * 
     * @param {number} qty - количество открытых паков
     * @param {number} user_id - id пользователя с этим количеством паков
     * @returns {Promise<QueryResult>}
     */
    async createOne(qty, user_id) {
        // Создание записи о количестве паков пользователя
        const newRowPacks = await pool.query(
            `INSERT INTO packs (quantity, user_id) values ($1, $2) RETURNING *`,
            [qty, user_id]
        );

        return newRowPacks.rows[0];
    }
}

export default new PacksRepository();

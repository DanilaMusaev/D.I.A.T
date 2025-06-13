import pool from '../db.js';

class RatingRepository {
    /**
     *
     * @param {{[key: string]: any}} where
     * @returns {Promise<QueryResult<any>>}
     */
    async getOne(where) {
        try {
            // Запрос в БД для получения строки с информацией о пользователе
            const rating = await pool.query(
                `SELECT * FROM curr_rating ${
                    where ? `WHERE ${Object.keys(where)[0]} = $1` : ''
                }`,
                [where[Object.keys(where)[0]]]
            );

            return rating.rows[0];
        } catch (err) {
            console.log(err);
        }
    }

    /**
     *
     * @param {number} pts - кол-во поинтов нового пользователя
     * @param {number} user_id - ссылка на id этого пользователя
     *
     * @returns {Promise<QueryResult>}
     */
    async create(pts, user_id) {
        try {
            const newRatingRow = await pool.query(
                `INSERT INTO curr_rating (rating_pts, user_id) values ($1, $2) RETURNING *`,
                [pts, user_id]
            );

            return newRatingRow.rows[0];
        } catch (err) {
            console.log(err);
        }
    }

    /**
     *
     * @param {number} pts
     * @param {{field: any}} where
     * @returns QueryResult<any>.rows[0]
     */
    async updateOne(pts, where) {
        try {
            // Обновление количества паков в БД
            const updatedPTS = await pool.query(
                `UPDATE curr_rating SET rating_pts = $1 ${
                    where ? `WHERE ${Object.keys(where)[0]} = $2` : ''
                } RETURNING *`,
                [pts, where[Object.keys(where)[0]]]
            );

            return updatedPTS.rows[0];
        } catch (err) {
            console.log(err);
        }
    }
}

export default new RatingRepository();

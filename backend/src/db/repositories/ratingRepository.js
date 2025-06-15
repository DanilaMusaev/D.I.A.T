import pool from '../db.js';
import { validateWhere } from '../validators/where-validator.js';

class RatingRepository {
    constructor() {
        this.allowedColumns = ['id', 'user_id'];
    }
    /**
     *
     * @param {{[key: string]: any}} where
     * @returns {Promise<QueryResult<any>>}
     */
    async getOne(where) {
        // Валидация
        const [whereKey, whereValue] = validateWhere(
            where,
            this.allowedColumns
        );

        try {
            // Запрос в БД для получения строки с информацией о пользователе
            const rating = await pool.query(
                `SELECT * FROM curr_rating WHERE ${whereKey} = $1`,
                [whereValue]
            );

            return rating.rows[0];
        } catch (err) {
            console.error(
                `DB Error in  ${this.constructor.name}.getOne:`,
                err.message
            );
            throw new Error('Failed to fetch rating');
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
        // Валидация
        if (!Number.isInteger(pts) || !Number.isInteger(user_id)) {
            throw new Error('Invalid input types');
        }

        try {
            const newRatingRow = await pool.query(
                `INSERT INTO curr_rating (rating_pts, user_id) 
                values ($1, $2) RETURNING *`,
                [pts, user_id]
            );

            return newRatingRow.rows[0];
        } catch (err) {
            if (err.code === '23505') {
                throw new Error('User rating already exists');
            }
            throw err;
        }
    }

    /**
     *
     * @param {number} pts
     * @param {{field: any}} where
     * @returns {QueryResult<any>.rows[0]}
     */
    async updateOne(pts, where) {
        // Валидация
        if (typeof pts !== 'number') {
            throw new Error('pts must be a number');
        }
        const [whereKey, whereValue] = validateWhere(
            where,
            this.allowedColumns
        );

        try {
            // Обновление количества паков в БД
            const updatedPTS = await pool.query(
                `UPDATE curr_rating SET rating_pts = $1 WHERE ${whereKey} = $2 RETURNING *`,
                [pts, whereValue]
            );

            return updatedPTS.rows[0];
        } catch (err) {
            console.error(
                `DB Error in  ${this.constructor.name}.updateOne:`,
                err.message
            );
            throw new Error('Failed to fetch rating');
        }
    }

    async getTodayPTS(where) {
        // Чтобы объект с where не был пустым
        const [whereKey, whereValue] = validateWhere(
            where,
            this.allowedColumns
        );

        try {
            const todayPTS = await pool.query(
                `SELECT COALESCE(SUM(ptsEarned), 0) as total 
                FROM rating_month 
                WHERE ${whereKey} = $1 AND dayFrom = CURRENT_DATE`,
                [whereValue]
            );

            return todayPTS.rows[0];
        } catch (err) {
            console.error(
                `DB Error in ${this.constructor.name}getTodayPTS:`,
                err
            );
            throw new Error('Failed to fetch daily points');
        }
    }
}

export default new RatingRepository();

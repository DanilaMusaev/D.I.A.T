import pool from '../db.js';
import {
    convertWhereToPGQuery,
    validateWhere,
} from '../validators/where-validator.js';

class RatingRepository {
    constructor() {
        this.allowedColumns = ['id', 'user_id'];
    }
    /**
     * Получить текущий рейтинг пользователя
     * @param {{[key: string]: any}} where
     * @returns {Promise<QueryResult<any>>}
     */
    async getOne(where) {
        // Валидация с формированием WHERE параметров
        const validWhere = validateWhere(where, this.allowedColumns);
        const { sql, params } = convertWhereToPGQuery(validWhere);

        try {
            // Запрос в БД для получения строки с информацией о пользователе
            const rating = await pool.query(
                `SELECT * FROM curr_rating ${sql ? `WHERE ${sql}` : ``}`,
                params
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
     * Создать новую запись с текущим рейтингом для пользователя
     * @param {number} pts - кол-во поинтов нового пользователя
     * @param {number} user_id - ссылка на id этого пользователя
     *
     * @returns {Promise<QueryResult>}
     */
    async create(pts, user_id) {
        // Даже если where нет, для приведения всего к общему виду формирования запросов
        const validWhere = validateWhere({}, this.allowedColumns, false);
        const { sql, params } = convertWhereToPGQuery(validWhere, [
            pts,
            user_id,
        ]);

        try {
            const newRatingRow = await pool.query(
                `INSERT INTO curr_rating (rating_pts, user_id) 
                values ($1, $2) ${sql ? `WHERE ${sql}` : ``} RETURNING *`,
                params
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
     * Обновить текущий рейтинг пользователя
     * @param {number} pts
     * @param {{field: any}} where
     * @returns {QueryResult<any>.rows[0]}
     */
    async updateOne(pts, where) {
        // Валидация с формированием WHERE параметров
        const validWhere = validateWhere(where, this.allowedColumns);
        const { sql, params } = convertWhereToPGQuery(validWhere, [pts]);

        try {
            // Обновление количества паков в БД
            const updatedPTS = await pool.query(
                `UPDATE curr_rating SET rating_pts = $1 ${
                    sql ? `WHERE ${sql}` : ``
                } RETURNING *`,
                params
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

    /**
     * Получить количество рейтинга за текущую сессию
     * @param {{[key in string]: any}} where
     * @returns {Promise<QueryResult.rows[0]>}
     * @deprecated - Есть функция с JOIN, которая совмещает данные с двух таблиц
     */
    async getTodayProgress(where) {
        // Валидация с формированием WHERE параметров
        const validWhere = validateWhere(where, this.allowedColumns);
        const { sql, params } = convertWhereToPGQuery(validWhere);

        try {
            const todayPTS = await pool.query(
                `SELECT COALESCE(SUM(ptsEarned), 0) as total,
                COALESCE(COUNT(ptsEarned), 0) as matchesCount
                FROM rating_month 
                WHERE ${sql} AND dayFrom = CURRENT_DATE`,
                params
            );

            return todayPTS.rows[0];
        } catch (err) {
            console.error(
                `DB Error in ${this.constructor.name}.getTodayProgress:`,
                err
            );
            throw new Error('Failed to fetch daily points');
        }
    }

    /**
     * Вместо того, чтобы делать два запроса getOne и getTodayProgress, объединим это в один запрос
     * @param {{[key in string]: any}} where
     *
     * @returns {Promise<QueryResult.rows[0]>}
     */
    async getCurrAndTodayProg(where) {
        // Валидация с формированием WHERE параметров
        const validWhere = validateWhere(where, this.allowedColumns);
        const { sql, params } = convertWhereToPGQuery(validWhere);

        // Запрос
        try {
            const currTodayProg = await pool.query(
                `SELECT 
                    cr.rating_pts AS current_rating,
                    COALESCE(SUM(rm.ptsEarned), 0) AS today_total,
                    COUNT(rm.ptsEarned) AS today_matches_count
                FROM curr_rating cr
                LEFT JOIN 
                    rating_month rm ON cr.user_id = rm.user_id 
                    AND rm.dayFrom = CURRENT_DATE
                WHERE cr.${sql}
                GROUP BY cr.rating_pts`,
                params
            );

            return (
                currTodayProg.rows[0] || {
                    current_rating: 0,
                    today_total: 0,
                    today_matches_count: 0,
                }
            );
        } catch (err) {
            console.error(
                `DB Error in ${this.constructor.name}.getCurrAndTodayProg:`,
                err
            );
            throw new Error('Failed to fetch curr-daily progress');
        }
    }

    /**
     * Запрос на создание новой записи о матче
     * @param {number} ptsEarned
     * @param {number} user_id
     * @returns {Promise<QueryResult.rows[0]>}
     */
    async createNewMatchRow(ptsEarned, user_id) {
        // Валидация с формированием WHERE параметров
        const validWhere = validateWhere({}, this.allowedColumns, false);
        const { sql, params } = convertWhereToPGQuery(validWhere, [
            ptsEarned,
            user_id,
        ]);

        try {
            const newRatingMonthRow = await pool.query(
                `INSERT INTO rating_month (ptsEarned, dayFrom ,user_id) 
                values ($1, CURRENT_DATE, $2) ${
                    sql ? `WHERE ${sql}` : ``
                } RETURNING *`,
                params
            );

            return newRatingMonthRow.rows[0];
        } catch (err) {
            console.error(
                `DB Error in ${this.constructor.name}.createNewMatchRow:`,
                err
            );
            throw new Error('Failed to create new month-row match');
        }
    }

    /**
     * Запрос на получение количества заработанных pts за последние 30 дней
     * @param {{[key in string]: any}} where
     * @returns {Promise<QueryResult.rows>}
     */
    async getMonthDailyProgress(where) {
        // Валидация с формированием WHERE параметров
        const validWhere = validateWhere(where, this.allowedColumns);
        const { sql, params } = convertWhereToPGQuery(validWhere);

        // Запрос
        try {
            const monthProg = await pool.query(
                `WITH date_series AS (
                        SELECT 
                            generate_series(
                                CURRENT_DATE - INTERVAL '29 days',
                                CURRENT_DATE,
                                INTERVAL '1 day'
                            )::date AS day
                    )
                    SELECT 
                        ds.day AS dayFrom,
                        COALESCE(SUM(rm.ptsEarned), 0) AS ptsEarned
                    FROM 
                        date_series ds
                    LEFT JOIN 
                        rating_month rm ON ds.day = rm.dayFrom AND rm.${sql}
                    GROUP BY 
                        ds.day
                    ORDER BY 
                        ds.day ASC`,
                params
            );

            return monthProg.rows;
        } catch (err) {
            console.error(
                `DB Error in ${this.constructor.name}.getMonthDailyProgress:`,
                err
            );
            throw new Error('Failed to fetch month progress');
        }
    }

    /**
     *
     * @param {{[k: string]: string | number}} where
     * @returns {Promise<QueryResult.rows[0]>}
     */
    async getSeasonStats(where) {
        // Валидация с формированием WHERE параметров
        const validWhere = validateWhere(where, this.allowedColumns);
        const { sql, params } = convertWhereToPGQuery(validWhere);

        try {
            const seasonProgress = await pool.query(
                `
                WITH dates AS (
                    SELECT 
                        CURRENT_DATE - INTERVAL '90 days' AS season_start,
                        CURRENT_DATE - INTERVAL '45 days' AS mid_season
                )
                SELECT
                    COUNT(*) FILTER (WHERE ptsEarned < 0) AS negative_count,
                    COUNT(*) FILTER (WHERE ptsEarned > 0) AS positive_count,
                    
                    COALESCE(SUM(ptsEarned) FILTER (WHERE dayFrom < d.mid_season), 0) AS first_half_sum,
                    COALESCE(SUM(ptsEarned) FILTER (WHERE dayFrom >= d.mid_season), 0) AS second_half_sum
                FROM 
                    rating_month,
                    dates d
                WHERE 
                    ${sql}
                    AND dayFrom >= d.season_start
                `,
                params
            );

            return seasonProgress.rows[0];
        } catch (err) {
            console.error(
                `DB Error in ${this.constructor.name}.getSeasonsStats:`,
                err
            );
            throw new Error('Failed to fetch month progress');
        }
    }
}

export default new RatingRepository();

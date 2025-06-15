import pool from '../db.js';
import { validateWhere } from '../validators/where-validator.js';

class UsersRepository {
    constructor() {
        this.allowedColumns = ['id', 'user_id', 'email'];
    }
    /**
     *
     * @param {{field: any}} where  - Условие для запроса в БД
     * @returns {Promise<QueryResult<any>.rows[0]>}
     */
    async getOne(where) {
        // Валидация
        const [whereKey, whereValue] = validateWhere(
            where,
            this.allowedColumns
        );

        try {
            // Запрос в БД для получения строки с информацией о пользователе
            const user = await pool.query(
                `SELECT * FROM users WHERE ${whereKey} = $1`,
                [whereValue]
            );

            return user.rows[0];
        } catch (err) {
            console.error(
                `DB Error in  ${this.constructor.name}.getOne:`,
                err.message
            );
            throw new Error('Failed to fetch user');
        }
    }

    /**
     *
     * @param {string} email - email нового пользователя
     * @param {string} password - пароль нового пользователя
     *
     * @returns {Promise<QueryResult>}
     */
    async create(email, password) {
        try {
            const newUser = await pool.query(
                `INSERT INTO users (email, password) values ($1, $2) RETURNING *`,
                [email, password]
            );

            return newUser.rows[0];
        } catch (err) {
            console.error(
                `DB Error in  ${this.constructor.name}.create:`,
                err.message
            );
            throw new Error('Failed to create user');
        }
    }
}

export default new UsersRepository();

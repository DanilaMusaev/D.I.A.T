import pool from '../db.js';

class UsersRepository {
    /**
     *
     * @param {{field: any}} where  - Условие для запроса в БД
     * @returns {Promise<QueryResult<any>.rows[0]>}
     */
    async getOne(where) {
        try {
            // Запрос в БД для получения строки с информацией о пользователе
            const user = await pool.query(
                `SELECT * FROM users ${
                    where ? `WHERE ${Object.keys(where)[0]} = $1` : ''
                }`,
                [where[Object.keys(where)[0]]]
            );

            return user.rows[0];
        } catch (err) {
            console.log(err);
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
            console.log(err);
        }
    }
}

export default new UsersRepository();

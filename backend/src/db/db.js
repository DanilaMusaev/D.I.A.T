// Файл для конфигурации БД
// Получаем Pool из пакета для работы с Postgres
import dotenv from 'dotenv';
import pgk from 'pg';
dotenv.config();

const { Pool } = pgk;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
});

export default pool;

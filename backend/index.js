import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorMiddleware } from './src/middlewares/error-middleware.js';
import usersRouter from './src/routers/users.routes.js';
import packsRouter from './src/routers/packs.routes.js';
import ratingRouter from './src/routers/rating.routes.js';
// Константы
const PORT = process.env.PORT || 8000;
// Инициализация экземпляра сервера express
const app = express();
// Middlewares
app.use(express.json());  // Парсинг json
app.use(cookieParser());  // Парсинг cookie
// Настройка cors
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
);
// Routes
app.use('/api', usersRouter);
app.use('/api', packsRouter);
app.use('/api', ratingRouter);
// Middleware обработчика ошибок
app.use(errorMiddleware);

// Функция с запуском сервера
const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is listening on PORT: ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
};

startServer();

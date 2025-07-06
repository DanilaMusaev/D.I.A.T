import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';

// Экземпляр роутера
const usersRouter = new Router();
// Endpoints
usersRouter.post('/users/login', usersController.login);
usersRouter.post('/users/registration', usersController.registration);
usersRouter.get('/users/refresh', authMiddleware, usersController.refreshToken);

export default usersRouter;

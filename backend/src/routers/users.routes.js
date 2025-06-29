import { Router } from 'express';
import usersController from '../controllers/users.controller.js';

// Экземпляр роутера
const usersRouter = new Router();
// Endpoints
usersRouter.post('/users/login', usersController.login);
usersRouter.post('/users/registration', usersController.registration);

export default usersRouter;

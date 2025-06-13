import { Router } from 'express';
import usersController from '../controllers/users.controller.js';

// Экземпляр роутера
const usersRouter = new Router();
// Endpoints
usersRouter.get('/users', usersController.getUserById);
usersRouter.post('/users/registration', usersController.registration);

export default usersRouter;

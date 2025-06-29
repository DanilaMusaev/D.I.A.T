import { Router } from 'express';
import packsController from '../controllers/packs.controller.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';

// Экземпляр роутера
const packsRouter = new Router();
// Auth-Middleware
packsRouter.use(authMiddleware);
// Endpoints
packsRouter.get('/packs', packsController.getPacksQTY);
packsRouter.post('/packs', packsController.updatePacksQTY);

export default packsRouter;

import { Router } from 'express';
import packsController from '../controllers/packs.controller.js';

// Экземпляр роутера
const packsRouter = new Router();
// Endpoints
packsRouter.get('/packs', packsController.getPacksQTY);
packsRouter.post('/packs', packsController.updatePacksQTY);

export default packsRouter;

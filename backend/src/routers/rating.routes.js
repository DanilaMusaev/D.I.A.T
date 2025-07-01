import { Router } from 'express';
import ratingController from '../controllers/rating.controller.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';


// Экземпляр роутера
const ratingRouter = new Router();
// Подключение Auth-Middleware
ratingRouter.use(authMiddleware);
// Endpoints
ratingRouter.get('/rating', ratingController.getCurrRating);
ratingRouter.post('/rating', ratingController.updateCurrRating);
ratingRouter.get('/rating-month', ratingController.getMonthProgress);
ratingRouter.get('/rating-season', ratingController.getSeasonProgress);

export default ratingRouter;

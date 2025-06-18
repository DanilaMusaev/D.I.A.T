import { Router } from 'express';
import ratingController from '../controllers/rating.controller.js';


// Экземпляр роутера
const ratingRouter = new Router();
// Endpoints
ratingRouter.get('/rating', ratingController.getCurrRating);
ratingRouter.post('/rating', ratingController.updateCurrRating);
ratingRouter.get('/rating-month', ratingController.getMonthProgress);

export default ratingRouter;

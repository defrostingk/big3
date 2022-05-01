import express from 'express';
import {
  getWorkout,
  postWorkout,
  getLoad,
} from '../controllers/workoutController';
import { checkUserMiddleware } from '../middlewares';

const workoutRouter = express.Router();

workoutRouter
  .route('/')
  .all(checkUserMiddleware)
  .get(getWorkout)
  .post(postWorkout);

workoutRouter.route('/load').all(checkUserMiddleware).get(getLoad);

export default workoutRouter;

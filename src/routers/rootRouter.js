import express from 'express';
import { getCalendar } from '../controllers/calendarController';
import { getHome } from '../controllers/homeController';
import { getJoin, postJoin } from '../controllers/joinController';
import { getLogin, postLogin, getLogout } from '../controllers/loginController';
import { getMyInfo } from '../controllers/myInfoController';
import {
  getWorkout,
  postWorkout,
  getLoad,
} from '../controllers/workoutController';
import {
  checkLoggedInUserMiddleware,
  preventLoggedInUserMiddleware,
} from '../middlewares';

const rootRouter = express.Router();

rootRouter.get('/', getHome);
rootRouter
  .route('/join')
  .all(preventLoggedInUserMiddleware)
  .get(getJoin)
  .post(postJoin);
rootRouter
  .route('/login')
  .all(preventLoggedInUserMiddleware)
  .get(getLogin)
  .post(postLogin);

rootRouter.route('/logout').all(checkLoggedInUserMiddleware).get(getLogout);
rootRouter
  .route('/workout')
  .all(checkLoggedInUserMiddleware)
  .get(getWorkout)
  .post(postWorkout);
rootRouter.route('/workout/load').all(checkLoggedInUserMiddleware).get(getLoad);

rootRouter.route('/calendar').all(checkLoggedInUserMiddleware).get(getCalendar);
rootRouter.route('/my-info').all(checkLoggedInUserMiddleware).get(getMyInfo);

export default rootRouter;

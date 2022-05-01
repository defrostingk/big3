import express from 'express';
import { getCalendar } from '../controllers/calendarController';
import { getHome } from '../controllers/homeController';
import { getJoin, postJoin } from '../controllers/joinController';
import { getLogin, postLogin, getLogout } from '../controllers/loginController';
import { getMyInfo } from '../controllers/myInfoController';
import { getWorkout, postWorkout } from '../controllers/workoutController';
import {
  checkUserMiddleware,
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

rootRouter.route('/logout').all(checkUserMiddleware).get(getLogout);
rootRouter.route('/calendar').all(checkUserMiddleware).get(getCalendar);
rootRouter.route('/my-info').all(checkUserMiddleware).get(getMyInfo);

export default rootRouter;

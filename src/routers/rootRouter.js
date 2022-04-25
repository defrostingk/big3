import express from 'express';
import { getCalendar } from '../controllers/calendarController';
import { getHome } from '../controllers/homeController';
import { getJoin, postJoin } from '../controllers/joinController';
import { getLogin, postLogin, getLogout } from '../controllers/loginController';
import { getMyInfo } from '../controllers/myInfoController';
import { getWorkout } from '../controllers/workoutController';
import { checkUserMiddleware } from '../middlewares';

const rootRouter = express.Router();

rootRouter.get('/', getHome);
rootRouter.route('/join').get(getJoin).post(postJoin);
rootRouter.route('/login').get(getLogin).post(postLogin);

rootRouter.route('/logout').all(checkUserMiddleware).get(getLogout);
rootRouter.route('/workout').all(checkUserMiddleware).get(getWorkout);
rootRouter.route('/calendar').all(checkUserMiddleware).get(getCalendar);
rootRouter.route('/my-info').all(checkUserMiddleware).get(getMyInfo);

export default rootRouter;

import express from 'express';
import { getCalendar } from '../controllers/calendarController';
import { getHome } from '../controllers/homeController';
import { getJoin, postJoin } from '../controllers/joinController';
import { getLogin, postLogin, getLogout } from '../controllers/loginController';
import { getMyInfo } from '../controllers/myInfoController';
import { getSettings } from '../controllers/settingsController';
import { getWorkout } from '../controllers/workoutController';

const rootRouter = express.Router();

rootRouter.get('/', getHome);
rootRouter.route('/join').get(getJoin).post(postJoin);
rootRouter.route('/login').get(getLogin).post(postLogin);
rootRouter.route('/logout').get(getLogout);
rootRouter.get('/workout', getWorkout);
rootRouter.get('/calendar', getCalendar);
rootRouter.get('/my-info', getMyInfo);
rootRouter.get('/settings', getSettings);
rootRouter.get('/*', (req, res) => res.redirect('/'));

export default rootRouter;

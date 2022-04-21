import express from 'express';
import { getCalendar } from './controllers/calendarController';
import { getHome } from './controllers/homeController';
import { getJoin, postJoin } from './controllers/joinController';
import { getLogin } from './controllers/loginController';
import { getMyInfo } from './controllers/myInfoController';
import { getSettings } from './controllers/settingsController';
import { getWorkout } from './controllers/workoutController';

const router = express.Router();

router.get('/', getHome);
router.get('/login', getLogin);
router.route('/join').get(getJoin).post(postJoin);
router.get('/workout', getWorkout);
router.get('/calendar', getCalendar);
router.get('/my-info', getMyInfo);
router.get('/settings', getSettings);
router.get('/*', (req, res) => res.redirect('/'));

export default router;

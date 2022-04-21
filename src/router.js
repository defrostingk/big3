import express from 'express';
import {
  getCalendar,
  getHome,
  getLogin,
  gerRegister,
  getMyInfo,
  getSettings,
  getWorkout,
} from './controller';

const router = express.Router();

// Get Requests
router.get('/', getHome);
router.get('/login', getLogin);
router.get('/join', gerRegister);
router.get('/workout', getWorkout);
router.get('/calendar', getCalendar);
router.get('/my-info', getMyInfo);
router.get('/settings', getSettings);
router.get('/*', (req, res) => res.redirect('/'));

export default router;

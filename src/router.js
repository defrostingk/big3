import express from 'express';
import {
  getCalendar,
  getHome,
  getLogin,
  getMyInfo,
  getSettings,
  getWorkout,
} from './controller';

const router = express.Router();

// Get Requests
router.get('/', getHome);
router.get('/login', getLogin);
router.get('/workout', getWorkout);
router.get('/calendar', getCalendar);
router.get('/my-info', getMyInfo);
router.get('/settings', getSettings);
router.get('/*', getHome);

export default router;

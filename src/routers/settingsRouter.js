import express from 'express';
import {
  getSettings,
  getSettingsBreakTime,
  getSettingsMyBody,
  getSettingsRoutine,
  getSettingsTemplate,
  getSettingsTheme,
  getSettingsUser,
  postSettingsMyBody,
} from '../controllers/settingsController';
import { checkLoggedInUserMiddleware } from '../middlewares';

const settingsRouter = express.Router();

settingsRouter.route('/').all(checkLoggedInUserMiddleware).get(getSettings);

// Workout
settingsRouter
  .route('/break-time')
  .all(checkLoggedInUserMiddleware)
  .get(getSettingsBreakTime);
settingsRouter
  .route('/template')
  .all(checkLoggedInUserMiddleware)
  .get(getSettingsTemplate);
settingsRouter
  .route('/routine')
  .all(checkLoggedInUserMiddleware)
  .get(getSettingsRoutine);

// My info
settingsRouter
  .route('/my-body')
  .all(checkLoggedInUserMiddleware)
  .get(getSettingsMyBody)
  .post(postSettingsMyBody);

// General
settingsRouter
  .route('/user')
  .all(checkLoggedInUserMiddleware)
  .get(getSettingsUser);
settingsRouter
  .route('/theme')
  .all(checkLoggedInUserMiddleware)
  .get(getSettingsTheme);

export default settingsRouter;

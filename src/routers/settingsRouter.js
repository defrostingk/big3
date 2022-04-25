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
import { checkUserMiddleware } from '../middlewares';

const settingsRouter = express.Router();

settingsRouter.route('/').all(checkUserMiddleware).get(getSettings);

// Workout
settingsRouter
  .route('/break-time')
  .all(checkUserMiddleware)
  .get(getSettingsBreakTime);
settingsRouter
  .route('/template')
  .all(checkUserMiddleware)
  .get(getSettingsTemplate);
settingsRouter
  .route('/routine')
  .all(checkUserMiddleware)
  .get(getSettingsRoutine);

// My info
settingsRouter
  .route('/my-body')
  .all(checkUserMiddleware)
  .get(getSettingsMyBody)
  .post(postSettingsMyBody);

// General
settingsRouter.route('/user').all(checkUserMiddleware).get(getSettingsUser);
settingsRouter.route('/theme').all(checkUserMiddleware).get(getSettingsTheme);

export default settingsRouter;

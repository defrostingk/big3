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

const settingsRouter = express.Router();

settingsRouter.get('/', getSettings);

// Workout
settingsRouter.get('/break-time', getSettingsBreakTime);
settingsRouter.get('/template', getSettingsTemplate);
settingsRouter.get('/routine', getSettingsRoutine);

// My info
settingsRouter
  .route('/my-body')
  .get(getSettingsMyBody)
  .post(postSettingsMyBody);

// General
settingsRouter.get('/user', getSettingsUser);
settingsRouter.get('/theme', getSettingsTheme);

export default settingsRouter;

import express from 'express';
import {
  getSettings,
  getSettingsBreakTime,
  getSettingsMyBody,
  getSettingsRoutine,
  getSettingsTemplate,
  getSettingsTheme,
  getSettingsUser,
} from '../controllers/settingsController';

const settingsRouter = express.Router();

settingsRouter.get('/', getSettings);

// Workout
settingsRouter.get('/break-time', getSettingsBreakTime);
settingsRouter.get('/template', getSettingsTemplate);
settingsRouter.get('/routine', getSettingsRoutine);

// My info
settingsRouter.get('/my-body', getSettingsMyBody);

// General
settingsRouter.get('/user', getSettingsUser);
settingsRouter.get('/theme', getSettingsTheme);

export default settingsRouter;

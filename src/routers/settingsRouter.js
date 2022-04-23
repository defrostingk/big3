import express from 'express';
import { getSettings } from '../controllers/settingsController';

const settingsRouter = express.Router();

settingsRouter.get('/', getSettings);
// workout/break-time
// workout/templates
// workout/routine

// my-info/my-body

// general/user
// general/theme

export default settingsRouter;

import express from 'express';
import { home } from './controller';

const router = express.Router();

// Get Requests
router.get('/', home);
router.get('/login', (req, res) => res.render('login'));
router.get('/workout', (req, res) => res.render('workout'));
router.get('/calendar', (req, res) => res.render('calendar'));
router.get('/my-info', (req, res) => res.render('my-info'));
router.get('/settings', (req, res) => res.render('settings'));
router.get('/*', (req, res) => res.redirect('/'));

export default router;

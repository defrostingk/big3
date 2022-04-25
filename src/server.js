import express from 'express';
import session from 'express-session';
import rootRouter from './routers/rootRouter';
import settingsRouter from './routers/settingsRouter';
import morgan from 'morgan';
import MongoStore from 'connect-mongo';
import { localsMiddleware } from './middlewares';

// Logger
const logger = morgan('dev');

// App settings
const app = express();
app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views/screens');

// Middlewares
app.use('/static', express.static(process.cwd() + '/src/public'));
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(localsMiddleware);

// Routers
app.use('/', rootRouter);
app.use('/settings', settingsRouter);
app.get('/*', (req, res) => res.redirect('/'));

export default app;

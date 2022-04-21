// import './db';
import express from 'express';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';
import router from './router';
import morgan from 'morgan';

// Live Reload
const liveReloadServer = livereload.createServer({
  exts: ['pug', 'js', 'css'],
});
liveReloadServer.watch(process.cwd() + '/src');

// Logger
const logger = morgan('dev');

// App settings
const app = express();
app.use(connectLivereload());
app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views/screens');
app.use('/public', express.static(process.cwd() + '/src/public'));
app.use(logger);
app.use('/', router);

export default app;

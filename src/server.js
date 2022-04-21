// import './db';
import express from 'express';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';
import router from './router';

// Live Reload
const liveReloadServer = livereload.createServer({
  exts: ['pug', 'js', 'css'],
});
liveReloadServer.watch(process.cwd() + '/src');

// App settings
const app = express();
app.use(connectLivereload());
app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views/screens');
app.use('/public', express.static(process.cwd() + '/src/public'));
app.use('/', router);

export default app;

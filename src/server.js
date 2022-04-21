// import './db';
import express from 'express';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';

// Live Reload
const liveReloadServer = livereload.createServer({
  exts: ['pug', 'js', 'css'],
});
liveReloadServer.watch(process.cwd() + '/src');

// App router
const app = express();
app.use(connectLivereload());
app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views/screens');
app.use('/public', express.static(process.cwd() + '/src/public'));
app.get('/', (req, res) => res.render('home'));
app.get('/login', (req, res) => res.render('login'));
app.get('/workout', (req, res) => res.render('workout'));
app.get('/calendar', (req, res) => res.render('calendar'));
app.get('/my-info', (req, res) => res.render('my-info'));
app.get('/settings', (req, res) => res.render('settings'));
app.get('/*', (req, res) => res.redirect('/'));

// Port
const LOCAL_PORT = 4000;
const PORT = process.env.PORT || LOCAL_PORT;

app.listen(PORT, () => {
  if (PORT === LOCAL_PORT) {
    console.log(`Server listening on port http://localhost:${PORT}`);
  }
});

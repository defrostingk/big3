// // Get Requests
// app.get('/', (req, res) => res.render('home'));
// app.get('/login', (req, res) => res.render('login'));
// app.get('/workout', (req, res) => res.render('workout'));
// app.get('/calendar', (req, res) => res.render('calendar'));
// app.get('/my-info', (req, res) => res.render('my-info'));
// app.get('/settings', (req, res) => res.render('settings'));
// app.get('/*', (req, res) => res.redirect('/'));

export function home(req, res) {
  return res.render('home');
}

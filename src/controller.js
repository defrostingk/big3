export function getHome(req, res) {
  return res.render('home', { sectionTitle: 'Home' });
}

export function getLogin(req, res) {
  return res.render('login', { sectionTitle: 'Login' });
}

export function gerRegister(req, res) {
  return res.render('register', { sectionTitle: 'Register' });
}

export function getWorkout(req, res) {
  return res.render('workout', { sectionTitle: 'Workout' });
}

export function getCalendar(req, res) {
  return res.render('calendar', { sectionTitle: 'Calendar' });
}

export function getMyInfo(req, res) {
  return res.render('my-info', { sectionTitle: 'My Info' });
}

export function getSettings(req, res) {
  return res.render('settings', { sectionTitle: 'Settings' });
}

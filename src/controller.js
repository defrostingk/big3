export function getHome(req, res) {
  return res.render('home');
}

export function getLogin(req, res) {
  return res.render('login');
}

export function getWorkout(req, res) {
  return res.render('workout');
}

export function getCalendar(req, res) {
  return res.render('calendar');
}

export function getMyInfo(req, res) {
  return res.redner('my-info');
}

export function getSettings(req, res) {
  return res.render('settings');
}

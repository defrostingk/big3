export function localsMiddleware(req, res, next) {
  res.locals.siteTitle = '삼대몇?';
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.loggedInUser;
  next();
}

export function checkUserMiddleware(req, res, next) {
  if (res.locals.loggedIn) {
    next();
  } else {
    req.flash('error', 'You have to log in first.');
    return res.redirect('/login');
  }
}

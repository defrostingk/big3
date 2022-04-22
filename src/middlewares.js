export function localsMiddleware(req, res, next) {
  res.locals.siteTitle = '삼대몇?';
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user;
  next();
}

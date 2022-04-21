import User from '../models/User';

export function getJoin(req, res) {
  return res.render('join', { sectionTitle: 'Join' });
}

export async function postJoin(req, res) {
  const { email, username, password, passwordConfirm } = req.body;
  if (password !== passwordConfirm) {
  }
  await User.create({
    email,
    username,
    password,
  });
  return res.redirect('/login');
}

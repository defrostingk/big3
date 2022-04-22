import User from '../models/User';
import bcrypt from 'bcrypt';

const sectionTitle = 'Login';
const ERROR_NOT_EXIST_USER = 'Your email does not exist.';
const ERROR_WRONG_PASSWORD = 'The password is incorrect.';

export function getLogin(req, res) {
  return res.render('login', { sectionTitle });
}

export async function postLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Handle error
  if (!user) {
    return res
      .status(400)
      .render('login', { sectionTitle, errorMessage: ERROR_NOT_EXIST_USER });
  }

  // Check user
  const login = await bcrypt.compare(password, user.password);
  if (!login) {
    return res
      .status(400)
      .render('login', { sectionTitle, errorMessage: ERROR_WRONG_PASSWORD });
  }

  // Session
  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect('/');
}

import User from '../models/User';

const sectionTitle = 'Join';
const ERROR_NOT_MATCHED_PASSWORD = 'Password does not match.';
const ERROR_EXIST_EMAIL = 'Your email already exists.';
const ERROR_EXIST_USERNAME = 'Your email already exists.';

export function getJoin(req, res) {
  return res.render('join', { sectionTitle });
}

export async function postJoin(req, res) {
  const { email, username, password, passwordConfirm } = req.body;

  // Error handling
  const existEmail = await User.exists({ email });
  const existUsername = await User.exists({ username });
  if (password !== passwordConfirm) {
    return res.status(400).render('join', {
      sectionTitle,
      errorMessage: ERROR_NOT_MATCHED_PASSWORD,
    });
  }
  if (existEmail) {
    return res
      .status(400)
      .render('join', { sectionTitle, errorMessage: ERROR_EXIST_EMAIL });
  }
  if (existUsername) {
    return res
      .status(400)
      .render('join', { sectionTitle, errorMessage: ERROR_EXIST_USERNAME });
  }

  try {
    await User.create({
      email,
      username,
      password,
    });
    return res.redirect('/login');
  } catch (error) {
    return res.status(400).render('join', {
      sectionTitle,
      errorMessage: error._message,
    });
  }
}

import User from '../models/User';

const sectionTitle = 'Settings';
const TITLE_BREAK_TIME = 'Break time';
const TITLE_TEMPLATE = 'Template';
const TITLE_ROUTINE = 'Routine';
const TITLE_MY_BODY = 'My body';
const TITLE_USER = 'User';
const TITLE_THEME = 'Theme';

export function getSettings(req, res) {
  return res.render('settings', { sectionTitle });
}

// Workout
export function getSettingsBreakTime(req, res) {
  return res.render('./settings/break-time', {
    sectionTitle: TITLE_BREAK_TIME,
    isSettings: true,
  });
}

export function getSettingsTemplate(req, res) {
  return res.render('./settings/template', {
    sectionTitle: TITLE_TEMPLATE,
    isSettings: true,
  });
}

export function getSettingsRoutine(req, res) {
  return res.render('./settings/routine', {
    sectionTitle: TITLE_ROUTINE,
    isSettings: true,
  });
}

// My-info
export function getSettingsMyBody(req, res) {
  const user = res.locals.loggedInUser;

  if (!user) {
    res.locals.big3 = 0;
    res.locals.squat = 0;
    res.locals.benchPress = 0;
    res.locals.deadLift = 0;
    res.locals.height = 0;
    res.locals.weight = 0;
    res.locals.skeletalMuscleMass = 0;
    res.locals.bodyFatMass = 0;
    res.locals.percentBodyFat = 0;
    res.locals.targetWeight = 0;
    res.locals.targetSkeletalMuscleMass = 0;
    res.locals.targetPercentBodyFat = 0;
  }

  res.locals.big3 =
    user.records.squat + user.records.benchPress + user.records.deadLift;
  res.locals.squat = user.records.squat;
  res.locals.benchPress = user.records.benchPress;
  res.locals.deadLift = user.records.deadLift;
  res.locals.height = user.records.height;
  res.locals.weight = user.records.weight;
  res.locals.skeletalMuscleMass = user.records.skeletalMuscleMass;
  res.locals.bodyFatMass = user.records.bodyFatMass;
  res.locals.percentBodyFat = user.records.percentBodyFat;
  res.locals.targetWeight = user.records.targetWeight;
  res.locals.targetSkeletalMuscleMass = user.records.targetSkeletalMuscleMass;
  res.locals.targetPercentBodyFat = user.records.targetPercentBodyFat;

  return res.render('./settings/my-body', {
    sectionTitle: TITLE_MY_BODY,
    isSettings: true,
  });
}

export async function postSettingsMyBody(req, res) {
  console.log(req.body);
  const { _id } = res.locals.loggedInUser;
  const records = req.body;

  const user = await User.findByIdAndUpdate(_id, {
    records,
  });

  const updatedUser = await User.findOne({ _id });
  req.session.loggedInUser = updatedUser;

  return res.redirect('/settings/my-body');
}

// General
export function getSettingsUser(req, res) {
  return res.render('./settings/user', {
    sectionTitle: TITLE_USER,
    isSettings: true,
  });
}

export function getSettingsTheme(req, res) {
  return res.render('./settings/theme', {
    sectionTitle: TITLE_THEME,
    isSettings: true,
  });
}

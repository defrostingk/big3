import User from '../models/User';
import { Body } from '../models/Records';

const headerType = 'settings';
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
    headerType,
  });
}

export function getSettingsTemplate(req, res) {
  return res.render('./settings/template', {
    sectionTitle: TITLE_TEMPLATE,
    headerType,
  });
}

export function getSettingsRoutine(req, res) {
  return res.render('./settings/routine', {
    sectionTitle: TITLE_ROUTINE,
    headerType,
  });
}

// My-info
export async function getSettingsMyBody(req, res) {
  const { _id } = res.locals.loggedInUser;
  const user = await User.findById(_id).populate('bodyRecords');

  if (user.bodyRecords) {
    res.locals.big3 =
      user.bodyRecords.squat +
      user.bodyRecords.benchPress +
      user.bodyRecords.deadLift;
    res.locals.squat = user.bodyRecords.squat;
    res.locals.benchPress = user.bodyRecords.benchPress;
    res.locals.deadLift = user.bodyRecords.deadLift;
    res.locals.height = user.bodyRecords.height;
    res.locals.weight = user.bodyRecords.weight;
    res.locals.skeletalMuscleMass = user.bodyRecords.skeletalMuscleMass;
    res.locals.bodyFatMass = user.bodyRecords.bodyFatMass;
    res.locals.percentBodyFat = user.bodyRecords.percentBodyFat;
    res.locals.targetWeight = user.bodyRecords.targetWeight;
    res.locals.targetSkeletalMuscleMass =
      user.bodyRecords.targetSkeletalMuscleMass;
    res.locals.targetPercentBodyFat = user.bodyRecords.targetPercentBodyFat;
  } else {
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

  return res.render('./settings/my-body', {
    sectionTitle: TITLE_MY_BODY,
    headerType,
  });
}

export async function postSettingsMyBody(req, res) {
  const { _id } = res.locals.loggedInUser;
  const myBody = req.body;

  const bodyRecords = await Body.create(myBody);
  const user = await User.findByIdAndUpdate(_id, { bodyRecords });

  return res.redirect('/settings/my-body');
}

// General
export function getSettingsUser(req, res) {
  return res.render('./settings/user', {
    sectionTitle: TITLE_USER,
    headerType,
  });
}

export function getSettingsTheme(req, res) {
  return res.render('./settings/theme', {
    sectionTitle: TITLE_THEME,
    headerType,
  });
}

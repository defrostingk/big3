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
  });
}
export function getSettingsTemplate(req, res) {
  return res.render('./settings/template', {
    sectionTitle: TITLE_TEMPLATE,
  });
}
export function getSettingsRoutine(req, res) {
  return res.render('./settings/routine', {
    sectionTitle: TITLE_ROUTINE,
  });
}

// My-info
export function getSettingsMyBody(req, res) {
  return res.render('./settings/my-body', {
    sectionTitle: TITLE_MY_BODY,
  });
}

// General
export function getSettingsUser(req, res) {
  return res.render('./settings/user', {
    sectionTitle: TITLE_USER,
  });
}
export function getSettingsTheme(req, res) {
  return res.render('./settings/theme', {
    sectionTitle: TITLE_THEME,
  });
}

const sectionTitle = 'Calendar';

export function getCalendar(req, res) {
  return res.render('calendar', { sectionTitle });
}

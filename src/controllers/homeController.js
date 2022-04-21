export function getHome(req, res) {
  return res.render('home', { sectionTitle: 'Home' });
}

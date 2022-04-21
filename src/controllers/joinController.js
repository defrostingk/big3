export function getJoin(req, res) {
  return res.render('join', { sectionTitle: 'Join' });
}

export function postJoin(req, res) {
  console.log(req.body);
  res.end();
}

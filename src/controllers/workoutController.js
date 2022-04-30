export function getWorkout(req, res) {
  return res.render('workout', { sectionTitle: 'Workout' });
}

export function postWorkout(req, res) {
  console.log(req.body);
  console.log(req.body.workout['0'].sets);
  return res.render('workout', { sectionTitle: 'Workout' });
}

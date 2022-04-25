export function getMyInfo(req, res) {
  const user = res.locals.loggedInUser;

  if (user) {
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

  return res.render('my-info', { sectionTitle: 'My Info' });
}

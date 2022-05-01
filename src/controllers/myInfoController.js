import User from '../models/User';

const sectionTitle = 'My Info';

export async function getMyInfo(req, res) {
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

  return res.render('my-info', { sectionTitle });
}

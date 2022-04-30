import mongoose from 'mongoose';

const bodyRecordsSchema = new mongoose.Schema({
  squat: { type: Number, default: 0 },
  benchPress: { type: Number, default: 0 },
  deadLift: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  weight: { type: Number, default: 0 },
  skeletalMuscleMass: { type: Number, default: 0 },
  bodyFatMass: { type: Number, default: 0 },
  percentBodyFat: { type: Number, default: 0 },
  targetWeight: { type: Number, default: 0 },
  targetSkeletalMuscleMass: { type: Number, default: 0 },
  targetPercentBodyFat: { type: Number, default: 0 },
});

const workoutRecordsSchema = new mongoose.Schema({
  time: { whole: { type: String }, pure: { type: String } },
  date: {
    year: { type: Number },
    month: { type: Number },
    date: { type: Number },
    day: { type: String },
  },
  workout: [
    {
      title: { type: String },
      category: { type: String },
      sets: [{ weight: { type: String }, reps: { type: String } }],
    },
  ],
});

export const Body = mongoose.model('Body', bodyRecordsSchema);
export const Workout = mongoose.model('Workout', workoutRecordsSchema);

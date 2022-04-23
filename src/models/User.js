import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const recordsSchema = new mongoose.Schema({});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  records: {
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
  },
});

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model('User', userSchema);
export default User;

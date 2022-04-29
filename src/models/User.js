import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bodyRecords: { type: mongoose.Schema.Types.ObjectId, ref: 'Body' },
  workoutRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
});

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model('User', userSchema);
export default User;

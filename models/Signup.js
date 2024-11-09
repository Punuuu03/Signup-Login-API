import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const signupSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

signupSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

signupSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Signup = mongoose.model('Signup', signupSchema);

export default Signup;

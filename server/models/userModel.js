import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  rxs: [{
    rxId: String,
    name: String
  }]
});

userSchema.pre('save', async function(next) {
  try {
    const hash = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    this.password = hash;

    return next();
  } catch (err) {
    return next({ err });
  }
});

userSchema.methods.comparePasswords = async function (input, stored) {
  try {
    return await bcrypt.compare(input, stored);
    
  } catch (err) {
    return next({ err });
  }
};

const User = mongoose.model('user', userSchema);

export default User;

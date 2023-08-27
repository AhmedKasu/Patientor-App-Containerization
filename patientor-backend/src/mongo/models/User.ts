import mongoose from 'mongoose';
import Joi from 'joi';
import { User } from '../../types';
import transform_idToId from '../../utils/modelHelpers';

const userSchema = new mongoose.Schema<User>({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
});

export const validateUser = (user: User) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string()
      .min(5)
      .max(30)
      .regex(/[a-z]/, 'lowercase')
      .regex(/[A-Z]/, 'uppercase')
      .regex(/[0-9]/, 'number')
      .regex(/[@$!%*?&#]/, 'special'),
  });
  return schema.validate(user);
};

transform_idToId(userSchema);

export default mongoose.model('User', userSchema);

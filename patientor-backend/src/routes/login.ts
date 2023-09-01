import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';

import User from '../mongo/models/User';
import asyncHandler from '../middleware/asycHandler';
import errorHandler from '../middleware/errorHandler';
import { ValidationError } from '../utils/errors';
import { User as UserInterface } from '../types';
import { JWT_SECRET, NODE_ENV } from '../utils/config';
import { userSession } from '../utils/constants';

const router = Router();
type LoginInputs = Omit<UserInterface, 'name'>;

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const userReq = req as { body: LoginInputs };
    const errorMessage = 'Invalid email or password';

    const { error } = validateInputs(userReq.body);
    if (error) throw new ValidationError(errorMessage);

    const { email, password } = userReq.body;

    const user = await User.findOne({ email });
    if (!user) throw new ValidationError(errorMessage);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new ValidationError(errorMessage);

    const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: '20m',
    });
    const csrfToken = uuidv4();

    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        maxAge: userSession,
      })
      .send({ csrfToken });
  })
);

const validateInputs = (inputs: LoginInputs) => {
  const schema = Joi.object<LoginInputs>({
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string()
      .min(5)
      .max(30)
      .regex(/[a-z]/, 'lowercase')
      .regex(/[A-Z]/, 'uppercase')
      .regex(/[0-9]/, 'number')
      .regex(/[@$!%*?&#]/, 'special'),
  });
  return schema.validate(inputs);
};

router.use(errorHandler);
export default router;

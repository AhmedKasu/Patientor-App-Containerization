import { Router } from 'express';
import bcrypt from 'bcrypt';
import _ from 'lodash';

import User, { validateUser } from '../mongo/models/User';

import asyncHandler from '../middleware/asycHandler';
import errorHandler from '../middleware/errorHandler';
import auth from '../middleware/auth';
import { ValidationError } from '../utils/errors';
import { User as UserInterface } from '../types';
import { getCache } from '../redis';

const router = Router();

router.get(
  '/me',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  auth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user).select('-password');
    const cachedCsrfToken = await getCache(user?.id as string);
    res.send({ user, csrfToken: cachedCsrfToken });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const userReq = req as { body: UserInterface };
    const { error } = validateUser(userReq.body);
    if (error) throw new ValidationError(error.details[0].message);

    const { name, email, password } = userReq.body;

    let user = await User.findOne({ email });
    if (user) throw new ValidationError('User already registered');

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.send(_.pick(user, ['id', 'name', 'email']));
  })
);

router.use(errorHandler);
export default router;

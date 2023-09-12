import { Router } from 'express';
import auth from '../middleware/auth';
import asyncHandler from '../middleware/asyncHandler';
import { deleteCache } from '../redis';

const router = Router();

router.post(
  '/',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  auth,
  asyncHandler(async (req, res) => {
    res.clearCookie('accessToken');
    await deleteCache(req.user as string);
    res.status(204).end();
  })
);

export default router;

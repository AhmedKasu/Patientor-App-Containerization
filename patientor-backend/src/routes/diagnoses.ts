import { Router } from 'express';
import Diagnosis from '../mongo/models/Diagnosis';
import { asyncHandler, errorHandler } from '../utils/middleware';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const diagnoses = await Diagnosis.find({});
    res.send(diagnoses);
  })
);

router.use(errorHandler);
export default router;

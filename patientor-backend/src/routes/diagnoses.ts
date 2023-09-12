import { Router } from 'express';

import Diagnosis from '../mongo/models/Diagnosis';
import asyncHandler from '../middleware/asyncHandler';
import errorHandler from '../middleware/errorHandler';
import arrayToRecordByKey from '../utils/routesHelpers';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const diagnoses = await Diagnosis.find({});
    const publicDiagnoses = arrayToRecordByKey(diagnoses, 'code');
    res.send(publicDiagnoses);
  })
);

router.use(errorHandler);
export default router;

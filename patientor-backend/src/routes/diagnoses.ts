import { Router } from 'express';
import Diagnosis from '../mongo/models/Diagnosis';

const router = Router();

router.get('/', (_req, res) => {
  void (async () => {
    const diagnosis = await Diagnosis.find({});
    res.send(diagnosis);
  })();
});

export default router;

import { Response, Router } from 'express';
import { Patient } from '../mongo';
import { findByIdMiddleware, PatientReq } from '../utils/middleware';

const router = Router();

router.get('/', (_req, res) => {
  void (async () => {
    const patients = await Patient.find({});
    res.send(patients);
  })();
});

const singleRouter = Router();

singleRouter.get('/', (req: PatientReq, res: Response) => {
  res.send(req.patient).status(200);
});

// router.post('/', (req, res) => {
//   try {
//     const newPatientEntry = toNewPatientInputs(req.body as NewPatient);
//     const newPatient: PublicPatient =
//       patientService.addPatient(newPatientEntry);
//     res.json(newPatient);
//   } catch (error: unknown) {
//     let errorMessage = 'Something went wrong.';
//     if (error instanceof Error) {
//       errorMessage += ' Error: ' + error.message;
//     }
//     res.status(400).send(errorMessage);
//   }
// });

// router.post('/:id/entries', (req, res) => {
//   try {
//     const newEntry = patientService.addEntry(
//       req.params.id,
//       toNewEntry(req.body as Entry)
//     );
//     res.json(newEntry);
//   } catch (error: unknown) {
//     let errorMessage = 'Something went wrong.';
//     if (error instanceof Error) {
//       errorMessage += ' Error: ' + error.message;
//     }
//     res.status(400).send(errorMessage);
//   }
// });
router.use('/:id', findByIdMiddleware, singleRouter);

export default router;

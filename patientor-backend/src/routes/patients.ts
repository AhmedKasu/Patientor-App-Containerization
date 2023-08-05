import { Response, Router } from 'express';
import { Patient } from '../mongo';
import { findByIdMiddleware, PatientReq } from '../utils/middleware';
import toNewPatientInputs from '../utils/patientInputsHelpers';
import { NewPatient, PublicPatient } from 'src/types';

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

router.post('/', (req, res) => {
  void (async () => {
    try {
      const patientInput = toNewPatientInputs(req.body as NewPatient);
      const newPatient: PublicPatient = await Patient.create(patientInput);
      res.send(newPatient).status(200);
    } catch (e) {
      let errorMessage = 'Something went wrong.';
      if (e instanceof Error) {
        errorMessage += ' Error: ' + e.message;
      }
      res.status(400).send(errorMessage);
    }
  })();
});

// singleRouter.post('/entries', (req, res) => {
//   void (async () => {
//     try {
//       const entryInput = toNewEntryInputs(req.body as EntryFields);
//       const newEntry: Entry = await Entry.create(entryInput);

//       res.json(newEntry);
//     } catch (error: unknown) {
//       let errorMessage = 'Something went wrong.';
//       if (error instanceof Error) {
//         errorMessage += ' Error: ' + error.message;
//       }
//       res.status(400).send(errorMessage);
//     }
//   })();
// });

router.use('/:id', findByIdMiddleware, singleRouter);

export default router;

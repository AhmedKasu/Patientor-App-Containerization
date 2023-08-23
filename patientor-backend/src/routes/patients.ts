import { Response, Router } from 'express';
import {
  Patient,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../mongo';

import { findByIdMiddleware, singleRouterReq } from '../utils/middleware';
import toNewPatientInputs from '../utils/patientInputsHelpers';
import { NewPatient, PublicPatient } from '../types';
import toNewEntryInputs, { EntryFields } from '../utils/entryInputsHelpers';
import {
  isHealthCheckEntry,
  isHospitalEntry,
  isOccupationalHealthcareEntry,
} from '../utils/typeGuards';

const router = Router();

router.get('/', (_req, res) => {
  void (async () => {
    const patients = await Patient.find({});
    res.send(patients);
  })();
});

const singleRouter = Router();

singleRouter.get('/', (req: singleRouterReq, res: Response) => {
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

singleRouter.post('/entries', (req: singleRouterReq, res) => {
  void (async () => {
    const patient = req.patient;
    try {
      const entryInputs = toNewEntryInputs(req.body as EntryFields);
      let newEntry = null;

      switch (entryInputs.type) {
        case 'HealthCheck':
          if (isHealthCheckEntry(entryInputs)) {
            newEntry = await HealthCheckEntry.create({
              ...entryInputs,
              patient: patient?._id,
            });
          }
          break;
        case 'Hospital':
          if (isHospitalEntry(entryInputs)) {
            newEntry = await HospitalEntry.create({
              ...entryInputs,
              patient: patient?._id,
            });
          }
          break;
        case 'OccupationalHealthcare':
          if (isOccupationalHealthcareEntry(entryInputs)) {
            newEntry = await OccupationalHealthcareEntry.create({
              ...entryInputs,
              patient: patient?._id,
            });
          }
          break;
        default:
          throw new Error('Incorrect or missing entry fields');
      }

      if (newEntry && patient) {
        await Patient.updateOne(
          { _id: patient._id },
          {
            $push: {
              entries: { entryId: newEntry._id, entryModel: newEntry.type },
            },
          }
        );

        res.status(200).send(newEntry);
      }
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
    }
  })();
});

router.use('/:id', findByIdMiddleware, singleRouter);

export default router;

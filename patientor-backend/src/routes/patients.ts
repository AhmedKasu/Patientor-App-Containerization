import { Response, Router } from 'express';
import {
  Patient,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../mongo';

import asyncHandler from '../middleware/asycHandler';
import {
  errorHandler,
  findByIdMiddleware,
  singleRouterReq,
} from '../utils/middleware';
import toNewPatientInputs from '../utils/patientInputsHelpers';
import { NewPatient, PublicPatient } from '../types';
import toNewEntryInputs, { EntryFields } from '../utils/entryInputsHelpers';
import {
  isHealthCheckEntry,
  isHospitalEntry,
  isOccupationalHealthcareEntry,
} from '../utils/typeGuards';
import arrayToRecordByKey from '../utils/routesHelpers';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const patients = await Patient.find({}).select('-ssn -entries').exec();
    const publicPatients = arrayToRecordByKey(patients, 'id');
    res.send(publicPatients);
  })
);

const singleRouter = Router();

singleRouter.get('/', (req: singleRouterReq, res: Response) => {
  res.status(200).send(req.patient);
});

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const patientInput = toNewPatientInputs(req.body as NewPatient);
    const newPatient: PublicPatient = await Patient.create(patientInput);
    res.status(200).send(newPatient);
  })
);

singleRouter.post(
  '/entries',
  asyncHandler(async (req: singleRouterReq, res) => {
    const patient = req.patient;

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
  })
);

router.use(
  '/:id',
  asyncHandler(findByIdMiddleware),
  singleRouter,
  errorHandler
);
router.use(errorHandler);

export default router;

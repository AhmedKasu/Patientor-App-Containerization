import { Response, Request, Router } from 'express';
import _ from 'lodash';
import { verify, JwtPayload } from 'jsonwebtoken';

import {
  Patient,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../mongo';

import { setCache, getCache } from '../redis';
import { cacheNewPatient } from '../redis/patients';

import asyncHandler from '../middleware/asyncHandler';
import errorHandler from '../middleware/errorHandler';
import findByIdMiddleware from '..//middleware/findById';
import auth from '../middleware/auth';

import toNewPatientInputs from '../utils/patientInputsHelpers';
import toNewEntryInputs, { EntryFields } from '../utils/entryInputsHelpers';
import {
  isHealthCheckEntry,
  isHospitalEntry,
  isOccupationalHealthcareEntry,
} from '../utils/typeGuards';
import { NewPatientInputs } from '../types';
import arrayToRecordByKey from '../utils/routesHelpers';
import { JWT_SECRET } from '../utils/config';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const accessToken = req.cookies?.accessToken;
    const dbPatients = await Patient.find({}).populate('entries.entryId');
    const recordByIdPatients = arrayToRecordByKey(dbPatients, 'id');
    let isAuthenticated = false;

    if (accessToken) {
      try {
        verify(accessToken, JWT_SECRET) as JwtPayload;
        isAuthenticated = true;
      } catch (err) {
        isAuthenticated = false;
      }
    }

    const cachedPatients = await getCache('patients');
    if (cachedPatients) {
      res.send(JSON.parse(cachedPatients));
      return;
    }

    const publicPatients = _.mapValues(recordByIdPatients, (patient) =>
      _.omit(patient.toJSON(), ['ssn', 'entries'])
    );

    if (!isAuthenticated) {
      await setCache('patients', JSON.stringify(publicPatients));
      res.send(publicPatients);
    }

    if (isAuthenticated) {
      await setCache('patients', JSON.stringify(dbPatients));
      res.send(dbPatients);
    }
  })
);

const singleRouter = Router();

singleRouter.get('/', (req: Request, res: Response) => {
  res.status(200).send(req.patient);
});

router.post(
  '/',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  auth,
  asyncHandler(async (req, res) => {
    const parsedInputs = toNewPatientInputs(req.body as NewPatientInputs);
    const newPatient = await Patient.create(parsedInputs);
    const publicPatient = _.omit(newPatient.toJSON(), ['ssn', 'entries']);

    await cacheNewPatient(publicPatient);
    res.status(200).send(publicPatient);
  })
);

singleRouter.post(
  '/entries',
  asyncHandler(async (req: Request, res) => {
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
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  auth,
  asyncHandler(findByIdMiddleware),
  singleRouter,
  errorHandler
);

router.use(errorHandler);

export default router;

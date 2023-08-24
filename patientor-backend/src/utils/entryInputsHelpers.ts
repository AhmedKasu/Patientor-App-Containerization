/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseDate, parseName } from './patientInputsHelpers';
import {
  isString,
  isObject,
  objectHasKey,
  isEntryType,
  isHealthCheckRating,
  isValidRating,
} from './typeGuards';
import { ValidationError } from './errors';

const parseLongTextInputs = (text: unknown): string => {
  if (!text || !isString(text) || text.length < 5) {
    throw new ValidationError(`Incorrect or missing: ${text}`);
  }
  return text;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
  if (
    Array.isArray(diagnosisCodes) &&
    diagnosisCodes.length > 0 &&
    diagnosisCodes.every((code: unknown) => isString(code))
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return diagnosisCodes;
  }
  throw new ValidationError(
    'Incorrect diagnosis codes format: ' + diagnosisCodes
  );
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist) || specialist.length < 3) {
    throw new ValidationError('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseEntryType = (type: unknown): string => {
  if (!type || !isEntryType(type)) {
    throw new ValidationError('Incorrect or missing type: ' + type);
  }
  return type;
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (
    !isValidRating(healthCheckRating) ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new ValidationError(
      'Incorrect or missing health check rating: ' + healthCheckRating
    );
  }
  return healthCheckRating;
};

type Discharge = {
  date: string;
  criteria: string;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    discharge &&
    isObject(discharge) &&
    objectHasKey(discharge, 'date') &&
    objectHasKey(discharge, 'criteria')
  ) {
    const dischargeObj = discharge as Discharge;
    return {
      ...dischargeObj,
      date: parseDate(dischargeObj.date),
      criteria: parseLongTextInputs(dischargeObj.criteria),
    };
  }
  throw new Error('Incorrect or missing discharge: ' + discharge);
};

type SickLeave = {
  startDate: string;
  endDate: string;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (
    sickLeave &&
    isObject(sickLeave) &&
    objectHasKey(sickLeave, 'startDate') &&
    objectHasKey(sickLeave, 'endDate')
  ) {
    const sickLeaveObj = sickLeave as SickLeave;
    return {
      ...sickLeaveObj,
      startDate: parseDate(sickLeaveObj.startDate),
      endDate: parseDate(sickLeaveObj.endDate),
    };
  }
  throw new Error('Incorrect or missing sick leave: ' + sickLeave);
};

export type EntryFields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: Array<unknown>;
  type: unknown;
  healthCheckRating?: unknown;
  discharge?: {
    date: unknown;
    criteria: unknown;
  };
  employerName?: unknown;
  sickLeave?: {
    startDate: unknown;
    endDate: unknown;
  };
};
const toNewEntryInputs = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  healthCheckRating,
  discharge,
  employerName,
  sickLeave,
}: EntryFields): EntryFields => {
  const parsedEntryInputs = {
    description: parseLongTextInputs(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes:
      diagnosisCodes && diagnosisCodes.length > 0
        ? parseDiagnosisCodes(diagnosisCodes)
        : undefined,
    type: parseEntryType(type),
    healthCheckRating:
      healthCheckRating || healthCheckRating === 0
        ? parseHealthCheckRating(healthCheckRating)
        : undefined,
    discharge: discharge ? parseDischarge(discharge) : undefined,
    employerName: employerName ? parseName(employerName) : undefined,
    sickLeave:
      sickLeave && Object.values(sickLeave).every((value) => value !== '')
        ? parseSickLeave(sickLeave)
        : undefined,
  };

  return parsedEntryInputs;
};

export default toNewEntryInputs;

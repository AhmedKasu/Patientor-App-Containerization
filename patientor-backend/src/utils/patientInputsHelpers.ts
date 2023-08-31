import { NewPatientInputs } from '../types';
import { isString, isDate, isGender, isSsnFormat } from './typeGuards';
import { ValidationError } from './errors';

export const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new ValidationError('Incorrect or missing name: ' + name);
  }
  return name;
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new ValidationError('Incorrect or missing date: ' + date);
  }
  return date;
};

export const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSsnFormat(ssn)) {
    throw new ValidationError('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

export const parseGender = (gender: unknown): string => {
  if (!gender || !isGender(gender)) {
    throw new ValidationError('Incorrect or missing gender: ' + gender);
  }
  return gender.charAt(0).toUpperCase() + gender.slice(1);
};

export const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new ValidationError('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

type patientInputs = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};
const toNewPatientInputs = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: patientInputs): NewPatientInputs => {
  const newEntry: NewPatientInputs = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
  };
  return newEntry;
};

export default toNewPatientInputs;

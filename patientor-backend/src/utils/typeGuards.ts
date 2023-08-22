/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Gender,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../types';
import { ObjectId } from 'mongodb';

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

export const isSsnFormat = (ssn: string): boolean => {
  return (
    ssn.match(
      /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])\d{2}[-+A]\d{3}[0-9A-F]$/
    ) !== null
  );
};

export const isObject = (param: unknown): boolean => {
  return typeof param === 'object' || param instanceof Object;
};

export const objectHasKey = (obj: object, key: string): boolean => {
  return Object.keys(obj).includes(key);
};

enum EntryType {
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
}

export const isEntryType = (type: any): type is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(type);
};

export const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

export const isValidRating = (param: unknown): boolean => {
  return Number(param) > -1 && Number(param) < 4;
};

export const isMongoId = (id: unknown): id is string => {
  return typeof id === 'string' && ObjectId.isValid(id);
};

export const isHealthCheckEntry = (entry: any): entry is HealthCheckEntry => {
  return (
    entry.type === 'HealthCheck' && isHealthCheckRating(entry.healthCheckRating)
  );
};

export const isHospitalEntry = (entry: any): entry is HospitalEntry => {
  return (
    entry.type === 'Hospital' &&
    isDate(String(entry.discharge.date)) &&
    isString(entry.discharge.criteria)
  );
};

export const isOccupationalHealthcareEntry = (
  entry: any
): entry is OccupationalHealthcareEntry => {
  return (
    entry.type === 'OccupationalHealthcare' &&
    isString(entry.employerName) &&
    (entry.sickLeave === undefined ||
      (isDate(String(entry.sickLeave.startDate)) &&
        isDate(String(entry.sickLeave.endDate))))
  );
};

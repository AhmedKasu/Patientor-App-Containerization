export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
export interface Diagnoses {
  [code: string]: Diagnosis;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  dateOfBirth?: string;
}

export interface User {
  name: string;
  email: string;
}

export interface RegistrationInput extends User {
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
export interface Patients {
  [id: string]: Patient;
}
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export enum EntryType {
  HealthCheck = 'HealthCheck',
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
}
export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}
export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  };
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
export interface PatientInfo {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn: string;
  dateOfBirth: string;
  entries: Entry[];
}
export interface EntryFormValues extends Omit<BaseEntry, 'id'> {
  type: EntryType;
  healthCheckRating: HealthCheckRating;
  discharge: {
    date: string;
    criteria: string;
  };
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

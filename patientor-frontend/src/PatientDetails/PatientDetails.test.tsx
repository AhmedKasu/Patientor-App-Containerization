import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';

import { PatientDetails } from '.';
import {
  Diagnosis,
  EntryType,
  Gender,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Patient,
} from '../types';

import { formatDate } from '../utils/patientDetailsHelper';

describe('<PatientDetails />', () => {
  const patient: Patient = {
    id: 'd2773336-f723-11e9-8f0b-362b9e111227',
    name: 'Mason Mount',
    dateOfBirth: '1988-07-09',
    ssn: '090788-122X',
    gender: Gender.Male,
    occupation: 'Football Player',
    entries: [],
  };

  const diagnoses: { [code: string]: Diagnosis } = {
    'M24.2': {
      code: 'M24.2',
      name: 'Disorder of ligament',
      latin: 'Morbositas ligamenti',
    },
    'M51.2': {
      code: 'M51.2',
      name: 'Other specified intervertebral disc displacement',
      latin: 'Alia dislocatio disci intervertebralis specificata',
    },
    'S03.5': {
      code: 'S03.5',
      name: 'Sprain and strain of joints and ligaments of other and unspecified parts of head',
      latin:
        'Distorsio et/sive distensio articulationum et/sive ligamentorum partium aliarum sive non specificatarum capitis',
    },
  };

  afterEach(cleanup);

  test('renders patient details', () => {
    render(<PatientDetails diagnoses={diagnoses} patient={patient} />);

    expect(screen.getByText(patient.name)).toBeInTheDocument();
    expect(screen.getByText(`ssn: ${patient.ssn}`)).toBeInTheDocument();
    expect(
      screen.getByText(`occupation: ${patient.occupation}`)
    ).toBeInTheDocument();
    expect(screen.getByText('Entries')).toBeInTheDocument();
    expect(screen.getByText('No available entries')).toBeInTheDocument();
    expect(screen.getByTestId('MaleIcon')).toBeInTheDocument();
  });

  test('a female icon is rendered when a patient is female', () => {
    const femalePatient: Patient = { ...patient, gender: Gender.Female };

    render(<PatientDetails diagnoses={diagnoses} patient={femalePatient} />);

    expect(screen.getByTestId('FemaleIcon')).toBeInTheDocument();
  });

  describe('<Entries />, renders the right content depending on the type of entry & diagnosis code', () => {
    test('Hospital entry', () => {
      const hospitalEntryPatient: Patient = {
        ...patient,
        entries: [
          {
            id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
            type: EntryType.Hospital,
            description: 'Emergency surgery due to acute appendicitis',
            date: '2019-04-05',
            specialist: 'MD House',
            diagnosisCodes: ['M24.2'],
            discharge: {
              date: '2019-04-09',
              criteria: 'Patient got well',
            },
          },
        ],
      };
      render(
        <PatientDetails diagnoses={diagnoses} patient={hospitalEntryPatient} />
      );

      const entry: HospitalEntry = hospitalEntryPatient
        .entries[0] as HospitalEntry;

      expect(screen.getByText(formatDate(entry.date))).toBeInTheDocument();
      expect(screen.getByText(`${entry.description}`)).toBeInTheDocument();
      expect(
        screen.getByText(`diagnose by ${entry.specialist}`)
      ).toBeInTheDocument();
      expect(screen.getByText('Discharge')).toBeInTheDocument();
      expect(
        screen.getByText(`Date: ${entry.discharge.date}`)
      ).toBeInTheDocument();
      expect(screen.getByText('Diagnoses')).toBeInTheDocument();
      expect(screen.getByText('Disorder of ligament')).toBeInTheDocument();
      expect(
        screen.getByText(`Criteria: ${entry.discharge.criteria}`)
      ).toBeInTheDocument();
    });

    test('Occupational Healthcare entry', () => {
      const occupationalHealthcareEntryPatient: Patient = {
        ...patient,
        entries: [
          {
            id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
            type: EntryType.OccupationalHealthcare,
            description: 'Back pain',
            date: '2019-04-05',
            specialist: 'MD House',
            diagnosisCodes: ['M51.2'],
            employerName: 'Acme Inc.',
            sickLeave: {
              startDate: '2019-08-05',
              endDate: '2019-08-28',
            },
          },
        ],
      };
      render(
        <PatientDetails
          diagnoses={diagnoses}
          patient={occupationalHealthcareEntryPatient}
        />
      );
      const entry: OccupationalHealthcareEntry =
        occupationalHealthcareEntryPatient
          .entries[0] as OccupationalHealthcareEntry;

      expect(screen.getByText(formatDate(entry.date))).toBeInTheDocument();
      expect(screen.getByText(`${entry.description}`)).toBeInTheDocument();
      expect(
        screen.getByText(`diagnose by ${entry.specialist}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Employer: ${entry.employerName}`)
      ).toBeInTheDocument();
      expect(screen.getByText('Sick Leave')).toBeInTheDocument();
      expect(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        screen.getByText(`Start date: ${entry.sickLeave?.startDate}`)
      ).toBeInTheDocument();
      expect(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        screen.getByText(`End date: ${entry.sickLeave?.endDate}`)
      ).toBeInTheDocument();
      expect(screen.getByText('Diagnoses')).toBeInTheDocument();
      expect(
        screen.getByText('Other specified intervertebral disc displacement')
      ).toBeInTheDocument();
    });

    test('Health Check entry', () => {
      const healthCheckEntryPatient: Patient = {
        ...patient,
        entries: [
          {
            id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
            type: EntryType.HealthCheck,
            description:
              'Yearly control visit. Cholesterol levels back to normal.',
            date: '2019-04-05',
            specialist: 'Terveyskeskus',
            healthCheckRating: 0,
          },
        ],
      };
      render(
        <PatientDetails
          diagnoses={diagnoses}
          patient={healthCheckEntryPatient}
        />
      );
      const entry = healthCheckEntryPatient.entries[0];
      expect(screen.getByText(formatDate(entry.date))).toBeInTheDocument();
      expect(screen.getByText(entry.description)).toBeInTheDocument();
      expect(
        screen.getByText(`diagnose by ${entry.specialist}`)
      ).toBeInTheDocument();
      expect(screen.getByTestId('FavoriteIcon')).toBeInTheDocument();
    });
  });
});

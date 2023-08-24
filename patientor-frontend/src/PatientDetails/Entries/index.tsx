import React from 'react';
import { Entry, Diagnosis, EntryType } from '../../types';

import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

import assertNever from '../../utils/exhaustiveTypeHelper';
import { formatDate } from '../../utils/patientDetailsHelper';
interface Props {
  entries: Entry[];
  diagnoses: { [code: string]: Diagnosis };
}

const Entries = ({ entries, diagnoses }: Props) => {
  if (entries.length > 0) {
    return (
      <>
        {entries.map((entry) => {
          const formattedEntry = {
            ...entry,
            date: formatDate(entry.date),
          };

          switch (formattedEntry?.type) {
            case EntryType.HealthCheck:
              return (
                <HealthCheckEntry
                  key={formattedEntry.id}
                  entry={formattedEntry}
                />
              );

            case EntryType.Hospital:
              return (
                <HospitalEntry
                  key={formattedEntry.id}
                  entry={formattedEntry}
                  diagnoses={diagnoses}
                />
              );

            case EntryType.OccupationalHealthcare:
              return (
                <OccupationalHealthcareEntry
                  key={formattedEntry.id}
                  entry={formattedEntry}
                  diagnoses={diagnoses}
                />
              );

            default:
              return assertNever(formattedEntry);
          }
        })}
      </>
    );
  } else {
    return <>No available entries</>;
  }
};

export default Entries;

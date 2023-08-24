import React from 'react';
import { Entry, Diagnosis, EntryType } from '../../types';

import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

import assertNever from '../../utils/exhaustiveTypeHelper';
interface Props {
  entries: Entry[];
  diagnoses: { [code: string]: Diagnosis };
}

const Entries = ({ entries, diagnoses }: Props) => {
  if (entries.length > 0) {
    return (
      <>
        {entries.map((entry) => {
          switch (entry?.type) {
            case EntryType.HealthCheck:
              return <HealthCheckEntry key={entry.id} entry={entry} />;
            case EntryType.Hospital:
              return (
                <HospitalEntry
                  key={entry.id}
                  entry={entry}
                  diagnoses={diagnoses}
                />
              );
            case EntryType.OccupationalHealthcare:
              return (
                <OccupationalHealthcareEntry
                  key={entry.id}
                  entry={entry}
                  diagnoses={diagnoses}
                />
              );
            default:
              return assertNever(entry);
          }
        })}
      </>
    );
  } else {
    return <>No available entries</>;
  }
};

export default Entries;

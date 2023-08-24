import { Patient, PatientInfo } from '../types';

export const isFetched = (patient: Patient): patient is PatientInfo => {
  return (
    Object.keys(patient).includes('entries') &&
    Object.keys(patient).includes('ssn')
  );
};

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString(undefined, options);
};

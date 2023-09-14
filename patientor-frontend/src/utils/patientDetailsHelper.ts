import {
  EntryType,
  HealthCheckEntry,
  HealthCheckRating,
  Patient,
} from '../types';

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString(undefined, options);
};

export const getLatestHealthCheckRating = (
  patient: Patient
): HealthCheckRating | 4 => {
  const healthCheckEntries = patient.entries.filter(
    (entry): entry is HealthCheckEntry => entry.type === EntryType.HealthCheck
  );

  if (!healthCheckEntries.length) return 4;

  healthCheckEntries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return healthCheckEntries[0].healthCheckRating;
};

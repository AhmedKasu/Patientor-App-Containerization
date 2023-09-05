import { Entry, EntryFormValues, EntryType } from '../types';

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
type EntryWithoutId = UnionOmit<Entry, 'id'>;

export const valuesToSubmit = (values: EntryFormValues): EntryWithoutId => {
  let newValues: EntryWithoutId = { ...values, type: EntryType.HealthCheck };

  if (values.type === EntryType.HealthCheck) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { discharge, employerName, sickLeave, ...healthCheckValues } = values;
    newValues = { ...healthCheckValues, type: EntryType.HealthCheck };
  }
  if (values.type === EntryType.Hospital) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { healthCheckRating, employerName, sickLeave, ...hospitalValues } =
      values;
    newValues = { ...hospitalValues, type: EntryType.Hospital };
  }
  if (values.type === EntryType.OccupationalHealthcare) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { healthCheckRating, discharge, ...healthCareValues } = values;
    newValues = { ...healthCareValues, type: EntryType.OccupationalHealthcare };
  }
  return newValues;
};

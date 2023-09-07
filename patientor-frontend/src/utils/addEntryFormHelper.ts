import { Entry, EntryFormValues, EntryType } from '../types';
import _ from 'lodash';

type EntryWithoutId = Omit<Entry, 'id'>;

export const valuesToSubmit = (values: EntryFormValues): EntryWithoutId => {
  let newValues: EntryWithoutId = { ...values };

  if (values.type === EntryType.HealthCheck) {
    newValues = _.omit(values, ['discharge', 'employerName', 'sickLeave']);
  }

  if (values.type === EntryType.Hospital) {
    newValues = _.omit(values, [
      'healthCheckRating',
      'employerName',
      'sickLeave',
    ]);
  }

  if (values.type === EntryType.OccupationalHealthcare) {
    newValues = _.omit(values, ['healthCheckRating', 'discharge']);
  }

  return newValues;
};

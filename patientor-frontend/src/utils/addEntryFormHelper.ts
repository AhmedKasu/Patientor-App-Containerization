import { Entry, EntryFormValues, EntryType } from '../types';

export type FormError =
  | {
      [field: string]: string;
    }
  | {
      [field: string]: {
        [subField: string]: string;
      };
    };

const isDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
};

export const validateEntryInputs = (values: EntryFormValues): FormError => {
  const requiredError = 'Field is required';
  const malformatedError = 'Malformated field';
  const errors: FormError = {};

  let dischargeDate = '';
  let dischargeCriteria = '';

  let sickLeaveStartDate = '';
  let sickLeaveEndDate = '';

  //description validation
  if (!values.description) {
    errors.description = requiredError;
  } else if (values.description.length < 5 || Number(values.description)) {
    errors.description = malformatedError;
  }

  //date validation
  if (!values.date) {
    errors.date = requiredError;
  } else if (!isDate(values.date)) {
    errors.date = malformatedError;
  }

  //specialist validation
  if (!values.specialist) {
    errors.specialist = requiredError;
  } else if (values.specialist.length < 3) {
    errors.specialist = malformatedError;
  }

  //discharge date validation
  if (!values.discharge.date) {
    dischargeDate = requiredError;
  } else if (!isDate(values.discharge.date)) {
    dischargeDate = malformatedError;
  }

  // discharge criteria validation
  if (!values.discharge.criteria) {
    dischargeCriteria = requiredError;
  } else if (values.discharge.criteria.length < 5) {
    dischargeCriteria = malformatedError;
  }

  //setting discharge errors Object
  if (
    values.type === EntryType.Hospital &&
    (dischargeDate || dischargeCriteria)
  ) {
    errors.discharge = { date: dischargeDate, criteria: dischargeCriteria };
  }

  //employer name validation
  if (
    values.type === EntryType.OccupationalHealthcare &&
    !values.employerName
  ) {
    errors.employerName = requiredError;
  }

  // sick leave validation
  if (values.sickLeave?.startDate && !isDate(values.sickLeave.startDate)) {
    sickLeaveStartDate = malformatedError;
  } else if (values.sickLeave?.endDate && !values.sickLeave.startDate) {
    sickLeaveStartDate = requiredError;
  }

  if (values.sickLeave?.endDate && !isDate(values.sickLeave.endDate)) {
    sickLeaveEndDate = malformatedError;
  } else if (values.sickLeave?.startDate && !values.sickLeave.endDate) {
    sickLeaveEndDate = requiredError;
  }

  //setting sick leave errors Object
  if (
    values.type === EntryType.OccupationalHealthcare &&
    (sickLeaveStartDate || sickLeaveEndDate)
  ) {
    errors.sickLeave = {
      startDate: sickLeaveStartDate,
      endDate: sickLeaveEndDate,
    };
  }

  return errors;
};

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

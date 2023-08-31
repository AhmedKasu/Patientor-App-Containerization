import { getCache, setCache } from './index';
import { PublicPatient } from '../types';

export const cacheNewPatient = async (patient: PublicPatient) => {
  try {
    const cachedPatients = await getCache('patients');

    if (cachedPatients) {
      const patients = JSON.parse(cachedPatients) as {
        [id: string]: PublicPatient;
      };
      patients[patient.id] = patient;

      await setCache('patients', JSON.stringify(patients));
    }
  } catch (err) {
    console.error('Error updating patients in cache:', err);
  }
};

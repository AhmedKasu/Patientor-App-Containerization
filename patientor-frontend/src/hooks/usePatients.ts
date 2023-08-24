import { useEffect } from 'react';
import axios from 'axios';
import CanceledError from 'axios';
import { apiBaseUrl } from '../constants';
import { Patients } from '../types';
import { usePatientsContext } from '../context/patientsContext';

const usePatients = (): [Patients | null, string | null] => {
  const { error, patients, setPatients, setError } = usePatientsContext();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    axios
      .get<Patients>(`${apiBaseUrl}/patients`)
      .then((res) => {
        setPatients(res.data);
      })
      .catch((error: unknown) => {
        if (error instanceof CanceledError) return;
        if (axios.isAxiosError(error)) {
          setError(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            String(error.response?.data.error) ||
              'Error from server with no message'
          );
        } else setError('Unknown error occurred');
      });
  }, [apiBaseUrl]);

  return [patients, error];
};

export default usePatients;

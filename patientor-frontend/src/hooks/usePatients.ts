import { useEffect } from 'react';
import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { Patients } from '../types';
import { usePatientsContext } from '../context/patientsContext';
import handleAxiosError from '../utils/axiosErrorHandler';

const usePatients = (): [Patients | null, string | undefined] => {
  const { error, patients, setPatients, setError } = usePatientsContext();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    axios
      .get<Patients>(`${apiBaseUrl}/patients`)
      .then((res) => {
        setPatients(res.data);
      })
      .catch(handleAxiosError(setError));
  }, [apiBaseUrl]);

  return [patients, error];
};

export default usePatients;

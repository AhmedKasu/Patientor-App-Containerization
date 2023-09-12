import { useEffect } from 'react';

import api from '../config/api';
import { Patients } from '../types';
import { usePatientsContext } from '../context/patientsContext';
import handleAxiosError from '../utils/axiosErrorHandler';

const usePatients = (): [Patients | null, string | undefined] => {
  const { error, patients, setPatients, setError } = usePatientsContext();

  useEffect(() => {
    void api.get<void>('/ping');

    api
      .get<Patients>('/patients')
      .then((res) => {
        setPatients(res.data);
      })
      .catch(handleAxiosError(setError));
  }, []);

  return [patients, error];
};

export default usePatients;

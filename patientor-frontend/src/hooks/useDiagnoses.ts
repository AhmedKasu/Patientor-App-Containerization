import { useState, useEffect } from 'react';
import api from '../config/api';
import { Diagnoses } from '../types';
import handleAxiosError from '../utils/axiosErrorHandler';

const useDiagnoses = () => {
  const [diagnoses, setDiagnoses] = useState<Diagnoses | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    api
      .get<Diagnoses>('/diagnoses')
      .then((response) => {
        setDiagnoses(response.data);
      })
      .catch(handleAxiosError(setError));
  }, []);

  return { diagnoses, error };
};
export default useDiagnoses;

import axios from 'axios';
import { useState, useEffect } from 'react';
import { apiBaseUrl } from '../constants';
import { Diagnoses } from '../types';
import handleAxiosError from '../utils/axiosErrorHandler';

const useDiagnoses = () => {
  const [diagnoses, setDiagnoses] = useState<Diagnoses | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    axios
      .get<Diagnoses>(`${apiBaseUrl}/diagnoses`)
      .then((response) => {
        setDiagnoses(response.data);
      })
      .catch(handleAxiosError(setError));
  }, []);

  return { diagnoses, error };
};
export default useDiagnoses;

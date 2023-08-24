import axios from 'axios';
import CanceledError from 'axios';
import { useState, useEffect } from 'react';
import { apiBaseUrl } from '../constants';
import { Diagnoses } from '../types';

const useDiagnoses = () => {
  const [diagnoses, setDiagnoses] = useState<Diagnoses | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Diagnoses>(`${apiBaseUrl}/diagnoses`)
      .then((response) => {
        setDiagnoses(response.data);
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
  }, []);

  return { diagnoses, error };
};
export default useDiagnoses;

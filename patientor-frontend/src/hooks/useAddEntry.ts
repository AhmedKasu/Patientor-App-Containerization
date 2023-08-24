import { useState } from 'react';
import axios from 'axios';
import CanceledError from 'axios';

import { apiBaseUrl } from '../constants';
import { EntryFormValues, Entry } from '../types';
import { valuesToSubmit } from '../utils/addEntryFormHelper';

type SetRefetchFunction = React.Dispatch<React.SetStateAction<boolean>>;

const useAddEntry = (id: string, setRefetch: SetRefetchFunction) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setError(undefined);
  };

  const addEntry = (values: EntryFormValues) => {
    const newValues = valuesToSubmit(values);

    axios
      .post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, newValues)
      .then(() => {
        setRefetch((prev) => !prev); // refetch patient details
        closeModal(); // Close the modal after successful posting
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
  };

  return {
    addEntry,
    error,
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useAddEntry;

import { useState } from 'react';
import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { EntryFormValues, Entry } from '../types';
import { valuesToSubmit } from '../utils/addEntryFormHelper';
import handleAxiosError from '../utils/axiosErrorHandler';

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
      .catch(handleAxiosError(setError));
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

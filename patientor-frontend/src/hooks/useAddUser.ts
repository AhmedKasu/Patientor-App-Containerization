import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import api from '../config/api';
import { User, RegistrationInput } from '../types';

type Error = string | undefined;

const useAddUser = (): {
  addUser: (newUser: RegistrationInput) => void;
  user: User | undefined;
  successAlert: boolean;
  errorAlert: boolean;
  error: Error;
} => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [error, setError] = useState<Error>(undefined);
  const [successAlert, setSuccessAlert] = useState<boolean>(false);
  const [errorAlert, setErrorAlert] = useState<boolean>(false);

  const navigate = useNavigate();

  const addUser = (newUser: RegistrationInput): void => {
    api
      .post<User>('/users', newUser)
      .then((res) => {
        setUser(res.data);
        setSuccessAlert(true);
        setTimeout(() => {
          setSuccessAlert(false);
          setUser(undefined);
          navigate('/login');
        }, 2000);
      })
      .catch((error: AxiosError) => {
        setError(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          String(error.response?.data.error) ||
            'Error from server with no message'
        );
        setErrorAlert(true);
        setTimeout(() => {
          setErrorAlert(false);
          setError(undefined);
        }, 3000);
      });
  };
  return { addUser, user, successAlert, errorAlert, error };
};

export default useAddUser;

import React from 'react';
import axios from 'axios';
import CanceledError from 'axios';

type SetErrorFunction = React.Dispatch<
  React.SetStateAction<string | undefined>
>;

const handleAxiosError =
  (setError: SetErrorFunction) =>
  (error: unknown): void => {
    if (error instanceof CanceledError) return;

    if (axios.isAxiosError(error)) {
      setError(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        String(error.response?.data.error) ||
          'Error from server with no message'
      );
    } else {
      setError('Unknown error occurred');
    }
  };

export default handleAxiosError;

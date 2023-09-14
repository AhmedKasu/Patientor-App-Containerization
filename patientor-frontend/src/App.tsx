import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useAuthContext } from './context/authContext';
import useRefreshUserSession from './hooks/useRefreshUserSession';

import router from './Routing/Routes';

const App = () => {
  const { currentUser } = useAuthContext();
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const { refreshUserSession } = useRefreshUserSession();

  useEffect(() => {
    const fetchUserOnce = async () => {
      const isUserAuthenticated = await refreshUserSession();
      if (isUserAuthenticated && !intervalId) {
        const id = window.setInterval(() => {
          void refreshUserSession();
        }, 20 * 60 * 1000);

        setIntervalId(id);
      }
    };

    void fetchUserOnce();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentUser]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;

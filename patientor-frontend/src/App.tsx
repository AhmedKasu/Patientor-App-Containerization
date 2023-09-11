import React, { useEffect, useMemo, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PatientListPage from './PatientListPage';
import AppLayout from './Routing/AppLayout';
import PatientDetails from './PatientDetails';
import RegisterUser from './AuthPages/Register';
import PrivateRoutes from './Routing/PrivateRoutes';
import Login from './AuthPages/Login';

import usePatients from './hooks/usePatients';
import { useAuthContext } from './context/authContext';
import useRefreshUserSession from './hooks/useRefreshUserSession';

const App = () => {
  const [patients] = usePatients();
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

  const router = useMemo(() => {
    return createBrowserRouter([
      {
        path: '/',
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: patients && <PatientListPage patients={patients} />,
          },
          { path: 'register', element: <RegisterUser /> },
          { path: 'login', element: <Login /> },
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [{ path: 'patients/:id', element: <PatientDetails /> }],
      },
    ]);
  }, [patients]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;

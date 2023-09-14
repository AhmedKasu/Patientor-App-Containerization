import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import AppLayout from './AppLayout';
import ErrorPage from './ErrorPage';
import PrivateRoutes from './PrivateRoutes';
import PatientListPage from '../PatientListPage';
import PatientDetails from '../PatientDetails';
import RegisterUser from '../AuthPages/Register';
import Login from '../AuthPages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <PatientListPage />,
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

export default router;

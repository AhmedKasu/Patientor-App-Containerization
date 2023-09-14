import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { useAuthContext } from '../context/authContext';
import NavBar from '../components/NavBar';

const PrivateRoutes = () => {
  const { currentUser } = useAuthContext();
  if (!currentUser) return <Navigate to='/login' />;

  return (
    <Container>
      <NavBar />
      <div id='App'>
        <Outlet />
      </div>
    </Container>
  );
};

export default PrivateRoutes;

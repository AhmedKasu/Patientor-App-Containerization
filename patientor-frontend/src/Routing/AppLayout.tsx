import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import { Container } from '@material-ui/core';

const AppLayout = () => {
  return (
    <Container>
      <NavBar />
      <div id='App'>
        <Outlet />
      </div>
    </Container>
  );
};

export default AppLayout;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@material-ui/core';

import PatientListPage from './PatientListPage';
import PatientDetails from './PatientDetails';
import NavBar from './components/NavBar';
import RegisterUser from './AuthPages/Register';
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

  return (
    <div className='App'>
      <Router>
        <Container>
          <NavBar />
          <Routes>
            <Route path='/patients/:id' element={<PatientDetails />} />
            <Route
              path='/'
              element={patients && <PatientListPage patients={patients} />}
            />
            <Route path='/register' element={<RegisterUser />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;

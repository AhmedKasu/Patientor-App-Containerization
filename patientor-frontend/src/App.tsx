import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@material-ui/core';

import PatientListPage from './PatientListPage';
import PatientDetails from './PatientDetails';
import NavBar from './components/NavBar';
import RegisterUser from './AuthPages/Register';
import Login from './AuthPages/Login';

import usePatients from './hooks/usePatients';

const App = () => {
  const [patients] = usePatients();

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

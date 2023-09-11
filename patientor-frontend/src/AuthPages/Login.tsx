import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import useLogin from '../hooks/useLogin';
import { useAuthContext } from '../context/authContext';

import LoginSchema from '../utils/validation/login';

import CustomForm from '../components/Forms';
import { TextField } from '../components/Forms/FormFields';
import { LoginInput } from '../types';

const Login = () => {
  const { login, successAlert, errorAlert } = useLogin();
  const { currentUser, error } = useAuthContext();
  const navigate = useNavigate();

  const handleRegisterUser = (values: LoginInput) => {
    login(values);
  };
  return (
    <Container maxWidth='sm'>
      {successAlert && (
        <Alert severity='success'>
          <AlertTitle>Success</AlertTitle>
          welcom <strong>{currentUser}</strong>
        </Alert>
      )}

      {errorAlert && (
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}

      <Box sx={{ padding: 10, marginTop: 20 }}>
        <Typography align='center' variant='h4'>
          Login
        </Typography>
        <CustomForm
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => handleRegisterUser(values)}
          submitButtonLabel='Login'
          onCancel={() => navigate('/')}
          validationSchema={LoginSchema}>
          {() => {
            return (
              <>
                <TextField
                  label='Email'
                  placeholder='user@email.com'
                  name='email'
                />
                <TextField
                  label='Password'
                  name='password'
                  placeholder='Password'
                  type='password'
                />
              </>
            );
          }}
        </CustomForm>
      </Box>
    </Container>
  );
};

export default Login;

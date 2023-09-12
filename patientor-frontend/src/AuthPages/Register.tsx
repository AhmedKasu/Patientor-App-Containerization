import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography } from '@material-ui/core';

import UseAddUser from '../hooks/useAddUser';

import AddUserSchema from '../utils/validation/newUser';

import CustomForm from '../components/Forms';
import { TextField } from '../components/Forms/FormFields';
import { RegistrationInput } from '../types';
import { Alert, AlertTitle } from '@material-ui/lab';

const RegisterUser = () => {
  const { addUser, user, successAlert, errorAlert, error } = UseAddUser();
  const navigate = useNavigate();

  const handleRegisterUser = (values: RegistrationInput) => {
    addUser(values);
  };

  return (
    <Container maxWidth='sm'>
      {successAlert && (
        <Alert severity='success'>
          <AlertTitle>Success</AlertTitle>
          user — <strong>{user?.name}</strong> registered.
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
          Register
        </Typography>
        <CustomForm
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={(values) => handleRegisterUser(values)}
          submitButtonLabel='Register'
          onCancel={() => navigate('/')}
          validationSchema={AddUserSchema}>
          {() => {
            return (
              <>
                <TextField
                  label='Name'
                  placeholder='First name     Last ame'
                  name='name'
                />
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

export default RegisterUser;

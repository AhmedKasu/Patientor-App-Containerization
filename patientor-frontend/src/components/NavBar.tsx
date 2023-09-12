import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';

import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import { useAuthContext } from '../context/authContext';
import useLogout from '../hooks/useLogout';

import UserProfileIcon from './UserProfileIcon';

const NavBar = () => {
  const { currentUser } = useAuthContext();
  const { logout, successAlert, errorAlert } = useLogout();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        bgcolor: 'white',
        boxShadow: 1,
        p: 2,
        height: '4em',
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Tooltip title='Home'>
          <Typography
            component={Link}
            to='/'
            variant='h3'
            color='primary'
            style={{ marginBottom: '0.5em', textDecoration: 'none' }}>
            Patientor
          </Typography>
        </Tooltip>

        <UserProfileIcon
          currentUser={currentUser}
          handleRegisterClick={() => navigate('/register')}
          handleLoginClick={() => navigate('/login')}
          handleLogoutClick={() => logout()}
        />
      </Box>

      {successAlert && (
        <Alert
          style={{ width: '50%', height: '100%', margin: 'auto' }}
          severity='success'>
          <AlertTitle>Success</AlertTitle>
          Successfuly logged out.
        </Alert>
      )}

      {errorAlert && (
        <Alert
          style={{ width: '50%', height: '100%', margin: 'auto' }}
          severity='error'>
          <AlertTitle>Error</AlertTitle>
          Something went wrong. Please try again.
        </Alert>
      )}
    </Box>
  );
};

export default NavBar;

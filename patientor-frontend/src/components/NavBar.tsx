import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import { useAuthContext } from '../context/authContext';

import UserProfileIcon from './UserProfileIcon';

const NavBar = () => {
  const { currentUser } = useAuthContext();

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        bgcolor: 'white',
        boxShadow: 1,
        p: 2,
        height: '4em',
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
        handleLogoutClick={() => console.log('logout')}
      />
    </Box>
  );
};

export default NavBar;

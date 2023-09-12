import React from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Login from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import UserAvatar from './UserAvatar';

interface Props {
  currentUser: string | null;
  handleRegisterClick: () => void;
  handleLoginClick: () => void;
  handleLogoutClick: () => void;
}

const UserProfileIcon = ({
  currentUser,
  handleLoginClick,
  handleLogoutClick,
  handleRegisterClick,
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAvatar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <Box>
        <Tooltip title='Current User'>
          <IconButton
            onClick={handleAvatar}
            size='large'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}>
            <Avatar sx={{ width: 50, height: 50 }}>
              {currentUser ? <UserAvatar name={currentUser} /> : <Avatar />}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem>
          <Avatar /> {currentUser ? currentUser : 'Guest'}
        </MenuItem>
        <Divider />
        {currentUser ? (
          <MenuItem onClick={handleLogoutClick}>
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            Logout
          </MenuItem>
        ) : (
          <Box>
            <MenuItem onClick={handleLoginClick}>
              <ListItemIcon>
                <Login fontSize='small' />
              </ListItemIcon>
              Login
            </MenuItem>
            <MenuItem onClick={handleRegisterClick}>
              <ListItemIcon>
                <PersonAddAltIcon fontSize='small' />
              </ListItemIcon>
              Register
            </MenuItem>
          </Box>
        )}
      </Menu>
    </>
  );
};

export default UserProfileIcon;

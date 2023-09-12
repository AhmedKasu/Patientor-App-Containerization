import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useTheme, useMediaQuery } from '@mui/material';

import NavBar from '../components/NavBar';

const ErrorPage = () => {
  const error = useRouteError();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const mainTextColor = '#7F8C8D';
  const subTextColor = '#BEC5C7';
  const subTextSize = isSmallScreen ? '2.5vw' : '1vw';
  return (
    <Container>
      <NavBar />
      {isRouteErrorResponse(error) && (
        <Box
          display='flex'
          height='50vh'
          alignItems='center'
          justifyContent='center'>
          <Stack
            direction='column'
            spacing={2}
            alignItems='center'
            justifyContent='center'
            sx={{ height: '100vh' }}>
            <SentimentVeryDissatisfiedIcon
              style={{
                fontSize: isSmallScreen ? '4rem' : '9rem',
                color: mainTextColor,
              }}
            />
            <Typography
              variant='h1'
              style={{
                fontSize: isSmallScreen ? '5vw' : '3vw',
                color: mainTextColor,
              }}>
              404
            </Typography>
            <Typography
              variant='h2'
              style={{
                fontSize: subTextSize,
                color: subTextColor,
              }}>
              Page not found!
            </Typography>
            <Typography style={{ color: subTextColor, fontSize: subTextSize }}>
              This page you are looking for does not exist or an expected error
              occured.
            </Typography>
            <Typography style={{ color: subTextColor, fontSize: subTextSize }}>
              Go back or click on the home button to choose a new dirrection.
            </Typography>
          </Stack>
        </Box>
      )}
    </Container>
  );
};

export default ErrorPage;

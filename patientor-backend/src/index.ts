import express, { Request } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PORT, NODE_ENV } from './utils/config';

import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import userRouter from './routes/users';
import login from './routes/login';

const app = express();

app.use(
  cors<Request>({
    origin:
      NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://patientor.herokuapp.com',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);
app.use('/api/users', userRouter);
app.use('/api/users/login', login);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express, { Request } from 'express';
import cors from 'cors';

import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import userRouter from './routes/users';

const app = express();

app.use(cors<Request>());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);
app.use('/api/users', userRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

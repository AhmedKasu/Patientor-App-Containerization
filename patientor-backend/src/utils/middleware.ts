import { NextFunction, Request, Response } from 'express';
import { Patient } from '../mongo';
import { PatientModelInterface } from 'src/mongo/models/Patient';
import { NotFoundError } from './errors';
export interface singleRouterReq extends Request {
  patient?: PatientModelInterface | null;
}

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (error.name) {
    case 'CastError':
      res.status(400).send({ error: 'Malformatted Id' });
      break;

    case 'ValidationError':
      res.status(400).send({ error: error.message });
      break;

    case 'NotFoundError':
      res
        .status(404)
        .send({ error: error.message ? error.message : 'Resource not found' });
      break;

    default:
      res.status(500).send({ error: 'An unexpected error occurred' }).end();
      break;
  }

  next(error);
  return;
};

const findByIdMiddleware = async (
  req: singleRouterReq,
  _res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  req.patient = await Patient.findById(id).populate('entries.entryId');

  if (!req.patient) throw new NotFoundError('Patient not found');

  next();
  return;
};

export { asyncHandler, errorHandler, findByIdMiddleware };

import { NextFunction, Request, Response } from 'express';
import Patient from '../mongo/models/Patient';
import { NotFoundError } from '../utils/errors';

const findByIdMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  req.patient = await Patient.findById(id).populate('entries.entryId');

  if (!req.patient) throw new NotFoundError('Patient not found');

  next();
  return;
};

export default findByIdMiddleware;

import { NextFunction, Request, Response } from 'express';
import Patient, { PatientModelInterface } from '../mongo/models/Patient';
import { NotFoundError } from '../utils/errors';

export interface singleRouterReq extends Request {
  patient?: PatientModelInterface | null;
}

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

export default findByIdMiddleware;

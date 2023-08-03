import { NextFunction, Request, Response } from 'express';
import { Patient } from '../mongo';
import { Patient as PatientType } from '../types';
import { isMongoId } from './utils';

export interface PatientReq extends Request {
  patient?: PatientType | null;
}

const findByIdMiddleware = (
  req: PatientReq,
  res: Response,
  next: NextFunction
) => {
  void (async () => {
    const { id } = req.params;
    if (!isMongoId(id)) return res.sendStatus(400);

    req.patient = await Patient.findById(id);
    if (!req.patient) return res.sendStatus(404);

    next();
    return;
  })();
};

export { findByIdMiddleware };

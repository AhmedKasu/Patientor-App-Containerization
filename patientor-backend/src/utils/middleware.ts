import { NextFunction, Request, Response } from 'express';
import { Patient } from '../mongo';
import { isMongoId } from './typeGuards';
import { PatientModelInterface } from 'src/mongo/models/Patient';
export interface singleRouterReq extends Request {
  patient?: PatientModelInterface | null;
}

const findByIdMiddleware = (
  req: singleRouterReq,
  res: Response,
  next: NextFunction
) => {
  void (async () => {
    const { id } = req.params;

    if (!isMongoId(id)) return res.sendStatus(400);

    req.patient = await Patient.findById(id).populate('entries.entryId');

    if (!req.patient) return res.sendStatus(404);

    next();
    return;
  })();
};

export { findByIdMiddleware };

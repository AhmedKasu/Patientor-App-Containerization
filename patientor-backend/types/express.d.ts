import 'express';
import { PatientModelInterface } from '../src/mongo/models/Patient';

declare module 'express' {
  export interface Request {
    cookies?: {
      accessToken: string;
    };
    patient?: PatientModelInterface | null;
    user?: string;
  }
}

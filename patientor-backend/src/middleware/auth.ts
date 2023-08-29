import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '../utils/config';

interface JWTPayload extends JwtPayload {
  id: string;
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken)
    return res.status(401).send('Access denied. accessToken not provided.');

  try {
    const decoded = verify(accessToken, JWT_SECRET) as JWTPayload;
    req.user = decoded.id;
    next();
  } catch (err) {
    res.clearCookie('accessToken');
    res.status(400).send('Invalid accessToken.');
  }
  return;
};

export const csrfAuth = (req: Request, res: Response, next: NextFunction) => {
  const csrfToken = req.headers['x-csrf-token'];

  if (!csrfToken)
    return res.status(401).send('Access denied. csrfToken not provided.');

  next();
  return;
};

export default auth;

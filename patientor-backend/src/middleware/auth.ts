import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '../utils/config';
import { getCache } from '../redis';

interface JWTPayload extends JwtPayload {
  id: string;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken)
    return res.status(401).send('Access denied. accessToken not provided.');

  try {
    const decoded = verify(accessToken, JWT_SECRET) as JWTPayload;
    req.user = decoded.id;
  } catch (err) {
    res.clearCookie('accessToken');
    return res.status(400).send('Invalid accessToken.');
  }

  // csrf auth
  const stateChangingMethods = ['POST', 'PUT', 'DELETE'];
  const csrfToken = req.headers['x-csrf-token'];

  if (!stateChangingMethods.includes(req.method)) return next();

  if (!csrfToken)
    return res.status(401).send('Access denied. csrfToken not provided.');

  try {
    const cachedCsrfToken = await getCache(req.user);
    if (cachedCsrfToken !== csrfToken)
      return res.status(400).send('Invalid csrfToken.');
  } catch (error) {
    return res.status(500).send('Internal server error.');
  }

  next();
};

export default auth;

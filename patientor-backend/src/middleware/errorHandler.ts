import { NextFunction, Request, Response } from 'express';

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

export default errorHandler;

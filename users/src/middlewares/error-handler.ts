import { NextFunction, Request, Response } from 'express';
import logger from '../services/logger';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error('Something went wrong.', err);

  if (err) {
    return res.status(400).send({
      message: err.message,
    });
  }

  res.status(400).send({
    message: 'Something went wrong.',
  });
};

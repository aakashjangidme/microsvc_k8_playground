import { NextFunction, Request, Response } from 'express';
import { Errors, IRestError, RestError } from '../errors/errors';
import logger from '../services/logger';

export const errorHandler = (
  err: Error & IRestError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.info(req.headers);

  logger.error(
    `${err.response?.status || 500} - ${err.response?.message} - ${
      req.originalUrl
    } - ${req.method} - ${req.ip}  ${err.message}`
  );

  if (err == null || err.response == null) {
    //error is not a custom error
    err = new RestError(Errors.InternalServerError);
  }

  return res.status(err.response?.status).send(err.response);
};

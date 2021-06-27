import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { Errors, IRestError, RestError } from '../errors/errors';
import logger from '../services/logger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // logger.info(req.headers);
  const auth = req.headers['x-forwarded-for'] !== null;
  logger.error(
    `[${req.method}] - [STATUS] ${err.response?.status} - [IP] ${req.headers['x-forwarded-for']} - [AUTH] ${auth} - [URL] ${req.originalUrl} - [RestError] ${err.response?.message} [ERROR] - ${err.message}`,
    err
  );

  if (err == null || err.response == null) {
    //error is not a custom error
    const temp: string = err.message;
    err = new RestError(Errors.InternalServerError);
    err.response.detail = temp;
  }

  return res.status(err.response?.status).send(err.response);
};

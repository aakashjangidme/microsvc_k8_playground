import { Request, Response, NextFunction } from 'express';
import logger from '../services/logger';

export const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const requestId = new Date().getTime();
  req.reqId = requestId;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  logger.info(`[${requestId}] [${req.method}] ${req.originalUrl} ${ip} `);
  next();
};

import { NextFunction, Request, Response } from 'express';

const controller = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(200).json({
    message: 'pong',
  });
};

export { controller as healthCheckController };

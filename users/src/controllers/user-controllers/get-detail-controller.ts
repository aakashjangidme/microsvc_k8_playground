import { NextFunction, Request, Response } from 'express';
import { getAllDetails as getUserDetails } from '../../repositories/users.repository';

const controller = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user: any = await getUserDetails(req.body);

    return res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

export { controller as getDetailController };

import { NextFunction, Request, Response } from 'express';
import logger from '../../services/logger';
import { UserDetail } from '../../entity/user-detail.entity';
import { getAllDetails, updateUser } from '../../repositories/users.repository';

const controller = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user: UserDetail = await updateUser(req.body);

    return res.status(200).json({
      user,
    });
  } catch (error) {
    // logger.error(error);
    next(error);
  }
};

export { controller as updateDetailController };

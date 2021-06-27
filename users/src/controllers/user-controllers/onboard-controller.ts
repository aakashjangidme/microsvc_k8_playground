import { NextFunction, Request, Response } from 'express';
import { Errors, RestError } from '../../errors/errors';
import { User } from '../../entity/user.entity';
import { updateUser } from '../../repositories/users.repository';
import { saveOrGetUser } from '../../repositories/users.repository';

const controller = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, email, role } = req.body;
    //
    if (!id || !email || !role) {
      throw new RestError(Errors.BadRequest, "You're a malformed bitch!!!");
    }
    let user: User = await saveOrGetUser(req.body);
    await updateUser({ id });

    return res.status(200).json({
      id: user.id,
    });
  } catch (error) {
    next(error);
  }
};

export { controller as onboardController };

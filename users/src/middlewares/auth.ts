import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/user.entity';
import { getRepository } from 'typeorm';

import firebase from '../config/firebase';

/** Decodes token and assign payload as object in the req */
const decodeAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      return res.status(401).send({ message: 'Unauthorized' });

    if (!authorization.startsWith('Bearer'))
      return res.status(401).send({ message: 'Unauthorized' });

    const split = authorization.split('Bearer ');
    if (split.length !== 2)
      return res.status(401).send({ message: 'Unauthorized' });

    const token = split[1];

    const decodedToken = await firebase.auth().verifyIdToken(token);

    req.payload = decodedToken;

    next();
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

/**Checks if a user is authenticated from firebase admin
 * Verifies by checking if decoded Token payload exist in the request or not.
 */
const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.payload) {
      next();
    } else {
      return res.status(401).json({
        error: {
          message:
            'You are not authorised to perform this action. SignUp/Login to continue',
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

// Checks if a user has the required permission from token claims stored in firebase admin for the user
const hasAdminRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRepsitory = getRepository(User);
    let user: User = await userRepsitory.findOne(req.payload.id);

    //TODO: Put Role in setCustomUserClaims firebase.

    if (req.payload.roleId <= user.role) {
      next();
    } else {
      return res.status(403).json({
        error: {
          message: 'You are not permitted to access this resource',
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: {
        message:
          'An error occurred while getting user access. Please try again',
      },
    });
  }
};
export { decodeAuthToken, isAuthorized, hasAdminRole };

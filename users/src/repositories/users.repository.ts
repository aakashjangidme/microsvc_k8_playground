import { User } from '../entity/user.entity';
import { getManager, getRepository } from 'typeorm';
import logger from '../services/logger';
import { UserDetail } from '../entity/user-detail.entity';
import { RestError } from '../errors/errors';
import { Errors } from '../errors/errors';

const NAMESPACE = 'USER REPOSITORY';

const saveOrGetUser = async (userFromRequest: any) => {
  const userRepsitory = getRepository(User);
  let user: User | undefined = await userRepsitory.findOne(userFromRequest.id);

  // This checking condition maybe not required because ORM updates the record if found!
  if (!user) {
    await userRepsitory.save(userFromRequest);

    logger.info(NAMESPACE, 'User has been saved.', userFromRequest);
    return userFromRequest;
  } else {
    logger.info(NAMESPACE, 'User Exists Already.', userFromRequest);
    return user;
  }
};
/** Update User detail */

const updateUser = async (userDetailFromRequest: any) => {
  const userRepsitory = getRepository(User);

  let user: User | undefined = await userRepsitory.findOne(
    userDetailFromRequest.id
  );

  if (!user) {
    throw new RestError(Errors.BadRequest, 'User does not exist.');
  }

  const userDetailRepsitory = getRepository(UserDetail);

  let userDetail: UserDetail | undefined = await userDetailRepsitory.findOne(
    user.id
  );

  //TODO: Build a middleware to validate request for particular userDetail (Firebase)

  if (!userDetail) {
    await userDetailRepsitory.save(userDetailFromRequest);
    logger.info(
      NAMESPACE,
      'User details have been saved',
      userDetailFromRequest
    );
    return userDetailFromRequest;
  } else {
    await userDetailRepsitory.update(
      userDetailFromRequest.id,
      userDetailFromRequest
    );
    logger.info(
      NAMESPACE,
      'User details have been updated',
      userDetailFromRequest
    );
    return userDetail;
  }
};

const getAllDetails = async (fromRequest: any) => {
  // const userRepsitory = getRepository(UserDetail);

  let user: any = await getManager()
    .createQueryBuilder()

    .from(User, 'usr')
    .innerJoin(UserDetail, 'usrd', 'usr.id = usrd.id')

    .where('usr.id = :id', { id: fromRequest.id })
    .getRawOne();

  if (!user) {
    throw new RestError(
      Errors.BadRequest,
      'Details for this user or this user does not exist.'
    );
  } else {
    logger.info(NAMESPACE, 'User Exists', user);
    return user;
  }
};
export { saveOrGetUser, updateUser, getAllDetails };

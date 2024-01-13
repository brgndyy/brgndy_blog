import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import HttpError from '../../error/HttpError';
import ERROR_MESSAGE from '../../constants/messages/errorMessage';

type UserType = {
  id: number;
  userId: string;
  userPassword: string;
  isAdmin: boolean;
};

dotenv.config();

const jwtSecret = process.env.JWT_SIGNATURE;

const createNewAccessToken = (newUser: UserType) => {
  const { id, userId } = newUser;

  if (!jwtSecret) {
    throw new HttpError(ERROR_MESSAGE.not_defined_jwt_secret, 503);
  }

  const newAccessToken = jwt.sign({ id: id, userId: userId }, jwtSecret, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });

  return newAccessToken;
};

export default createNewAccessToken;

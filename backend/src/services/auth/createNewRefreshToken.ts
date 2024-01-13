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

const createNewRefreshToken = (newUser: UserType) => {
  const { id } = newUser;

  if (!jwtSecret) {
    throw new HttpError(ERROR_MESSAGE.not_defined_jwt_secret, 503);
  }

  const newRefreshToken = jwt.sign({ id: id }, jwtSecret, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });

  return newRefreshToken;
};

export default createNewRefreshToken;

import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import HttpError from '../../error/HttpError';
import ERROR_MESSAGE from '../../constants/messages/errorMessage';

dotenv.config();

const jwtSecret = process.env.JWT_SIGNATURE;

const getUserIdOfToken = (refreshToken: string) => {
  if (!jwtSecret) {
    throw new HttpError(ERROR_MESSAGE.not_defined_jwt_secret, 503);
  }

  const verifiedToken = jwt.verify(refreshToken, jwtSecret);

  if (
    typeof verifiedToken === 'string' ||
    !Object.prototype.hasOwnProperty.call(verifiedToken, 'id')
  ) {
    throw new HttpError(ERROR_MESSAGE.fail_verify_refresh_token, 404);
  }

  const userIdOfToken = verifiedToken.id;

  return userIdOfToken;
};

export default getUserIdOfToken;

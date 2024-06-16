import ERROR_MESSAGE from '../constants/messages/errorMessage';
import HttpError from '../error/HttpError';
import { Request, Response, NextFunction } from 'express';
import createNewAccessToken from '../services/auth/createNewAccessToken';
import createNewRefreshToken from '../services/auth/createNewRefreshToken';
import hashValue from '../utils/hashValue';
import createRefreshTokenData from '../services/auth/createRefreshTokenData';
import findExistingUserByUserId from '../services/auth/findExistingUserByUserId';
import deleteRefreshTokenData from '../services/auth/deleteRefreshTokenData';

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, userPassword } = req.body;

    console.log('userPassword: ', userPassword);

    const existingUser = await findExistingUserByUserId(userId);

    if (!existingUser) {
      throw new HttpError(ERROR_MESSAGE.not_found_user, 503);
    }

    const newAccessToken = createNewAccessToken(existingUser);

    const newRefreshToken = createNewRefreshToken(existingUser);

    const hashedToken = await hashValue(newRefreshToken);

    await deleteRefreshTokenData(existingUser.id);

    await createRefreshTokenData(hashedToken, existingUser.id);

    return res.json({
      success: true,
      accessTokenValue: newAccessToken,
      refreshTokenValue: newRefreshToken,
    });
  } catch (err) {
    const error = new HttpError(ERROR_MESSAGE.fail_user_login, 503);

    return next(error);
  }
};

export default userLogin;

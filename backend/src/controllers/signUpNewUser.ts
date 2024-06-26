import ERROR_MESSAGE from '../constants/messages/errorMessage';
import HttpError from '../error/HttpError';
import { Request, Response, NextFunction } from 'express';
import hashValue from '../utils/hashValue';
import createNewUserInfoToDatabase from '../services/auth/createNewUserInfoToDatabase';
import createNewAccessToken from '../services/auth/createNewAccessToken';
import createNewRefreshToken from '../services/auth/createNewRefreshToken';
import createRefreshTokenData from '../services/auth/createRefreshTokenData';
import sendTokenCookieToClient from '../services/auth/sendTokenCookieToClient';
import * as dotenv from 'dotenv';

dotenv.config();

const signUpNewUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, userPassword } = req.body;

    const hashedPassword = await hashValue(userPassword);

    const createdNewUser = await createNewUserInfoToDatabase(userId, hashedPassword);

    const newAccessToken = createNewAccessToken(createdNewUser);

    const newRefreshToken = createNewRefreshToken(createdNewUser);

    const hashedRefreshToken = await hashValue(newRefreshToken);

    await createRefreshTokenData(hashedRefreshToken, createdNewUser.id);

    return res.json({
      success: true,
      accessTokenValue: newAccessToken,
      refreshTokenValue: newRefreshToken,
    });
  } catch (err) {
    const error = new HttpError(ERROR_MESSAGE.fail_user_sign_up, 503);
    console.error(err);

    return next(error);
  }
};

export default signUpNewUser;

import { Request, Response, NextFunction } from 'express';
import HttpError from '../error/HttpError';
import ERROR_MESSAGE from '../constants/messages/errorMessage';
import getUserIdOfToken from '../services/auth/getUserIdOfToken';
import findDataOfRefreshToken from '../services/auth/findDataOfRefreshToken';
import findUserFromRefreshTokenData from '../services/auth/findUserFromRefreshTokenData';
import findExistingUserDataFromId from '../services/auth/findExistingUserDataFromId';
import createNewAccessToken from '../services/auth/createNewAccessToken';
import PROGRESS_MESSAGE from '../constants/messages/progressMessage';

const sendNewAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;

    const userIdOfToken = getUserIdOfToken(refreshToken);

    console.log('userIdOfToken : ', userIdOfToken);

    const dataOfRefreshToken = await findDataOfRefreshToken(userIdOfToken);

    const foundedUserFromRefreshTokenData = await findUserFromRefreshTokenData(
      dataOfRefreshToken.userId,
    );

    const foundedExisitngUserFromId = await findExistingUserDataFromId(
      foundedUserFromRefreshTokenData.userId,
    );

    console.log('foundedExisitngUserFromId :', foundedExisitngUserFromId);

    const newAccessToken = createNewAccessToken(foundedExisitngUserFromId);

    return res.json({
      message: PROGRESS_MESSAGE.succeed_send_new_access_token,
      newAccessToken: newAccessToken,
    });
  } catch (err) {
    const error = new HttpError(ERROR_MESSAGE.fail_send_new_access_token, 503);
    return next(error);
  }
};

export default sendNewAccessToken;

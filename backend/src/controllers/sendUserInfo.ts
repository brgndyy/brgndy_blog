import { CustomRequestType } from '../@types/type';
import { Response, NextFunction } from 'express';
import HttpError from '../error/HttpError';
import ERROR_MESSAGE from '../constants/messages/errorMessage';
import findExistingUserDataFromId from '../services/auth/findExistingUserDataFromId';

const sendUserInfo = async (req: CustomRequestType, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      throw new HttpError(ERROR_MESSAGE.not_found_user, 503);
    }

    const existingUserInfo = await findExistingUserDataFromId(user.id);

    const { userPassword, ...safeDataValues } = existingUserInfo.dataValues;

    return res.json({ userInfo: safeDataValues });
  } catch (err) {
    const error = new HttpError(ERROR_MESSAGE.fail_send_user_info, 503);
    return next(error);
  }
};

export default sendUserInfo;

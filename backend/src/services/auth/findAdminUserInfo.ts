import HttpError from '../../error/HttpError';
import ERROR_MESSAGE from '../../constants/messages/errorMessage';
import { User } from '../../models/users';
import * as dotenv from 'dotenv';

dotenv.config();

const findAdminUserInfo = async (userId: number) => {
  try {
    const foundUser = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!foundUser) {
      throw new HttpError(ERROR_MESSAGE.not_found_user, 503);
    }

    return foundUser;
  } catch (err) {
    throw new HttpError(ERROR_MESSAGE.not_found_user, 503);
  }
};

export default findAdminUserInfo;

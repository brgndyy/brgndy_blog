import HttpError from '../../error/HttpError';
import ERROR_MESSAGE from '../../constants/messages/errorMessage';
import { User } from '../../models/users';

const findExistingUserByUserId = async (userId: string) => {
  try {
    const existingUser = await User.findOne({
      where: {
        userId: userId,
      },
    });

    if (!existingUser) {
      throw new HttpError(ERROR_MESSAGE.not_found_user, 503);
    }

    return existingUser;
  } catch (err) {
    throw new HttpError(ERROR_MESSAGE.not_found_user, 503);
  }
};

export default findExistingUserByUserId;

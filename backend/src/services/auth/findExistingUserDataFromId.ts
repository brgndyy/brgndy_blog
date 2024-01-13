import ERROR_MESSAGE from '../../constants/messages/errorMessage';
import HttpError from '../../error/HttpError';
import { User } from '../../models/users';

const findExistingUserDataFromId = async (id: number) => {
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpError(ERROR_MESSAGE.not_found_user, 503);
    }

    return user;
  } catch (err) {
    throw new HttpError(ERROR_MESSAGE.not_found_user, 503);
  }
};

export default findExistingUserDataFromId;

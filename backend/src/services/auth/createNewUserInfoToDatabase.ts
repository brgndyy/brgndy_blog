import ERROR_MESSAGE from '../../constants/messages/errorMessage';
import HttpError from '../../error/HttpError';
import { User } from '../../models/users';

const createNewUserInfoToDatabase = async (userId: string, userPassword: string) => {
  try {
    const newUser = await User.create({
      userId: userId,
      userPassword: userPassword,
      isAdmin: true,
    });

    if (!newUser) {
      throw new HttpError(ERROR_MESSAGE.fail_create_new_user, 503);
    }

    return newUser;
  } catch (err) {
    throw new HttpError(ERROR_MESSAGE.fail_create_new_user, 503);
  }
};

export default createNewUserInfoToDatabase;

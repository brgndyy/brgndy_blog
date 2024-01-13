import { compare } from 'bcrypt';
import ERROR_MESSAGE from '../../constants/messages/errorMessage';
import HttpError from '../../error/HttpError';

const verifyPassword = async (passwordInput: string, passwordFromDatabase: string) => {
  try {
    const isPasswordMatch = await compare(passwordInput, passwordFromDatabase);

    if (!isPasswordMatch) {
      throw new HttpError(ERROR_MESSAGE.invalid_password, 503);
    }

    return isPasswordMatch;
  } catch (err) {
    throw new HttpError(ERROR_MESSAGE.fail_compare_password, 503);
  }
};

export default verifyPassword;

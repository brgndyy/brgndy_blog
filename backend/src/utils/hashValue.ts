import { hash } from 'bcrypt';
import ERROR_MESSAGE from '../constants/messages/errorMessage';

const hashValue = async (password: string): Promise<string> => {
  const saltRounds = 10;
  try {
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    throw new Error(ERROR_MESSAGE.fail_hash_password);
  }
};

export default hashValue;

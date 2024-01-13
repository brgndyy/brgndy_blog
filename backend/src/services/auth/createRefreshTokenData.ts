import HttpError from '../../error/HttpError';
import ERROR_MESSAGE from '../../constants/messages/errorMessage';
import { RefreshToken } from '../../models/refreshTokens';

const createRefreshTokenData = async (hashedRefreshToken: string, userId: number) => {
  try {
    await RefreshToken.create({
      refreshToken: hashedRefreshToken,
      userId: userId,
    });
  } catch (err) {
    throw new HttpError(ERROR_MESSAGE.fail_save_refresh_token, 503);
  }
};

export default createRefreshTokenData;

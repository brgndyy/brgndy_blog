import { RefreshToken } from '../../models/refreshTokens';
import HttpError from '../../error/HttpError';
import ERROR_MESSAGE from '../../constants/messages/errorMessage';

const findUserFromRefreshTokenData = async (id: number) => {
  try {
    const refreshTokenData = await RefreshToken.findOne({
      where: {
        userId: id,
      },
    });

    if (!refreshTokenData) {
      throw new HttpError(ERROR_MESSAGE.fail_verify_refresh_token, 503);
    }

    return refreshTokenData;
  } catch (err) {
    throw new HttpError(ERROR_MESSAGE.fail_verify_refresh_token, 503);
  }
};

export default findUserFromRefreshTokenData;

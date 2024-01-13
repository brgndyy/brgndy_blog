import HttpError from '../../error/HttpError';
import ERROR_MESSAGE from '../../constants/messages/errorMessage';
import { RefreshToken } from '../../models/refreshTokens';

const findDataOfRefreshToken = async (userIdOfToken: number) => {
  try {
    const dataOfRefreshToken = await RefreshToken.findOne({
      where: {
        userId: userIdOfToken,
      },
    });

    if (!dataOfRefreshToken) {
      throw new HttpError(ERROR_MESSAGE.fail_verify_refresh_token, 503);
    }

    return dataOfRefreshToken;
  } catch (err) {
    throw new HttpError(ERROR_MESSAGE.fail_verify_refresh_token, 503);
  }
};

export default findDataOfRefreshToken;

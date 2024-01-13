import ERROR_MESSAGE from '../../constants/messages/errorMessage';
import HttpError from '../../error/HttpError';
import { RefreshToken } from '../../models/refreshTokens';

const deleteRefreshTokenData = async (userId: number) => {
  try {
    await RefreshToken.destroy({
      where: {
        userId: userId,
      },
    });
  } catch (err) {
    throw new HttpError(ERROR_MESSAGE.fail_delete_refresh_token, 503);
  }
};

export default deleteRefreshTokenData;

import { Response } from 'express';
import TOKEN_COOKIE_CONFIG from '../../constants/configs/tokenCookieConfig';

const sendTokenCookieToClient = (type: string, token: string, res: Response) => {
  const cookieConfig =
    type === 'accessToken' ? TOKEN_COOKIE_CONFIG.access_token : TOKEN_COOKIE_CONFIG.refresh_token;

  return res.cookie(type, token, cookieConfig);
};

export default sendTokenCookieToClient;

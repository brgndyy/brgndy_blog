import { NextResponse } from 'next/server';
import TOKEN_COOKIE_CONFIG from '../_constants/tokenCookieConfig';

const setNewAccessTokenToHeader = (response: NextResponse, newAccessToken: string) => {
  response.cookies.set('accessToken', newAccessToken, TOKEN_COOKIE_CONFIG.access_token);

  response.headers.set('X-NewAccessToken', newAccessToken);
};

export default setNewAccessTokenToHeader;

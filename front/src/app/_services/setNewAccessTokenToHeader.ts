import { NextResponse } from 'next/server';
import TOKEN_COOKIE_CONFIG from '../_constants/tokenCookieConfig';
import PROCCESS_MESSAGE from '../_constants/processMessage';

const setNewAccessTokenToHeader = (response: NextResponse, newAccessToken: string) => {
  response.cookies.set('accessToken', newAccessToken, TOKEN_COOKIE_CONFIG.access_token);

  response.headers.set('X-NewAccessToken', newAccessToken);

  console.log(PROCCESS_MESSAGE.succeed_set_new_access_token);
};

export default setNewAccessTokenToHeader;

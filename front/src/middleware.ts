import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getTokenValues from './app/_services/getTokenValue';
import { getNewAccessToken } from './app/_services/getNewAccessToken';
import TOKEN_COOKIE_CONFIG from './app/_constants/tokenCookieConfig';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { fetchMode, accessToken, refreshToken } = getTokenValues(request);

  console.log('accessToken :', accessToken);
  console.log('refreshToken :', refreshToken);
  console.log('fetchMode :', fetchMode);

  console.log('미들웨어 실행 ! ');

  if (!accessToken && refreshToken) {
    console.log('액세스토큰 미들웨어 실행 ! ');
    const res = await getNewAccessToken(refreshToken);

    console.log('res : ', res);

    const { newAccessToken } = res;

    response.cookies.set('accessToken', newAccessToken, TOKEN_COOKIE_CONFIG.access_token);

    response.headers.set('X-NewAccessToken', newAccessToken);
  }

  return response;
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

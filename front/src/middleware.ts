import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getTokenValues from './app/_services/getTokenValue';
import { getNewAccessToken } from './app/_services/getNewAccessToken';
import TOKEN_COOKIE_CONFIG from './app/_constants/tokenCookieConfig';
import applySetCookie from './app/_utils/applySetCookie';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { accessToken, refreshToken } = getTokenValues(request);

  if (!accessToken && refreshToken) {
    console.log('액세스토큰 미들웨어 실행 ! ');
    const res = await getNewAccessToken(refreshToken);

    console.log('res : ', res);

    const { newAccessToken } = res;

    response.cookies.set('accessToken', newAccessToken, TOKEN_COOKIE_CONFIG.access_token);
    applySetCookie(request, res);
  }

  return response;
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

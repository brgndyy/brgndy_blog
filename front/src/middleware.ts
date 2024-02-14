import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getTokenValues from './app/_services/getTokenValue';
import { getNewAccessToken } from './app/_services/getNewAccessToken';
import TOKEN_COOKIE_CONFIG from './app/_constants/tokenCookieConfig';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { accessToken, refreshToken } = getTokenValues(request);
  const fetchMode = request.headers.get('sec-fetch-mode');

  if (
    (url.pathname === '/' && !accessToken && refreshToken) ||
    (url.pathname === '/' && fetchMode === 'navigate' && refreshToken)
  ) {
    const res = await getNewAccessToken(refreshToken);

    if (res && res.newAccessToken) {
      const response = NextResponse.next();
      const { newAccessToken } = res;

      response.cookies.set('accessToken', newAccessToken, TOKEN_COOKIE_CONFIG.access_token);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

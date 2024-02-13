import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getTokenValues from './app/_services/getTokenValue';
import { getNewAccessToken } from './app/_services/getNewAccessToken';
import TOKEN_COOKIE_CONFIG from './app/_constants/tokenCookieConfig';

export async function middleware(request: NextRequest) {
  NextResponse.redirect(request.nextUrl.clone());
  const response = NextResponse.next();
  const { accessToken, refreshToken } = getTokenValues(request);
  const fetchMode = request.headers.get('sec-fetch-mode');

  console.log('fetchMode: ', fetchMode);

  if ((!accessToken && refreshToken) || (fetchMode === 'navigate' && refreshToken)) {
    const res = await getNewAccessToken(refreshToken);

    const { newAccessToken } = res;

    response.cookies.set('accessToken', newAccessToken, TOKEN_COOKIE_CONFIG.access_token);
  }

  return response;
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

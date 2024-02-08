import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getTokenValues from './app/_services/getTokenValue';
import { getNewAccessToken } from './app/_services/getNewAccessToken';
import TOKEN_COOKIE_CONFIG from './app/_constants/tokenCookieConfig';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { accessToken, refreshToken } = getTokenValues(request);

  if (!accessToken && refreshToken) {
    const newResponse = NextResponse.redirect(request.nextUrl.clone());
    const res = await getNewAccessToken(refreshToken);

    console.log('res : ', res); // received well

    const { newAccessToken } = res;

    newResponse.cookies.set('accessToken', newAccessToken, TOKEN_COOKIE_CONFIG.access_token);

    return newResponse;
  }

  return response;
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

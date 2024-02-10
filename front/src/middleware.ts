import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getTokenValues from './app/_services/getTokenValue';
import { getNewAccessToken } from './app/_services/getNewAccessToken';
import TOKEN_COOKIE_CONFIG from './app/_constants/tokenCookieConfig';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { accessToken, refreshToken } = getTokenValues(request);
  const alreadyRedirected = request.cookies.get('alreadyRedirected')?.value === 'true';

  if (!accessToken && refreshToken && !alreadyRedirected) {
    const newResponse = NextResponse.redirect(request.nextUrl.clone());
    const res = await getNewAccessToken(refreshToken);

    const { newAccessToken } = res;

    newResponse.cookies.set('accessToken', newAccessToken, TOKEN_COOKIE_CONFIG.access_token);
    newResponse.cookies.set('alreadyRedirected', 'true', {
      path: '/',
      expires: Date.now() + 60 * 1000,
    });

    return newResponse;
  }

  if (alreadyRedirected) {
    response.cookies.delete('alreadyRedirected');
  }

  return response;
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

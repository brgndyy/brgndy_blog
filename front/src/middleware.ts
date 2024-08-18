import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getTokenValues from './app/_services/getTokenValue';
import { getNewAccessToken } from './app/_services/getNewAccessToken';
import applySetCookie from './app/_utils/applySetCookie';

export async function middleware(request: NextRequest) {
  const { accessToken, refreshToken } = getTokenValues(request);
  const response = NextResponse.next();

  if (!accessToken && refreshToken) {
    const res = await getNewAccessToken(refreshToken);

    if (res && res.newAccessToken) {
      const { newAccessToken } = res;

      response.cookies.set('accessToken', newAccessToken, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      applySetCookie(request, response);
    }
  }

  return response || NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

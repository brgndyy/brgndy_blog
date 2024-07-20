import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getTokenValues from './app/_services/getTokenValue';
import { getNewAccessToken } from './app/_services/getNewAccessToken';

export async function middleware(request: NextRequest) {
  const { accessToken, refreshToken } = getTokenValues(request);
  let response = null;

  if (!accessToken && refreshToken) {
    const res = await getNewAccessToken(refreshToken);

    if (res && res.newAccessToken) {
      response = NextResponse.next();
      const { newAccessToken } = res;

      console.log('hi');

      response.cookies.set('accessToken', newAccessToken, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
    }
  }

  return response || NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

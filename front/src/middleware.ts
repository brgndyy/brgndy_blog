import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getTokenValues from './app/_services/getTokenValue';
import { getNewAccessToken } from './app/_services/getNewAccessToken';

export async function middleware(request: NextRequest) {
  const { accessToken, refreshToken } = getTokenValues(request);
  const fetchMode = request.headers.get('sec-fetch-mode');

  if ((!accessToken && refreshToken) || (fetchMode === 'navigate' && refreshToken)) {
    console.log('');
    const res = await getNewAccessToken(refreshToken);

    if (res && res.newAccessToken) {
      const response = NextResponse.next();
      const { newAccessToken } = res;

      response.cookies.set('accessToken', newAccessToken, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

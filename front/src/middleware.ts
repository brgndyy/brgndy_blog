import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getTokenValues from './app/_services/getTokenValue';
import { getNewAccessToken } from './app/_services/getNewAccessToken';
import setNewAccessTokenToHeader from './app/_services/setNewAccessTokenToHeader';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { fetchMode, accessToken, refreshToken } = getTokenValues(request);

  if ((!accessToken && refreshToken) || (fetchMode === 'navigate' && refreshToken)) {
    const res = await getNewAccessToken(refreshToken);

    const { newAccessToken } = res;

    setNewAccessTokenToHeader(response, newAccessToken);
  }


  return response;
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

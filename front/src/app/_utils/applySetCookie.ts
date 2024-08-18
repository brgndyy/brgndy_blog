import { NextResponse, type NextRequest } from 'next/server';
import { ResponseCookies, RequestCookies } from 'next/dist/server/web/spec-extension/cookies';

export default function applySetCookie(req: NextRequest, res: NextResponse): void {
  const setCookies = new ResponseCookies(res.headers);
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);

  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

  const nextResponse = NextResponse.next({
    request: { headers: newReqHeaders },
  });

  nextResponse.headers.forEach((value, key) => {
    if (key === 'x-middleware-override-headers' || key.startsWith('x-middleware-request-')) {
      res.headers.set(key, value);
    }
  });
}

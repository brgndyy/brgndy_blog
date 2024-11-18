import { NextResponse } from 'next/server';
import TOKEN_COOKIE_CONFIG from '@/app/_constants/tokenCookieConfig';
import ERROR_MESSAGE from '@/app/_constants/errorMessage';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { newAccessToken } = data;


    const response = new NextResponse();

    response.cookies.set('accessToken', newAccessToken, TOKEN_COOKIE_CONFIG.access_token);

    return response;
  } catch (err) {
    throw new Error(ERROR_MESSAGE.fail_create_token);
  }
}

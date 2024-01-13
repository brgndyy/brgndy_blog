import type { NextRequest } from 'next/server';

const getTokenValues = (request: NextRequest) => {
  const fetchMode = request.headers.get('sec-fetch-mode');
  const accessTokenObj = request.cookies.get('accessToken');
  const refreshTokenObj = request.cookies.get('refreshToken');
  const accessToken = accessTokenObj?.value;
  const refreshToken = refreshTokenObj?.value;

  return { fetchMode, accessToken, refreshToken };
};

export default getTokenValues;

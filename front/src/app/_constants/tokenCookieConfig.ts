import deepFreeze from '../_utils/deepFreeze';

const getTokenCookieConfig = () => {
  const isProduction = process.env.NEXT_PUBLIC_FRONT_ENV_MODE === 'production';
  const expirationStandardTime = isProduction ? 86400000 : 7200000;

  const tokenCookieConfig = {
    expiration_standard_time: expirationStandardTime,
    access_token: {
      expires: new Date(Date.now() + 90 * 60 * 1000),
      secure: isProduction,
      httpOnly: isProduction,
      sameSite: 'lax' as 'none' | 'lax' | 'strict' | undefined,
      path: '/',
    },
    refresh_token: {
      expires: new Date(Date.now() + (isProduction ? 7 : 1) * 24 * 60 * 60 * 1000),
      secure: isProduction,
      httpOnly: isProduction,
      sameSite: 'lax' as 'none' | 'lax' | 'strict' | undefined,
      path: '/',
    },
  };

  return deepFreeze(tokenCookieConfig);
};

const TOKEN_COOKIE_CONFIG = getTokenCookieConfig();

export default TOKEN_COOKIE_CONFIG;

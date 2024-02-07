import deepFreeze from '../../utils/deepFreeze';

const getTokenCookieConfig = () => {
  const isProduction = process.env.BACK_END_NODE_ENV === 'production';
  const expiration_standard_time = isProduction ? 86400000 : 7200000;

  const tokenCookieConfig = {
    expiration_standard_time: expiration_standard_time,
    access_token: {
      expires: new Date(Date.now() + 30 * 60 * 1000),
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

import deepFreeze from '../_utils/deepFreeze';

const TOKEN_COOKIE_CONFIG = deepFreeze({
  access_token: {
    expires: new Date(Date.now() + 30 * 60 * 1000),
    secure: true,
    httpOnly: true,
    sameSite: 'lax' as 'none' | 'lax' | 'strict' | undefined,
    path: '/',
  },
  refresh_token: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    secure: true,
    httpOnly: true,
    sameSite: 'lax' as 'none' | 'lax' | 'strict' | undefined,
    path: '/',
  },
});

export default TOKEN_COOKIE_CONFIG;

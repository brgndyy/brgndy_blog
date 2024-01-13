import deepFreeze from '../_utils/deepFreeze';

const TOKEN_COOKIE_CONFIG = deepFreeze({
  access_token: {
    expires: new Date(Date.now() + 10 * 60 * 1000),
    secure: false,
    httpOnly: true,
    sameSite: 'lax' as const,
    path: '/',
  },
  refresh_token: {
    expires: new Date(Date.now() + 60 * 60 * 1000),
    secure: false,
    httpOnly: true,
    sameSite: 'lax' as const,
    path: '/',
  },
});

export default TOKEN_COOKIE_CONFIG;

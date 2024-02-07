import ERROR_MESSAGE from '../_constants/errorMessage';
import PATH_ROUTES from '../_constants/pathRoutes';

const getUserInfoByAccessToken = async (accessToken?: string) => {
  if (!accessToken) {
    return undefined;
  }

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_FRONT_ENV_MODE === 'production'
      ? process.env.NEXT_PUBLIC_DEFAULT_BACKEND_URL
      : process.env.NEXT_PUBLIC_DEV_BACKEND_URL;

  try {
    const res = await fetch(`${BACKEND_URL}${PATH_ROUTES.get_user_info}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(ERROR_MESSAGE.fail_get_user_info);
    }

    const data = await res.json();

    const { userInfo } = data;

    return userInfo;
  } catch (err) {
    throw new Error(ERROR_MESSAGE.fail_get_user_info);
  }
};

export default getUserInfoByAccessToken;

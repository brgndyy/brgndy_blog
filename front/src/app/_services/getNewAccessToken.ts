import PATH_ROUTES from '../_constants/pathRoutes';
import ERROR_MESSAGE from '../_constants/errorMessage';

export const getNewAccessToken = async (refreshToken: string) => {
  try {
    const BACKEND_URL =
      process.env.NEXT_PUBLIC_FRONT_ENV_MODE === 'production'
        ? process.env.NEXT_PUBLIC_DEFAULT_BACKEND_URL
        : process.env.NEXT_PUBLIC_DEV_BACKEND_URL;

    const res = await fetch(`${BACKEND_URL}${PATH_ROUTES.get_new_access_token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
      credentials: 'include',
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(ERROR_MESSAGE.fail_get_new_access_token);
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    throw new Error(ERROR_MESSAGE.fail_get_new_access_token);
  }
};

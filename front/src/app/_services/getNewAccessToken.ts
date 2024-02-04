import PATH_ROUTES from '../_constants/pathRoutes';
import ERROR_MESSAGE from '../_constants/errorMessage';

export const getNewAccessToken = async (refreshToken: string) => {
  const res = await fetch(`${process.env.DEFAULT_BACKEND_URL}${PATH_ROUTES.get_new_access_token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.fail_get_new_access_token);
  }

  const data = await res.json();

  return data;
};

import { notFound } from 'next/navigation';
import PATH_ROUTES from '../_constants/pathRoutes';
import ERROR_MESSAGE from '../_constants/errorMessage';

const getIndividualPost = async (decodedSlug: string) => {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_FRONT_ENV_MODE === 'production'
      ? process.env.NEXT_PUBLIC_DEFAULT_BACKEND_URL
      : process.env.NEXT_PUBLIC_DEV_BACKEND_URL;

  try {
    const res = await fetch(`${BACKEND_URL}${PATH_ROUTES.get_post_by_slug(decodedSlug)}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      notFound();
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    notFound();
    throw new Error(ERROR_MESSAGE.fail_get_post);
  }
};

export default getIndividualPost;

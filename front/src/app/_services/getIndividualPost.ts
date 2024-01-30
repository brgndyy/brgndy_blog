import { notFound } from 'next/navigation';
import PATH_ROUTES from '../_constants/pathRoutes';
import ERROR_MESSAGE from '../_constants/errorMessage';

const getIndividualPost = async (decodedSlug: string) => {
  try {
    const res = await fetch(
      `${process.env.DEFAULT_BACKEND_URL}${PATH_ROUTES.get_post_by_slug(decodedSlug)}`,
      {
        cache: 'no-store', // 캐시할것인지 말것인지 나중에 일단 생각해보자
      },
    );

    if (!res.ok) {
      notFound();
    }

    const data = await res.json();

    return data;
  } catch (err) {
    notFound();
    throw new Error(ERROR_MESSAGE.fail_get_post);
  }
};

export default getIndividualPost;

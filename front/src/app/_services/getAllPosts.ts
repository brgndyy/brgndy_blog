import ERROR_MESSAGE from '../_constants/errorMessage';
import PATH_ROUTES from '../_constants/pathRoutes';

const getAllPosts = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DEFAULT_BACKEND_URL}${PATH_ROUTES.get_all_posts}`,
      {
        cache: 'no-cache', // 캐시할것인지 말것인지 나중에 일단 생각해보자
      },
    );

    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error(ERROR_MESSAGE.fail_get_post);
  }
};

export default getAllPosts;

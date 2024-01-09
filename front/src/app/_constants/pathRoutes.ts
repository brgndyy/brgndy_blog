import deepFreeze from '../_utils/deepFreeze';

const PATH_ROUTES = deepFreeze({
  get_all_posts: 'api/posts',
  get_post_by_slug: (slug: string) => `api/posts/${slug}`,
});

export default PATH_ROUTES;

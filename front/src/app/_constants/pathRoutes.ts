import deepFreeze from '../_utils/deepFreeze';

const PATH_ROUTES = deepFreeze({
  get_all_posts: 'api/posts',
  get_post_by_slug: (slug: string) => `api/posts/${slug}`,
  write_new_post: 'api/posts',
  sign_up_user: 'api/user',
  login_user: 'api/user/login',
  get_new_access_token: 'api/user/new-accees-token',
  get_user_info: 'api/user/info',
  get_thumbnail_image: 'api/posts/thumbnail-image',
  delete_post: (slug: string) => `api/posts/${slug}`,
});

export default PATH_ROUTES;

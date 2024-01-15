import deepFreeze from '../_utils/deepFreeze';

const ERROR_MESSAGE = deepFreeze({
  fail_get_post: '게시글을 불러오는데에 실패했어요!',
  fail_write_new_post: '게시글을 작성하는데에 실패했어요!',
  fail_auth: '회원 인증에 실패했어요!',
  fail_create_token: '토큰을 생성하는데에 실패했어요!',
  fail_get_new_access_token: '새로운 액세스 토큰을 얻는데에 실패했어요!',
  fail_get_user_info: '회원정보를 받아오는데에 실패했어요!',
  fail_post_edit: '게시글을 수정하는데에 실패했어요!',
  fail_get_thumbnail_image: '게시글 썸네일 이미지를 받아오는데에 실패했어요!',
});

export default ERROR_MESSAGE;

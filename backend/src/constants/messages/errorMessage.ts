import deepFreeze from '../../utils/deepFreeze';

const ERROR_MESSAGE = deepFreeze({
  default_error: '알수 없는 에러가 발생했어요!',
  fail_get_all_post: '게시글들을 불러오는데에 실패했어요!',
  not_found_post: '게시글 db에서 불러오는데에 실패했어요!',
  not_found_user: '유저를 조회하는데에 실패했어요!',
  fail_get_individual_post: '게시글을 불러오는데에 실패했어요!',
});

export default ERROR_MESSAGE;

import deepFreeze from '../../utils/deepFreeze';

const ERROR_MESSAGE = deepFreeze({
  default_error: '알수 없는 에러가 발생했어요!',
  fail_get_all_post: '게시글들을 불러오는데에 실패했어요!',
  not_found_post: '게시글 db에서 불러오는데에 실패했어요!',
  not_found_user: '유저를 조회하는데에 실패했어요!',
  fail_get_individual_post: '게시글을 불러오는데에 실패했어요!',
  fail_create_new_post: '새로운 게시글을 생성하는데에 실패했어요!',
  fail_user_sign_up: '회원가입에 실패했어요!',
  fail_user_login: '로그인에 실패했어요!',
  fail_hash_password: '비밀번호 해쉬화에 실패했어요!',
  fail_create_new_user: '회원가입에 실패했어요!',
  not_defined_jwt_secret: 'jwt이 정의되지 않았어요!',
  fail_save_refresh_token: '리프레쉬토큰을 데이터베이스에 저장하는데에 실패했어요!',
  fail_delete_refresh_token: '리프레쉬 토큰을 삭제하는데에 실패했어요!',
  fail_compare_password: '비밀번호를 조회하는데에 실패했어요!',
  invalid_password: '비밀번호가 일치하지 않아요!',
  fail_send_new_access_token: '새로운 액세스 토큰을 보내는데에 실패했어요!',
  fail_verify_refresh_token: '리프레쉬토큰을 조회하는데에 실패했어요!',
  not_verified_token: '유효하지 않은 토큰이에요!',
  expired_token: '만료된 토큰이에요!',
  fail_send_user_info: '회원정보를 보내는데에 실패했어요!',
  fail_send_thumbnail_image: '게시글의 썸네일 이미지를 전송하는데에 실패했어요!',
  fail_update_post: '게시글을 수정하는데에 실패했어요!',
  fail_delete_post: '게시글을 삭제하는데에 실패했어요!',
  fail_upload_image: '이미지를 업로드하는데에 실패했어요!',
  fail_get_image_from_s3: 'S3로부터 이미지를 가져오는데에 실패했어요!',
});

export default ERROR_MESSAGE;

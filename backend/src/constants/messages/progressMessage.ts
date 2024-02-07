import deepFreeze from '../../utils/deepFreeze';

const PROGRESS_MESSAGE = deepFreeze({
  ready_from_port: '번에서 대기중!',
  succeed_connect_database: '데이터베이스 연결에 성공했어요!',
  succeed_send_new_access_token: '새로운 액세스 토큰 발급 완료!',
  sever_start_from_development: '개발 환경에서 서버 시작!',
  sever_start_from_production: '배포 환경에서 서버 시작!',
});

export default PROGRESS_MESSAGE;

import deepFreeze from '../_utils/deepFreeze';

const ADMIN_MENU_LIST = deepFreeze([
  {
    id: 1,
    title: '새 글 작성',
    path: '/write',
  },
  {
    id: 2,
    title: '임시 글',
    path: 'saves',
  },
]);

export default ADMIN_MENU_LIST;

import { FaGithub } from 'react-icons/fa';
import deepFreeze from '../_utils/deepFreeze';

const LINK_ROUTES = deepFreeze([
  {
    id: 1,
    title: 'github',
    path: 'https://github.com/brgndyy',
    icon: <FaGithub />,
  },
]);

export default LINK_ROUTES;

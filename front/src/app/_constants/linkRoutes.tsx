import { FaGithub } from 'react-icons/fa';
import deepFreeze from '../_utils/deepFreeze';

const LINK_ROUTES = deepFreeze([
  {
    id: 1,
    title: 'about',
    path: '/about',
    icon: 'About',
    isOpenNewPage: false,
  },
  {
    id: 2,
    title: 'github',
    path: 'https://github.com/brgndyy',
    icon: <FaGithub />,
    isOpenNewPage: true,
  },
]);

export default LINK_ROUTES;

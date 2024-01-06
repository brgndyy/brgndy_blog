import { FaGithub } from 'react-icons/fa';
import deepFreeze from '../_utils/deepFreeze';
import { linkIcon } from '../_components/_composables/headerLinks/headerLinkItem.css';

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
    icon: <FaGithub className={linkIcon} />,
    isOpenNewPage: true,
  },
]);

export default LINK_ROUTES;

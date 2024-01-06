import React from 'react';
import ADMIN_MENU_LIST from '@/app/_constants/adminMenuList';
import { menuContainer } from './adminMenu.css';
import AdminLink from './AdminLink';
import Wrapper from '../_composables/wrapper/Wrapper';

export default function AdminMenu() {
  return (
    <Wrapper className={menuContainer}>
      {ADMIN_MENU_LIST.map((menu) => {
        return <AdminLink key={menu.id} path={menu.path} title={menu.title} />;
      })}
    </Wrapper>
  );
}

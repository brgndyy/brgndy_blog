import { myStyle } from '@/app/_styles/vars.css';
import { HeaderPropsType } from 'types';
import { headerContainer, wrapper, headerLinkContainer } from './header.css';
import HeaderLinkList from '../_composables/headerLinks/HeaderLinkList';
import HeaderBanner from './HeaderBanner';
import Container from '../_composables/container/Container';
import Admin from '../_admin/Admin';

export default function Header({ isAdmin }: HeaderPropsType) {
  return (
    <div className={`${headerContainer} ${myStyle}`}>
      <Container className={wrapper}>
        <HeaderBanner />
        <Container className={headerLinkContainer}>
          {isAdmin && <Admin />}
          <HeaderLinkList />
        </Container>
      </Container>
    </div>
  );
}

import { myStyle } from '@/app/_styles/vars.css';
import { HeaderPropsType } from 'types';
import { headerContainer, wrapper, headerLinkContainer } from './header.css';
import HeaderLinkList from '../_composables/headerLinks/HeaderLinkList';
import HeaderBanner from './HeaderBanner';
import Wrapper from '../_composables/wrapper/Wrapper';
import Admin from '../_admin/Admin';

export default function Header({ isAdmin }: HeaderPropsType) {
  return (
    <div className={`${headerContainer} ${myStyle}`}>
      <Wrapper className={wrapper}>
        <HeaderBanner />
        <Wrapper className={headerLinkContainer}>
          {isAdmin && <Admin />}
          <HeaderLinkList />
        </Wrapper>
      </Wrapper>
    </div>
  );
}

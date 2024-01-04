import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { myStyle } from '@/app/_styles/vars.css';
import { headerContainer, headerBanner, wrapper, bannerText } from './header.css';
import HeaderLinkContainer from '../_composables/headerLinks/HeaderLinkContainer';

export default function Header() {
  return (
    <div className={headerContainer}>
      <div className={wrapper}>
        <div className={bannerText}>
          <h1 className={`${BMHANNAAir.className} ${myStyle} ${headerBanner}`}>
            BRGNDY의 개발 블로그
          </h1>
        </div>

        <HeaderLinkContainer />
      </div>
    </div>
  );
}

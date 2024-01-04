import LINK_ROUTES from '@/app/_constants/linkRoutes';
import { headerLinkContainer } from './headerLinkContainer.css';
import HeaderLink from './HeaderLink';

export default function HeaderLinkContainer() {
  return (
    <div className={headerLinkContainer}>
      {LINK_ROUTES.map((link) => {
        return (
          <HeaderLink
            key={link.id}
            icon={link.icon}
            path={link.path}
            title={link.title}
            isOpenNewPage={link.isOpenNewPage}
          />
        );
      })}
    </div>
  );
}

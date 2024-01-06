import LINK_ROUTES from '@/app/_constants/linkRoutes';
import HeaderLinkItem from './HeaderLinkItem';

export default function HeaderLinkList() {
  return (
    <>
      {LINK_ROUTES.map((link) => {
        return (
          <HeaderLinkItem
            key={link.id}
            icon={link.icon}
            path={link.path}
            title={link.title}
            isOpenNewPage={link.isOpenNewPage}
          />
        );
      })}
    </>
  );
}

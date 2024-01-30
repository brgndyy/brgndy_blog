import { HeaderLinkItemPropsType } from 'types';
import { myStyle } from '@/app/_styles/vars.css';
import Link from 'next/link';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { headerLink, linkDivContainer, headerLinkText, linkIcon } from './headerLinkItem.css';

export default function HeaderLinkItem({
  title,
  path,
  icon,
  isOpenNewPage,
}: HeaderLinkItemPropsType) {
  return (
    <div className={linkDivContainer}>
      <Link
        href={path}
        target={isOpenNewPage ? '_blank' : ''}
        aria-label={title}
        rel="noopener noreferrer"
        className={`${headerLink} ${myStyle} ${isOpenNewPage ? '' : BMHANNAAir.className} ${
          isOpenNewPage ? linkIcon : headerLinkText
        }`}
      >
        {icon}
      </Link>
    </div>
  );
}

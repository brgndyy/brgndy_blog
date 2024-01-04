import { HeaderLinkPropsType } from 'types';
import { myStyle } from '@/app/_styles/vars.css';
import { headerLink, linkDivContainer } from './headerLink.css';
import Link from 'next/link';

export default function HeaderLink({ title, path, icon, isOpenNewPage }: HeaderLinkPropsType) {
  return (
    <div className={linkDivContainer}>
      <Link
        href={path}
        target={isOpenNewPage ? '_blank' : ''}
        aria-label={title}
        rel="noopener noreferrer"
        className={`${headerLink} ${myStyle}`}
      >
        {icon}
      </Link>
    </div>
  );
}

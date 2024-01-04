import { HeaderLinkPropsType } from 'types';
import { myStyle } from '@/app/_styles/vars.css';
import { headerLink, linkDivContainer } from './headerLink.css';

export default function HeaderLink({ title, path, icon }: HeaderLinkPropsType) {
  return (
    <div className={linkDivContainer}>
      <a
        href={path}
        target="_blank"
        aria-label={title}
        rel="noopener noreferrer"
        className={`${headerLink} ${myStyle}`}
      >
        {icon}
      </a>
    </div>
  );
}

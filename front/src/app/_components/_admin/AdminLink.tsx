import Link from 'next/link';
import { AdminLinkPropsType } from 'types';
import { adminLink } from './adminLink.css';

export default function AdminLink({ path, title }: AdminLinkPropsType) {
  return (
    <Link href={path} className={adminLink}>
      {title}
    </Link>
  );
}

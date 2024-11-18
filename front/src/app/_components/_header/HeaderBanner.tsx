import Link from 'next/link';
import { myStyle } from '@/app/_styles/vars.css';
import { headerBanner, banner } from './headerBanner.css';

export default function HeaderBanner() {
  return (
    <Link href="/" className={banner}>
      <h1 className={` ${myStyle} ${headerBanner}`}>Jeon TaeHeon</h1>
    </Link>
  );
}

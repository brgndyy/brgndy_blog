import Link from 'next/link';
import { myStyle } from '@/app/_styles/vars.css';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { headerBanner, banner } from './headerBanner.css';

export default function HeaderBanner() {
  return (
    <Link href="/" className={banner}>
      <h1 className={`${BMHANNAAir.className} ${myStyle} ${headerBanner}`}>BRGNDY의 개발 블로그</h1>
    </Link>
  );
}

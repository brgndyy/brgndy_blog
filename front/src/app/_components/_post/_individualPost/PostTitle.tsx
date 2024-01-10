import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { myStyle } from '@/app/_styles/vars.css';
import Container from '../../_composables/container/Container';
import { titleContainer, postTitle } from './postTitle.css';

export default function PostTitle({ title }: { title: string }) {
  return (
    <Container className={titleContainer}>
      <h1 className={`${BMHANNAAir.className} ${myStyle} ${postTitle}`}>{title}</h1>
    </Container>
  );
}

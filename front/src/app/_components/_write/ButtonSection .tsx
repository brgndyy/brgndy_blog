import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { myStyle } from '@/app/_styles/vars.css';
import Container from '../_composables/container/Container';
import { allButtonConatiner, button } from './buttonSelection.css';
import Button from '../_composables/button/Button';

export default function ButtonSection() {
  return (
    <Container className={allButtonConatiner}>
      <Button className={`${button} ${BMHANNAAir.className} ${myStyle}`} text="나가기" />
      <Button className={`${button} ${BMHANNAAir.className} ${myStyle}`} text="작성하기" />
    </Container>
  );
}

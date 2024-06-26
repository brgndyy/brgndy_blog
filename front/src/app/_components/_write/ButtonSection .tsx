import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { myStyle } from '@/app/_styles/vars.css';
import { ButtonSelectionPropsType } from 'types';
import Container from '../_composables/container/Container';
import { allButtonConatiner, button } from './buttonSelection.css';
import Button from '../_composables/button/Button';

export default function ButtonSection({ openSubmitFormHandler }: ButtonSelectionPropsType) {
  return (
    <Container className={allButtonConatiner}>
      <Button className={`${button} ${BMHANNAAir.className} ${myStyle}`} text="나가기" />
      <Button
        className={`${button} ${BMHANNAAir.className} ${myStyle}`}
        text="작성하기"
        onClick={openSubmitFormHandler}
      />
    </Container>
  );
}

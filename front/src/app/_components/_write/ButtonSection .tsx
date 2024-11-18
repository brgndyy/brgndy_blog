import { myStyle } from '@/app/_styles/vars.css';
import { ButtonSelectionPropsType } from 'types';
import Container from '../_composables/container/Container';
import { allButtonConatiner, button } from './buttonSelection.css';
import Button from '../_composables/button/Button';

export default function ButtonSection({ openSubmitFormHandler }: ButtonSelectionPropsType) {
  return (
    <Container className={allButtonConatiner}>
      <Button className={`${button} ${myStyle}`} text="나가기" />
      <Button className={`${button}  ${myStyle}`} text="작성하기" onClick={openSubmitFormHandler} />
    </Container>
  );
}

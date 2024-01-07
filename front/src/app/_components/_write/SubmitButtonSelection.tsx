import { myStyle } from '@/app/_styles/vars.css';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { ButtonSelectionPropsType } from 'types';
import Container from '../_composables/container/Container';
import { buttonSelectionContainer } from './submitButtonSelection.css';
import Button from '../_composables/button/Button';
import { button } from './buttonSelection.css';

export default function SubmitButtonSelection({ openSubmitFormHandler }: ButtonSelectionPropsType) {
  return (
    <Container className={buttonSelectionContainer}>
      <Button
        text="취소"
        className={`${button} ${BMHANNAAir.className} ${myStyle}`}
        onClick={openSubmitFormHandler}
      />
      <Button text="출간하기" className={`${button} ${BMHANNAAir.className} ${myStyle}`} />
    </Container>
  );
}

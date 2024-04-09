import React from 'react';
import Container from '../_composables/container/Container';
import { buttonSelectionContainer } from '../_write/submitButtonSelection.css';
import Button from '../_composables/button/Button';
import { button } from '../_write/buttonSelection.css';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { myStyle } from '@/app/_styles/vars.css';
import { WritePostFormContext } from './WritePostFormContext';
import { useContext } from 'react';

type WritePostFormSubmitButtonProps = {
  closeSubmitFormHandler: () => void;
};

export default function WritePostFormSubmitButton({
  closeSubmitFormHandler,
}: WritePostFormSubmitButtonProps) {
  const { postSubmitHandler } = useContext(WritePostFormContext);

  return (
    <Container className={buttonSelectionContainer}>
      <Button
        text="취소"
        className={`${button} ${BMHANNAAir.className} ${myStyle}`}
        onClick={closeSubmitFormHandler}
      />
      <Button
        text="출간하기"
        className={`${button} ${BMHANNAAir.className} ${myStyle}`}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => postSubmitHandler(e)}
      />
    </Container>
  );
}

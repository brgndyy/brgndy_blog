import React, { useContext } from 'react';
import { myStyle } from '@/app/_styles/vars.css';
import Button from '../_composables/button/Button';
import { button } from '../_write/buttonSelection.css';
import { buttonSelectionContainer } from '../_write/submitButtonSelection.css';
import Container from '../_composables/container/Container';
import { WritePostFormContext } from './WritePostFormContext';

type WritePostFormSubmitButtonProps = {
  closeSubmitFormHandler: () => void;
};

export default function WritePostFormSubmitButton({
  closeSubmitFormHandler,
}: WritePostFormSubmitButtonProps) {
  const { postSubmitHandler } = useContext(WritePostFormContext);

  return (
    <Container className={buttonSelectionContainer}>
      <Button text="취소" className={`${button} ${myStyle}`} onClick={closeSubmitFormHandler} />
      <Button
        text="출간하기"
        className={`${button}  ${myStyle}`}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => postSubmitHandler(e)}
      />
    </Container>
  );
}

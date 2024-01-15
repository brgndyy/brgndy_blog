'use client';

import useModal from '@/app/_hooks/useModal';
import { myStyle } from '@/app/_styles/vars.css';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import Button from '../../_composables/button/Button';
import DeletePostModal from '../../_modal/DeletePostModal';
import { editButton } from './postEdit.css';

export default function DeletePostModalTriggerButton() {
  const { isModalOpen, modalCloseHandler, modalOpenHandler, isModalClosing } = useModal(300);

  return (
    <>
      <Button
        type="button"
        text="삭제하기"
        onClick={modalOpenHandler}
        className={`${editButton} ${myStyle} ${BMHANNAAir.className}`}
      />

      {isModalOpen && (
        <DeletePostModal modalCloseHandler={modalCloseHandler} isModalClosing={isModalClosing} />
      )}
    </>
  );
}

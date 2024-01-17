'use client';

import { myStyle } from '@/app/_styles/vars.css';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { useContext } from 'react';
import Button from '../../_composables/button/Button';
import DeletePostModal from '../../_modal/DeletePostModal';
import { editButton } from './postEdit.css';
import { ModalContext } from '../../_modal/ModalContext';

export default function DeletePostModalTriggerButton() {
  const { isModalOpen, modalOpenHandler } = useContext(ModalContext);

  return (
    <>
      <Button
        type="button"
        text="삭제하기"
        onClick={modalOpenHandler}
        className={`${editButton} ${myStyle} ${BMHANNAAir.className}`}
      />

      {isModalOpen && <DeletePostModal />}
    </>
  );
}

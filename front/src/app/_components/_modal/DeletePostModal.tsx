import React from 'react';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { myStyle } from '@/app/_styles/vars.css';
import { closeButton } from './authModal.css';
import {
  closeModalAnimation,
  modalContainer,
  modalText,
  deleteButton,
} from './deletePostModal.css';
import Modal from './Modal';
import Container from '../_composables/container/Container';
import Button from '../_composables/button/Button';

export default function DeletePostModal() {
  return (
    <Modal.Portal id="modal">
      <Modal.Backdrop>
        <Modal.Container
          className={`${modalContainer} ${BMHANNAAir.className} ${
            // isModalClosing ? closeModalAnimation : ''
            ''
          }`}
        >
          <Modal.Close className={`${closeButton} ${myStyle} ${BMHANNAAir.className}`}>
            X
          </Modal.Close>
          <Container className={`${myStyle}`}>
            <p className={`${modalText} ${myStyle} ${BMHANNAAir.className}`}>
              정말 삭제하시겠습니까? 삭제하시면 복구는 불가능합니다.
            </p>
          </Container>
          <Container>
            <Button
              text="삭제하기"
              className={`${myStyle} ${BMHANNAAir.className} ${deleteButton}`}
            />
          </Container>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Portal>
  );
}

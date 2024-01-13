import { AuthModalPropsType } from 'types';
import usePreventScroll from '@/app/_hooks/usePreventScroll';
import CONFIG from '@/app/_constants/config';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { myStyle } from '@/app/_styles/vars.css';
import Modal from './Modal';
import { modalContainer, closeAnimation } from './authModal.css';

export default function AuthModal({
  isModalOpen,
  modalCloseHandler,
  modalType,
  isModalClosing,
}: AuthModalPropsType) {
  usePreventScroll();

  return (
    <Modal>
      <Modal.Backdrop>
        <Modal.Container
          className={`${modalContainer} ${BMHANNAAir.className} ${myStyle} ${
            isModalClosing ? closeAnimation : ''
          }`}
        >
          <Modal.Close onClick={modalCloseHandler}>X</Modal.Close>
          <div>하이</div>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

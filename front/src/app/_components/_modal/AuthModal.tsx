import usePreventScroll from '@/app/_hooks/usePreventScroll';
import CONFIG from '@/app/_constants/config';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { myStyle } from '@/app/_styles/vars.css';
import Modal from './Modal';
import { modalContainer, closeButton, titleContainer } from './authModal.css';
import Container from '../_composables/container/Container';
import AuthForm from './AuthForm';

type AuthModalPropsType = {
  modalType: string;
};

export default function AuthModal({ modalType }: AuthModalPropsType) {
  usePreventScroll();

  return (
    <Modal.Portal id="modal">
      <Modal.Backdrop>
        <Modal.Container className={`${modalContainer} ${BMHANNAAir.className}`}>
          <Modal.Close className={`${closeButton} ${myStyle} ${BMHANNAAir.className}`}>
            X
          </Modal.Close>
          <Container className={`${titleContainer} ${myStyle}`}>
            {modalType === CONFIG.modal_login_type ? '로그인' : '회원가입'}
          </Container>
          <AuthForm modalType={modalType} />
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Portal>
  );
}

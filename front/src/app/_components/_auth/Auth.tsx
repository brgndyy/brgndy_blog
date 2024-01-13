'use client';

import { useEffect } from 'react';
import useModal from '@/app/_hooks/useModal';
import useKeyDown from '@/app/_hooks/useKeydown';
import CONFIG from '@/app/_constants/config';
import AuthModal from '../_modal/AuthModal';

export default function Auth() {
  const [modalType] = useKeyDown();
  const { isModalOpen, modalCloseHandler, setIsModalOpen, isModalClosing } = useModal(300);

  useEffect(() => {
    if (modalType === CONFIG.modal_login_type || modalType === CONFIG.modal_sign_up_type) {
      setIsModalOpen(true);
    }
  }, [modalType, setIsModalOpen]);

  return (
    <>
      {isModalOpen && (
        <AuthModal
          isModalClosing={isModalClosing}
          modalType={modalType}
          modalCloseHandler={modalCloseHandler}
        />
      )}
    </>
  );
}

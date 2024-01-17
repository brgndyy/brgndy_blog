'use client';

import { useEffect, useContext } from 'react';
import useKeyDown from '@/app/_hooks/useKeydown';
import CONFIG from '@/app/_constants/config';
import AuthModal from '../_modal/AuthModal';
import { ModalContext } from '../_modal/ModalContext';

export default function Auth() {
  const [modalType] = useKeyDown();
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

  useEffect(() => {
    if (modalType === CONFIG.modal_login_type || modalType === CONFIG.modal_sign_up_type) {
      setIsModalOpen(true);
    }
  }, [modalType, setIsModalOpen]);

  return <>{isModalOpen && <AuthModal modalType={modalType} />}</>;
}

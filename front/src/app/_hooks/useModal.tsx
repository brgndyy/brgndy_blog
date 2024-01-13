'use client';

import { useState, useEffect } from 'react';

const useModal = (animationTime?: number) => {
  const animationTimer = animationTime || 300;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isModalClosing) {
      timer = setTimeout(() => {
        setIsModalOpen(false);
        setIsModalClosing(false);
      }, animationTimer);
    }
    return () => clearTimeout(timer);
  }, [isModalClosing, animationTimer]);

  const modalOpenHandler = () => {
    setIsModalOpen(true);
  };

  const modalCloseHandler = () => {
    setIsModalClosing(true); // 먼저 애니메이션 시작
  };

  return { isModalOpen, setIsModalOpen, modalOpenHandler, modalCloseHandler, isModalClosing };
};

export default useModal;

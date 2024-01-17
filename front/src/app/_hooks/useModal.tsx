'use client';

import { useState } from 'react';

const useModal = () => {
  // const animationTimer = animationTime || 300;
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isModalClosing, setIsModalClosing] = useState(false);

  // useEffect(() => {
  //   let timer: ReturnType<typeof setTimeout>;

  //   if (isModalClosing) {
  //     timer = setTimeout(() => {
  //       setIsModalOpen(false);
  //       setIsModalClosing(false);
  //     }, animationTimer);
  //   }
  //   return () => clearTimeout(timer);
  // }, [isModalClosing, animationTimer]);

  const modalOpenHandler = () => {
    setIsModalOpen(true);
  };

  const modalCloseHandler = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, setIsModalOpen, modalOpenHandler, modalCloseHandler };
};

export default useModal;

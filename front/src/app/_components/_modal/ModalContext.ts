'use client';

import { createContext, Dispatch, SetStateAction } from 'react';

type ModalContextType = {
  isModalOpen: boolean;
  modalOpenHandler: () => void;
  modalCloseHandler: () => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalContextType>({
  isModalOpen: false,
  modalOpenHandler: () => {},
  modalCloseHandler: () => {},
  setIsModalOpen: () => {},
});

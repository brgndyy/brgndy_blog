'use client';

import { createContext } from 'react';

export const ModalContext = createContext({
  isModalOpen: false,
  modalOpenHandler: () => {},
  modalCloseHandler: () => {},
});

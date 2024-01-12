import { PropsWithChildren } from 'react';
import useModal from '@/app/_hooks/useModal';
import { ModalContext } from './ModalContext';

export function ModalProvider(props: PropsWithChildren<object>) {
  const { children } = props;
  const { isModalOpen, modalOpenHandler, modalCloseHandler } = useModal();

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ModalContext.Provider value={{ isModalOpen, modalOpenHandler, modalCloseHandler }}>
      {children}
    </ModalContext.Provider>
  );
}

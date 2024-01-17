import { PropsWithChildren } from 'react';
import useModal from '@/app/_hooks/useModal';
import { ModalContext } from './ModalContext';

export function ModalProvider(props: PropsWithChildren<object>) {
  const { children } = props;
  const { isModalOpen, modalOpenHandler, modalCloseHandler, setIsModalOpen } = useModal();

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ModalContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ isModalOpen, modalOpenHandler, modalCloseHandler, setIsModalOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
}

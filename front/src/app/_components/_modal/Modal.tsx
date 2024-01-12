import React, { PropsWithChildren } from 'react';
import { ModalProvider } from './ModalProvider';
import Backdrop from './Backdrop';
import ModalContainer from './ModalContainer';
import ModalClose from './ModalClose';

export default function Modal(props: PropsWithChildren<object>) {
  const { children } = props;

  return <ModalProvider>{children}</ModalProvider>;
}

Modal.Backdrop = Backdrop;
Modal.Container = ModalContainer;
Modal.Close = ModalClose;

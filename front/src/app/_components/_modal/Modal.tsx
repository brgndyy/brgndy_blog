import React, { PropsWithChildren } from 'react';
import { ModalProvider } from './ModalProvider';
import Backdrop from './Backdrop';
import ModalContainer from './ModalContainer';
import ModalClose from './ModalClose';
import ModalPortal from './ModalPortal';

export default function Modal(props: PropsWithChildren<object>) {
  const { children } = props;

  return <ModalProvider>{children}</ModalProvider>;
}

Modal.Portal = ModalPortal;
Modal.Backdrop = Backdrop;
Modal.Container = ModalContainer;
Modal.Close = ModalClose;

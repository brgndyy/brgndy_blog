import React, { PropsWithChildren } from 'react';
import { ModalClosePropsType } from 'types';

export default function ModalClose(props: PropsWithChildren<ModalClosePropsType>) {
  const { children, className, onClick } = props;
  const closeClassName = className || '';

  return (
    <button type="button" className={closeClassName} onClick={onClick}>
      {children}
    </button>
  );
}

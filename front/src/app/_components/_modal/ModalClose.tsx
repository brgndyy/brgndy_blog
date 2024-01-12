import React, { PropsWithChildren } from 'react';
import { ModalClassNamePropsType } from 'types';

export default function ModalClose(props: PropsWithChildren<ModalClassNamePropsType>) {
  const { children, className } = props;
  const closeClassName = className || '';

  return <div className={closeClassName}>{children}</div>;
}

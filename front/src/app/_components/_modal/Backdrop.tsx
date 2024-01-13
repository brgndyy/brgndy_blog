import React, { PropsWithChildren } from 'react';
import { backdropContainer } from './backdrop.css';

export default function Backdrop(props: PropsWithChildren<object>) {
  const { children } = props;

  return <div className={backdropContainer}>{children}</div>;
}

import { PropsWithChildren } from 'react';
import { ModalClassNamePropsType } from 'types';

export default function ModalContainer(props: PropsWithChildren<ModalClassNamePropsType>) {
  const { children, className } = props;
  const containerClassName = className || '';
  return <div className={containerClassName}>{children}</div>;
}

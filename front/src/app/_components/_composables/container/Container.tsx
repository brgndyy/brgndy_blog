import { PropsWithChildren } from 'react';
import { WrapperPropsType } from 'types';

export default function Container(props: PropsWithChildren<WrapperPropsType>) {
  const { children, className } = props;
  const containerClassName = className || '';

  return <div className={containerClassName}>{children}</div>;
}

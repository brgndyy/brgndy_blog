import { PropsWithChildren } from 'react';
import { WrapperPropsType } from 'types';

export default function Container(props: PropsWithChildren<WrapperPropsType>) {
  const { children, className } = props;
  return <div className={className}>{children}</div>;
}

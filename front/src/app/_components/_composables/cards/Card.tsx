import { PropsWithChildren } from 'react';
import { card } from './card.css';

export default function Card(props: PropsWithChildren<object>) {
  const { children } = props;

  return <div className={card}>{children}</div>;
}

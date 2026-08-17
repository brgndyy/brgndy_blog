import { PropsWithChildren } from 'react';
import { contentCardContainer } from './contentCard.css';

export default function ContentCard(props: PropsWithChildren<object>) {
  const { children } = props;

  return <div className={contentCardContainer}>{children}</div>;
}

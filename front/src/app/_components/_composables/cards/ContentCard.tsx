import { PropsWithChildren } from 'react';

export default function ContentCard(props: PropsWithChildren<object>) {
  const { children } = props;

  return <div>{children}</div>;
}

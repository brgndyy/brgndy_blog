import { PropsWithChildren } from 'react';
import { postList } from './postList.css';

export default function PostList(props: PropsWithChildren<object>) {
  const { children } = props;

  return <ul className={postList}>{children}</ul>;
}

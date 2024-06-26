import React from 'react';
import { IndividualPostPropsType } from 'types';
import PostBody from './PostBody';
import PostTitle from './PostTitle';
import Container from '../../_composables/container/Container';
import { individualPostContainer } from './individualPost.css';
import PostInfo from './PostInfo';

export default function IndividualPost({
  isAdmin,
  title,
  slug,
  body,
  createdAt,
}: IndividualPostPropsType) {
  return (
    <Container className={individualPostContainer}>
      <PostTitle title={title} />
      <PostInfo slug={slug} isAdmin={isAdmin} createdAt={createdAt} />
      <PostBody body={body} />
    </Container>
  );
}

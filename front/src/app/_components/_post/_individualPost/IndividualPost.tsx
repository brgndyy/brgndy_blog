import React from 'react';
import { PostItemType } from 'types';
import PostBody from './PostBody';
import PostTitle from './PostTitle';
import Container from '../../_composables/container/Container';
import { individualPostContainer } from './individualPost.css';
import PostInfo from './PostInfo';

export default function IndividualPost({
  thumbnailImageSrc,
  title,
  slug,
  description,
  body,
  createdAt,
  userInfo,
}: PostItemType) {
  return (
    <Container className={individualPostContainer}>
      <PostTitle title={title} />
      <PostInfo createdAt={createdAt} />
      <PostBody body={body} />
    </Container>
  );
}

import React from 'react';
import PostBody from './PostBody';
import PostTitle from './PostTitle';
import Container from '../../_composables/container/Container';
import { individualPostContainer } from './individualPost.css';
import PostInfo from './PostInfo';
import PostComment from '../PostComment';

interface IndividualPostProps {
  title: string;
  date: string;
  content: string;
}

export default function IndividualPost({ title, content, date }: IndividualPostProps) {
  return (
    <Container className={individualPostContainer}>
      <PostTitle title={title} />
      <PostInfo date={date} />
      <PostBody body={content} />
      <PostComment/>
    </Container>
  );
}

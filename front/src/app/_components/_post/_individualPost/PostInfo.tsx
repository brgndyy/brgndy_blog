import React from 'react';
import formatDate from '@/app/_utils/formatDate';
import { myStyle } from '@/app/_styles/vars.css';
import Container from '../../_composables/container/Container';
import { infoContainer, postDate } from './postInfo.css';

interface PostInfoProps {
  date: string;
}

export default function PostInfo({ date }: PostInfoProps) {
  const formattedDate = formatDate(date);
  return (
    <Container className={infoContainer}>
      <p className={`${postDate} ${myStyle}`}>{formattedDate}</p>
    </Container>
  );
}

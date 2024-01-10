import React from 'react';
import formatDate from '@/app/_utils/formatDate';
import { PostInfoPropsType } from 'types';
import Link from 'next/link';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { myStyle } from '@/app/_styles/vars.css';
import Container from '../../_composables/container/Container';
import { infoContainer, postDate } from './postInfo.css';

export default function PostInfo({ createdAt }: PostInfoPropsType) {
  const formattedDate = formatDate(createdAt);
  return (
    <Container className={infoContainer}>
      <p className={`${postDate} ${myStyle} ${BMHANNAAir.className}`}>{formattedDate}</p>
    </Container>
  );
}

import React from 'react';
import { myStyle } from '@/app/_styles/vars.css';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import Link from 'next/link';
import { editContainer, editButton } from './postEdit.css';
import Container from '../../_composables/container/Container';
import DeletePostModalTriggerButton from './DeletePostModalTriggerButton';

export default function PostEdit({ slug }: { slug: string }) {
  return (
    <Container className={editContainer}>
      <Link
        href={`/write?slug=${slug}`}
        className={`${editButton} ${myStyle} ${BMHANNAAir.className}`}
      >
        수정하기
      </Link>
      <DeletePostModalTriggerButton />
    </Container>
  );
}

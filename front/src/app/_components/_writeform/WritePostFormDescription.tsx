import React from 'react';
import Container from '../_composables/container/Container';
import { descriptionContainer, descriptionTextArea } from '../_write/postDescription.css';
import { myStyle } from '@/app/_styles/vars.css';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { WritePostFormContext } from './WritePostFormContext';
import { useContext } from 'react';

export default function WritePostFormDescription() {
  const { postState, postDescriptionHandler } = useContext(WritePostFormContext);

  return (
    <Container className={descriptionContainer}>
      <textarea
        value={postState.description}
        placeholder="글의 짧은 간략한 설명을 입력하세요"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => postDescriptionHandler(e)}
        className={`${descriptionTextArea} ${myStyle} ${BMHANNAAir.className}`}
      />
    </Container>
  );
}

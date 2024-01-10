import React from 'react';
import { ThumnailInputPropsType } from 'types';
import { myStyle } from '@/app/_styles/vars.css';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import Container from '../_composables/container/Container';
import { thumbnailInputContainer, thumbnailInput } from './thumbnailInput.css';
import Input from '../_composables/input/Input';

export default function ThumbnailInput({ postThumbnailImageHandler }: ThumnailInputPropsType) {
  return (
    <Container className={`${thumbnailInputContainer} ${myStyle}`}>
      <Input
        onChange={postThumbnailImageHandler}
        type="file"
        className={`${thumbnailInput} ${myStyle} ${BMHANNAAir.className}`}
      />
    </Container>
  );
}

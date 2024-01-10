import React from 'react';
import { myStyle } from '@/app/_styles/vars.css';
import { BMHAANAPro } from '@/app/_styles/fonts/fonts';
import { TitleContentPropsType } from 'types';
import Container from '../_composables/container/Container';
import { titleContainer, titleInput } from './titleSection.css';
import Input from '../_composables/input/Input';

export default function TitleSection({ value, postTitleHandler }: TitleContentPropsType) {
  return (
    <Container className={titleContainer}>
      <Input
        type="text"
        placeholder="제목을 입력하세요"
        value={value}
        className={`${titleInput} ${BMHAANAPro.className} ${myStyle}`}
        onChange={postTitleHandler}
      />
    </Container>
  );
}

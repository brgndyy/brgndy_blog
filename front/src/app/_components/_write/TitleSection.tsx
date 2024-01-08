import React from 'react';
import { myStyle } from '@/app/_styles/vars.css';
import { BMHAANAPro } from '@/app/_styles/fonts/fonts';
import Container from '../_composables/container/Container';
import { titleContainer, titleInput } from './titleSection.css';
import Input from '../_composables/input/Input';

export default function TitleSection() {
  return (
    <Container className={titleContainer}>
      <Input
        type="text"
        placeholder="제목을 입력하세요"
        className={`${titleInput} ${BMHAANAPro.className} ${myStyle}`}
        onChange={() => {}}
      />
    </Container>
  );
}

import React, { useRef, useEffect } from 'react';
import { myStyle } from '@/app/_styles/vars.css';
import { BMHAANAPro } from '@/app/_styles/fonts/fonts';
import { TitleContentPropsType } from 'types';
import Container from '../_composables/container/Container';
import { titleContainer, titleTextArea } from './titleSection.css';

export default function TitleSection({ value, postTitleHandler }: TitleContentPropsType) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current as HTMLTextAreaElement;

      if (textarea.scrollHeight > textarea.clientHeight) {
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    postTitleHandler(e);
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = '4rem';
    const newHeight = Math.max(textarea.scrollHeight, textarea.clientHeight);
    textarea.style.height = `${newHeight}px`;
  };

  return (
    <Container className={titleContainer}>
      <textarea
        name="title"
        placeholder="제목을 입력하세요"
        value={value}
        className={`${titleTextArea} ${BMHAANAPro.className} ${myStyle}`}
        onChange={handleInputChange}
        style={{ height: '4rem', overflowY: 'hidden' }}
      />
    </Container>
  );
}

import React, { useRef, useEffect, useContext } from 'react';
import { WritePostFormContext } from './WritePostFormContext';
import { myStyle } from '@/app/_styles/vars.css';
import { BMHAANAPro } from '@/app/_styles/fonts/fonts';
import Container from '../_composables/container/Container';
import { titleContainer, titleTextArea } from '../_write/titleSection.css';

export default function WritePostFormTitle() {
  const { postState, postTitleHandler } = useContext(WritePostFormContext);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      if (textarea.scrollHeight > textarea.clientHeight) {
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
  }, [postState.title]);

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
        ref={textareaRef}
        name="title"
        placeholder="제목을 입력하세요"
        value={postState.title} // postState에서 title 값을 가져옵니다.
        className={`${titleTextArea} ${BMHAANAPro.className} ${myStyle}`}
        onChange={handleInputChange}
        style={{ height: '4rem', overflowY: 'hidden' }}
      />
    </Container>
  );
}

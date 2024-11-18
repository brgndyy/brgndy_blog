'use client';

import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { javascript } from '@codemirror/lang-javascript';
import { languages } from '@codemirror/language-data';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { customKeymap, myTheme } from '@/app/_utils/codemirrorOption';
import { BodyContentPropsType } from 'types';
import { useEffect } from 'react';

export default function ContentSection({
  value,
  postBodyHandler,
  onDropHandler,
  onDragOverHandler,
  onDragEnterHandler,
  onDragLeaveHandler,
}: BodyContentPropsType) {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const triggerDistance = 50;

      if (e.clientY < triggerDistance) {
        window.scrollBy({
          top: -50,
          behavior: 'auto',
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      onDragEnter={onDragEnterHandler}
      onDragOver={onDragOverHandler}
      onDragLeave={onDragLeaveHandler}
      onDrop={onDropHandler}
    >
      <CodeMirror
        theme={myTheme}
        value={value}
        id="body"
        onChange={postBodyHandler}
        height="100vh"
        basicSetup={{
          foldGutter: false,
          lineNumbers: false,
          highlightActiveLine: false,
          drawSelection: true,
          autocompletion: false,
        }}
        editable
        extensions={[
          markdown({
            base: markdownLanguage,
            codeLanguages: languages,
          }),
          customKeymap,
          EditorView.lineWrapping,
          javascript({ jsx: true, typescript: true }),
        ]}
      />
    </div>
  );
}

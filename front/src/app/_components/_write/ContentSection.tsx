'use client';

import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { javascript } from '@codemirror/lang-javascript';
import { languages } from '@codemirror/language-data';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { customKeymap, myTheme } from '@/app/_utils/codemirrorOption';
import { classname } from '@uiw/codemirror-extensions-classname';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { BodyContentPropsType } from 'types';

export default function ContentSection({ value, postBodyHandler }: BodyContentPropsType) {
  const classNameExt = classname({
    add: () => {
      return BMHANNAAir.className;
    },
  });

  return (
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
        classNameExt,
      ]}
    />
  );
}

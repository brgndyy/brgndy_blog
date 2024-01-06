'use client';

import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { javascript } from '@codemirror/lang-javascript';
import { languages } from '@codemirror/language-data';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { customKeymap, myTheme } from '@/app/_utils/codemirrorOption';

export default function ContentSection() {
  return (
    <CodeMirror
      theme={myTheme}
      value="# 안녕하세요"
      id="body"
      // onChange={bodyContentHandler}
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
  );
}

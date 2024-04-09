import React, { useContext, useEffect } from 'react';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { javascript } from '@codemirror/lang-javascript';
import { languages } from '@codemirror/language-data';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { customKeymap, myTheme } from '@/app/_utils/codemirrorOption';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { classname } from '@uiw/codemirror-extensions-classname';
import appendDataToFormData from '@/app/_utils/appendDataToFormData';
import { WritePostFormContext } from './WritePostFormContext';
import useDragAndDrop from '../../_hooks/useDragAndDrop';
import useFetch from '../../_hooks/useFetch';
import PATH_ROUTES from '../../_constants/pathRoutes';

const BACKEND_URL =
  process.env.NEXT_PUBLIC_FRONT_ENV_MODE === 'production'
    ? process.env.NEXT_PUBLIC_DEFAULT_BACKEND_URL
    : process.env.NEXT_PUBLIC_DEV_BACKEND_URL;

export default function WritePostFormContent() {
  const { postState, postBodyHandler, appendImageToContent, accessToken } =
    useContext(WritePostFormContext);
  const { onDragEnterHandler, onDragLeaveHandler, onDragOverHandler, onDropHandler, file } =
    useDragAndDrop();

  const classNameExt = classname({
    add: () => {
      return BMHANNAAir.className;
    },
  });

  const { isLoading, sendRequest } = useFetch();

  useEffect(() => {
    const uploadFileToServer = async () => {
      if (file && !isLoading) {
        const formData = new FormData();
        appendDataToFormData(formData, { image: file });

        const res = await sendRequest(
          `${BACKEND_URL}${PATH_ROUTES.upload_image}`,
          formData,
          {
            Authorization: `Bearer ${accessToken}`,
          },
          'POST',
        );

        const data = await res.json();

        const { totalImageUrl } = data;

        appendImageToContent(totalImageUrl);
      }
    };

    uploadFileToServer();
  }, [file, accessToken]);

  return (
    <div
      onDragEnter={onDragEnterHandler}
      onDragOver={onDragOverHandler}
      onDragLeave={onDragLeaveHandler}
      onDrop={onDropHandler}
    >
      <CodeMirror
        theme={myTheme}
        value={postState.body}
        id="body"
        onChange={(e: string) => postBodyHandler(e)}
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
    </div>
  );
}

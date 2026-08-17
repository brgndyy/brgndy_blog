'use client';

import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { PostBodyPropsType } from 'types';
import formatMarkdownBodyContent from '@/app/_utils/formatMarkdownString';
import { bodyText } from './postBody.css';

export default function PostBody({ body }: PostBodyPropsType) {
  const formattedMarkDownBodyContent = formatMarkdownBodyContent(body);

  return <MarkdownPreview source={formattedMarkDownBodyContent} className={` ${bodyText}`} />;
}

'use client';

import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { PostBodyPropsType } from 'types';
import formatMarkdownBodyContent from '@/app/_utils/formatMarkdownString';
import rehypeSanitize from 'rehype-sanitize';
import { bodyText } from './postBody.css';

export default function PostBody({ body }: PostBodyPropsType) {
  const formattedMarkDownBodyContent = formatMarkdownBodyContent(body);
  const rehypePlugins = [rehypeSanitize];

  return (
    <MarkdownPreview
      source={formattedMarkDownBodyContent}
      className={`${BMHANNAAir.className} ${bodyText}`}
      rehypePlugins={rehypePlugins}
    />
  );
}

'use client';

import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { BMHANNAAir } from '@/app/_styles/fonts/fonts';
import { PostBodyPropsType } from 'types';
import formatMarkdownBodyContent from '@/app/_utils/formatMarkdownString';

export default function PostBody({ body }: PostBodyPropsType) {
  const formattedMarkDownBodyContent = formatMarkdownBodyContent(body);

  return <MarkdownPreview source={formattedMarkDownBodyContent} className={BMHANNAAir.className} />;
}

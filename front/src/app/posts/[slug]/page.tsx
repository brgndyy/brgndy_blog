import React from 'react';
import getIndividualPost from '@/app/_utils/getIndividualPost';
import IndividualPost from '@/app/_components/_post/_individualPost/IndividualPost';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

async function getPost(slug: string) {
  try {
    return await getIndividualPost(decodeURIComponent(slug));
  } catch {
    return notFound();
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: `전태헌 개발 블로그의 게시글 제목: ${post.title}`,
    description: post.description || '게시글에 대한 설명',
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);

  return <IndividualPost title={post.title} content={post.content} date={post.date} />;
}

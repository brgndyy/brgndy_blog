import React from 'react';
import getIndividualPost from '@/app/_utils/getIndividualPost';
import IndividualPost from '@/app/_components/_post/_individualPost/IndividualPost';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await getIndividualPost(decodedSlug);

  return {
    title: `전태헌 개발 블로그의 게시글 제목: ${post.title}`,
    description: post.description || '게시글에 대한 설명',
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await getIndividualPost(decodedSlug);

  return <IndividualPost title={post.title} content={post.content} date={post.date} />;
}

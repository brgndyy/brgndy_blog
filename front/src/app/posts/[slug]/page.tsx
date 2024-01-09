import React from 'react';
import getIndividualPost from '@/app/_services/getIndividualPost';
import IndividualPost from '@/app/_components/_post/_individualPost/IndividualPost';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await getIndividualPost(decodedSlug);

  return (
    <IndividualPost
      id={post.post.id}
      thumbnailImageSrc={post.post.thumbnailImageSrc}
      title={post.post.title}
      slug={post.post.slug}
      description={post.post.description}
      body={post.post.body}
      createdAt={post.post.createdAt}
      updatedAt={post.post.updatedAt}
      userInfo={post.post.userInfo}
    />
  );
}

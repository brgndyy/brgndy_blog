import React from 'react';
import getIndividualPost from '@/app/_services/getIndividualPost';
import IndividualPost from '@/app/_components/_post/_individualPost/IndividualPost';
import getAccessTokenValue from '@/app/_services/getAccessTokenValue';
import getUserInfoByAccessToken from '@/app/_services/getUserInfoByAccessToken';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const accessToken = getAccessTokenValue();
  const userInfo = await getUserInfoByAccessToken(accessToken);
  const isAdmin = userInfo && userInfo.isAdmin === true;
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await getIndividualPost(decodedSlug);

  return (
    <IndividualPost
      isAdmin={isAdmin}
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

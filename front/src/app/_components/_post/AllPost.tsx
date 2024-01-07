import React from 'react';
import { PostListPropsType } from 'types';
import { allPostContainer } from './allPost.css';
import Container from '../_composables/container/Container';
import PostItem from './PostItem';
import PostList from './PostList';

export default function AllPost({ allPosts }: PostListPropsType) {
  return (
    <Container className={allPostContainer}>
      <PostList>
        {allPosts.map((post) => {
          return (
            <PostItem
              title={post.title}
              slug={post.slug}
              description={post.description}
              key={post.id}
              thumbnailImageSrc={post.thumbnailImageSrc}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
            />
          );
        })}
      </PostList>
    </Container>
  );
}

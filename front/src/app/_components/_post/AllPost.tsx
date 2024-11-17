import React from 'react';
import { PostItemData, PostListPropsType } from 'types';
import { allPostContainer } from './allPost.css';
import Container from '../_composables/container/Container';
import PostItem from './PostItem';
import PostList from './PostList';

interface AllPostProps {
  posts: PostItemData[];
}

export default function AllPost({ posts }: AllPostProps) {
  return (
    <Container className={allPostContainer}>
      <PostList>
        {posts.map((post) => {
          return (
            <PostItem
              title={post.title}
              description={post.description}
              key={post.id}
              thumbnail={post.thumbnail}
              slug={post.slug}
              date={post.date}
            />
          );
        })}
      </PostList>
    </Container>
  );
}

import React from 'react';
import { PostItemData } from 'types';
import { allPostContainer, intro, introDescription, introTitle } from './allPost.css';
import Container from '../_composables/container/Container';
import PostItem from './PostItem';
import PostList from './PostList';

interface AllPostProps {
  posts: PostItemData[];
}

export default function AllPost({ posts }: AllPostProps) {
  return (
    <Container className={allPostContainer}>
      <header className={intro}>
        <h1 className={introTitle}>개발하며 이해한 것을 기록합니다.</h1>
        <p className={introDescription}>Frontend, JavaScript, 그리고 직접 만들어 보며 배운 것들.</p>
      </header>
      <PostList>
        {posts.map((post) => {
          return (
            <PostItem
              title={post.title}
              description={post.description}
              key={post.id}
              slug={post.slug}
              date={post.date}
            />
          );
        })}
      </PostList>
    </Container>
  );
}

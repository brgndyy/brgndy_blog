import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostItemData } from 'types';
import generateSlug from './generateSlug';

const postsDirectory = path.join(process.cwd(), 'src/app/_posts');

const getAllPosts = async () => {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPost = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    const post: PostItemData = {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      slug: generateSlug(matterResult.data.title),
      description: matterResult.data.description,
      thumbnail: matterResult.data.thumbnail,
      content: matterResult.content,
    };

    return post;
  });

  const sortedPosts = allPost.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return {
    allPost: sortedPosts,
  };
};

export default getAllPosts;

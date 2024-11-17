import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostItemData } from 'types';
import generateSlug from './generateSlug';

const postsDirectory = path.join(process.cwd(), 'src/app/_posts');

/* eslint-disable no-restricted-syntax */

const getIndividualPost = async (slug: string) => {
  try {
    const fileNames = fs.readdirSync(postsDirectory);

    for (const fileName of fileNames) {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      const postSlug = generateSlug(matterResult.data.title);

      if (postSlug === slug) {
        const post: PostItemData = {
          id: fileName.replace(/\.md$/, ''),
          title: matterResult.data.title,
          date: matterResult.data.date,
          slug: postSlug,
          description: matterResult.data.description,
          thumbnail: matterResult.data.thumbnail,
          content: matterResult.content,
        };

        return post;
      }
    }

    throw new Error('게시글을 찾지 못했어요!');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getIndividualPost;

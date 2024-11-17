import AllPost from './_components/_post/AllPost';
import getAllPosts from './_utils/getAllPosts';

export default async function HomePage() {
  const allPosts = await getAllPosts();
  const { allPost } = allPosts;

  return <AllPost posts={allPost} />;
}

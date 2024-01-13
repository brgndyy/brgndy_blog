import AllPost from './_components/_post/AllPost';
import getAllPosts from './_services/getAllPosts';
import Auth from './_components/_auth/Auth';

export default async function HomePage() {
  const allPosts = await getAllPosts();
  const { allPost } = allPosts;

  return (
    <>
      <AllPost allPosts={allPost} />
      <Auth />
    </>
  );
}

import AllPost from './_components/_post/AllPost';
import getAllPosts from './_services/getAllPosts';
import AuthModalTrigger from './_components/_auth/AuthModalTrigger';

export default async function HomePage() {
  const allPosts = await getAllPosts();
  const { allPost } = allPosts;

  return (
    <>
      <AllPost allPosts={allPost} />
      <AuthModalTrigger />
      <div>test</div>
    </>
  );
}

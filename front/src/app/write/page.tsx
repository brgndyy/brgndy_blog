import { notFound } from 'next/navigation';
import getAccessTokenValue from '../_services/getAccessTokenValue';
import getUserInfoByAccessToken from '../_services/getUserInfoByAccessToken';
import getIndividualPost from '../_services/getIndividualPost';
import WriteForm from '../_components/_write/WriteForm';

export default async function WritePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const accessToken = getAccessTokenValue();
  const userInfo = await getUserInfoByAccessToken(accessToken);
  const isAdmin = userInfo && userInfo.isAdmin === true;

  if (!isAdmin) {
    notFound();
  }
  const { slug } = searchParams;
  const postSlug = Array.isArray(slug) ? slug[0] : slug;
  const post = postSlug && (await getIndividualPost(postSlug));

  return (
    <WriteForm
      id={post && post.post.id}
      thumbnailImageSrc={post && post.post.thumbnailImageSrc}
      title={post && post.post.title}
      slug={post && post.post.slug}
      description={post && post.post.description}
      body={post && post.post.body}
      createdAt={post && post.post.createdAt}
      updatedAt={post && post.post.updatedAt}
      userInfo={post && post.post.userInfo}
    />
  );
}

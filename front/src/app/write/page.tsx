import { notFound } from 'next/navigation';
import Write from '../_components/_write/Write';
import getAccessTokenValue from '../_services/getAccessTokenValue';
import getUserInfoByAccessToken from '../_services/getUserInfoByAccessToken';
import getIndividualPost from '../_services/getIndividualPost';
import WriteForm from '../_components/_write/WriteForm';
import getPostThumbnailImageFromSrc from '../_services/getPostThumbnailImageFromSrc';

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
  console.log(post.post.thumbnailImageSrc);
  // const thumbnailImageFile =
  //   post && (await getPostThumbnailImageFromSrc(post.post.thumbnailImageSrc));

  return (
    <WriteForm
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

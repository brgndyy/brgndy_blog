import Write from '../_components/_write/Write';
import getAccessTokenValue from '../_services/getAccessTokenValue';
import getUserInfoByAccessToken from '../_services/getUserInfoByAccessToken';
import getIndividualPost from '../_services/getIndividualPost';

export default async function WritePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const accessToken = getAccessTokenValue();
  const userInfo = await getUserInfoByAccessToken(accessToken);
  const isAdmin = userInfo && userInfo.isAdmin === true;

  if (!isAdmin) {
    return <div>페이지 권한이 존재하지 않아요!</div>;
  }
  const { slug } = searchParams;

  if (slug) {
    const postSlug = Array.isArray(slug) ? slug[0] : slug;
    const post = await getIndividualPost(postSlug);

    console.log(post);
  }

  return <Write />;
}

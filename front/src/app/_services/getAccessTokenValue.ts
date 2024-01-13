import { cookies, headers } from 'next/headers';

const getAccessTokenValue = () => {
  const headersList = headers();
  const cookieStore = cookies();

  const accessTokenObj = cookieStore.get('accessToken');

  const accessToken = headersList.get('X-NewAccessToken') ?? accessTokenObj?.value;

  return accessToken;
};

export default getAccessTokenValue;

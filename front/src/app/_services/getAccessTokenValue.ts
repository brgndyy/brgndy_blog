import { cookies } from 'next/headers';

const getAccessTokenValue = () => {
  // const headersList = headers();
  const cookieStore = cookies();

  const accessTokenObj = cookieStore.get('accessToken');

  const accessToken = accessTokenObj && accessTokenObj.value;

  return accessToken;
};

export default getAccessTokenValue;

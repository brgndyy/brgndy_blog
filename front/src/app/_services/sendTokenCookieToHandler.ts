const sendTokenCookieToHandler = async (accessTokenValue: string, refreshTokenValue: string) => {
  await fetch('/api/token', {
    method: 'POST',
    body: JSON.stringify({ accessTokenValue, refreshTokenValue }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
};

export default sendTokenCookieToHandler;

import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from './_components/_header/Header';
import Card from './_components/_composables/cards/Card';
import ContentCard from './_components/_composables/cards/ContentCard';
import getAccessTokenValue from './_services/getAccessTokenValue';
import getUserInfoByAccessToken from './_services/getUserInfoByAccessToken';
import GoogleAnalytics from './_components/_googleAnalytics/GoogleAnalytics';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jeon TaeHeon',
  description: '안녕하세요. 개발자 전태헌 블로그입니다.',
  openGraph: {
    url: 'https://brgndy.me',
    siteName: 'brgndy',
    images: [
      {
        url: 'https://dp71rnme1p14w.cloudfront.net/metaimage.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'ko',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const accessToken = getAccessTokenValue();
  const userInfo = await getUserInfoByAccessToken(accessToken);
  const isAdmin = userInfo && userInfo.isAdmin === true;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body className={inter.className}>
        <Card>
          <Header isAdmin={isAdmin} />
          <ContentCard>{children}</ContentCard>
        </Card>
        <div id="modal" />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}

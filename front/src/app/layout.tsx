import type { Metadata } from 'next';
import './globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import Header from './_components/_header/Header';
import Card from './_components/_composables/cards/Card';
import ContentCard from './_components/_composables/cards/ContentCard';
import getAccessTokenValue from './_services/getAccessTokenValue';
import getUserInfoByAccessToken from './_services/getUserInfoByAccessToken';
import GoogleAnalytics from './_components/_googleAnalytics/GoogleAnalytics';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jeon TaeHeon',
  description: '안녕하세요. 개발자 전태헌 블로그입니다.',
  verification: {
    other: {
      'facebook-domain-verification': 'bpzvb8u94wt8bxio69h1ml409ciaep',
    },
  },
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
    <html lang="ko">
      <body
        className={notoSansKr.className}
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <Card>
          <Header isAdmin={isAdmin} />
          <ContentCard>{children} </ContentCard>
        </Card>
        <footer
          aria-label="사업자 정보"
          style={{
            marginTop: 'auto',
            padding: '48px 24px',
            textAlign: 'center',
            color: '#767676',
            fontSize: '12px',
          }}
        >
          <p>brgndy.me는 버건디의 공식 웹사이트입니다.</p>
          <p>법적 비즈니스 이름: 버건디</p>
        </footer>
        <div id="modal" />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}

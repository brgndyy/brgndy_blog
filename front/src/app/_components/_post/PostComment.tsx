import Script from "next/script";


export default function PostComment() {
  return (
    <>
      <Script src="https://giscus.app/client.js" data-repo="brgndyy/brgndy_blog" data-repo-id="R_kgDOLAigvA" data-category="Comments" data-category-id="DIC_kwDOLAigvM4Ckey7" data-mapping="pathname" data-strict="0" data-reactions-enabled="1" data-emit-metadata="0" data-input-position="bottom" data-theme="preferred_color_scheme" data-lang="ko" crossOrigin="anonymous" async />
    </>
  );
}

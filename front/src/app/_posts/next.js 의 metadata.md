---
title: 'Next.js의 head, metadata'
date: '2025-04-05'
description: 'Next.js 내부 코드를 살펴보자'
thumbnail: ''
category: '개발'
---

Next.js App router를 사용할때는 아래와 같이 사용한다.

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '...',
  description: '...',
};

export default function Page() {}

// or

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await getIndividualPost(decodedSlug);

  return {
    title: `전태헌 개발 블로그의 게시글 제목: ${post.title}`,
    description: post.description || '게시글에 대한 설명',
  };
}
```

그렇다면 Next.js는 어떻게 이 메타데이터들을 수집하는걸까?

[소스코드 링크](https://github.com/brgndyy/next.js/blob/canary/packages/next/src/lib/metadata/metadata.tsx)

---

먼저 큰 흐름을 살펴보자면 순서는 이렇게 된다.

1. 코드 작성시 metadata 객체나 generateMetadata 함수를 작성
2. npm run build를 통해 Next.js가 빌드할 때 이 메타데이터 정의들을 수집
3. 사용자가 페이지를 요청할 때
   - Next.js 라우터가 해당 페이지와 연관된 모든 레이아웃/페이지 컴포넌트를 수집
   - 메타데이터를 만드는 `createMetadataComponents` 트리거 함수가 내부적으로 호출됨
   - HTML의 <head> 부분에 필요한 태그를 생성

로 설명해볼 수 있다.

그럼 이제 `createMetadataComponents`를 살펴보자

## - createMetadataComponents

```tsx
export function createMetadataComponents({
  tree, // 로더 트리 (레이아웃 및 페이지 컴포넌트 포함)
  parsedQuery, // URL 쿼리 파라미터
  metadataContext, // 메타데이터 해결을 위한 컨텍스트
  getDynamicParamFromSegment, // 동적 라우트 파라미터 추출기
  appUsingSizeAdjustment, // next/font 관련 설정
  errorType, // 현재 에러 타입
  workStore, // 비동기 작업 저장소
  MetadataBoundary, // 메타데이터 에러 경계
  ViewportBoundary, // 뷰포트 에러 경계
  serveStreamingMetadata, // 스트리밍 메타데이터 사용 여부
}) {
  //...

  return {
    ViewportTree,
    MetadataTree,
    getViewportReady,
    getMetadataReady,
    StreamingMetadataOutlet,
  };
}
```

엄청 길다.. 이 안에서 최종적으로 리턴하고 있는 것들의 용도만 살펴보자.

## - ViewportTree

```tsx
function ViewportTree() {
  return (
    <>
      <ViewportBoundary>
        <Viewport /> {/* 실제 뷰포트 컴포넌트*/}
      </ViewportBoundary>
      {/* next/font를 위한 메타 태그 */}
      {appUsingSizeAdjustment ? <meta name="next-size-adjust" content="" /> : null}
    </>
  );
}
```

## - MetadataTree

```tsx
function MetadataTree() {
  return (
    <MetadataBoundary>
      <Metadata /> {/* 실제 메타데이터 컴포넌트*/}
    </MetadataBoundary>
  );
}
```

Viewport와 Metadata는 각각 뷰포트와 메타데이터를 띄워주는 실질적인 컴포넌트이다.
밑의 예시처럼 결과물로 만들어져 빌드 된다.

```html
// 모바일 기기에서 페이지가 어떻게 보일지 제어
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="페이지 설명" />
<meta property="og:title" content="공유용 제목" />
<title>페이지 제목</title>
```

이처럼 뷰포트와 메타데이터 두개의 섹션이 각각 나뉘어져서 관리되고 있다.

## - getViewportReady, StreamingMetadataOutlet

```ts
  async function getViewportReady(): Promise<void> {
    await viewport()
    return undefined
  }

  function StreamingMetadataOutlet() {
    if (serveStreamingMetadata) {
      return <AsyncMetadataOutlet promise={resolveFinalMetadata()} />
    }
    return null
  }
```

> 기본적으로 메타데이터와 뷰포트를 비동기적으로 띄워줌으로써, Progressive and Partial Rendering(PPR)이 적용되도록 하였다. (페이지가 로드 될때, 메타데이터와 뷰포트가 뒤늦게 적용이 된다고 해도 후에 적용가능하도록 함)

위의 예시가 이해가 안될수 있는데,

```tsx
export async function generateMetadata({ params }) {
  // 밑의 fetchProductDetails 가 오래 걸린다면 일단 페이지부터 렌더링 하고 후에 메타데이터 적용 되도록 함
  const product = await fetchProductDetails(params.id);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      /* ... */
    },
  };
}
```

위의 코드처럼 동적으로 메타데이터를 받아야 할때, 페이지 먼저 렌더링하고 메타데이터는 준비 되는 대로 적용시켜준다고 생각하면 된다.
만약 PPR이 미적용 된다면, 위 데이터 요청이 완료 될때까지 전체 페이지 렌더링이 지연된다.

## - viewport 함수

```ts
function viewport() {
  return getResolvedViewport(tree, searchParams, getDynamicParamFromSegment, workStore, errorType);
}

const getResolvedViewport = cache(getResolvedViewportImpl)
async function getResolvedViewportImpl(
  tree: LoaderTree,
  searchParams: Promise<ParsedUrlQuery>,
  getDynamicParamFromSegment: GetDynamicParamFromSegment,
  workStore: WorkStore,
  errorType?: MetadataErrorType | 'redirect'
): Promise<React.ReactNode> {
  const errorConvention = errorType === 'redirect' ? undefined : errorType
  return renderViewport(
    tree,
    searchParams,
    getDynamicParamFromSegment,
    workStore,
    errorConvention
  )
}

async function renderViewport(...) {
  // 1. 뷰포트 객체 해결
  const resolvedViewport = await resolveViewport(...)

  // 2. React 엘리먼트 생성
  const elements: Array<React.ReactNode> = createViewportElements(resolvedViewport)

  // 3. React 프래그먼트로 반환
  return (
    <>
      {elements.map((el, index) => {
        return cloneElement(el as React.ReactElement, { key: index })
      })}
    </>
  )
}

export async function resolveViewport(
  tree: LoaderTree,
  searchParams: Promise<ParsedUrlQuery>,
  errorConvention: MetadataErrorType | undefined,
  getDynamicParamFromSegment: GetDynamicParamFromSegment,
  workStore: WorkStore
): Promise<ResolvedViewport> {
  const viewportItems = await resolveViewportItems(
    tree,
    searchParams,
    errorConvention,
    getDynamicParamFromSegment,
    workStore
  )
  return accumulateViewport(viewportItems)
}
```

`getViewportReady` 함수는 결국 `viewport`함수를 호출하과, 그 안에서는 `getResolvedViewport`와 `getResolvedViewportImpl`이 실행된다.
그리고 `getResolvedViewportImpl` 안에 선언 된 `renderViewport`는 실질적인 요소들을 렌더링해주는 역할을 한다.

사실 `resolveViewport`가 가장 핵심적인 역할인데, 루트 레이아웃 => 각 페이지 레이아웃 => 각 페이지를 거쳐서 수집 된 뷰포트 정보들을 수집하고 하나의 객체로 통합하는 역할을 한다.

(밑에 기재 된 metadata도 마찬가지)

그 후에 `resolvedViewport`를 통해 실제적인 요소들을 렌더링 해주는 것이다.

## - Viewport 컴포넌트

```tsx
async function Viewport() {
  try {
    return await viewport()  // viewport 함수 호출
  } catch (error) {
    // HTTP 접근 오류 처리
    if (!errorType && isHTTPAccessFallbackError(error)) {
      try {
        return await getNotFoundViewport(...)  // not-found 뷰포트 시도
      } catch {}
    }
    return null  // 에러 무시하고 빈 값 반환
  }
}
```

## - metadata 함수

```ts
function metadata() {
  return getResolvedMetadata(
    tree,
    searchParams,
    getDynamicParamFromSegment,
    metadataContext,
    workStore,
    errorType,
  );
}

const getResolvedMetadata = cache(getResolvedMetadataImpl)
async function getResolvedMetadataImpl(
  tree: LoaderTree,
  searchParams: Promise<ParsedUrlQuery>,
  getDynamicParamFromSegment: GetDynamicParamFromSegment,
  metadataContext: MetadataContext,
  workStore: WorkStore,
  errorType?: MetadataErrorType | 'redirect'
): Promise<React.ReactNode> {
  const errorConvention = errorType === 'redirect' ? undefined : errorType
  return renderMetadata(
    tree,
    searchParams,
    getDynamicParamFromSegment,
    metadataContext,
    workStore,
    errorConvention
  )
}

async function renderMetadata(...) {
  // 1. 메타데이터 객체 해결
  const resolvedMetadata = await resolveMetadata(...)

  // 2. React 엘리먼트 생성
  const elements: Array<React.ReactNode> = createMetadataElements(resolvedMetadata)

  // 3. React 프래그먼트로 반환
  return (
    <>
      {elements.map((el, index) => {
        return cloneElement(el as React.ReactElement, { key: index })
      })}
    </>
  )
}

export async function resolveMetadata(
  tree: LoaderTree,
  searchParams: Promise<ParsedUrlQuery>,
  errorConvention: MetadataErrorType | undefined,
  getDynamicParamFromSegment: GetDynamicParamFromSegment,
  workStore: WorkStore,
  metadataContext: MetadataContext
): Promise<ResolvedMetadata> {
  const metadataItems = await resolveMetadataItems(
    tree,
    searchParams,
    errorConvention,
    getDynamicParamFromSegment,
    workStore
  )
  return accumulateMetadata(metadataItems, metadataContext)
}


```

## -Metadata (비동기 컴포넌트)

```tsx
async function Metadata() {
  const promise = resolveFinalMetadata();
  if (serveStreamingMetadata) {
    return (
      <Suspense fallback={null}>
        <AsyncMetadata promise={promise} /> // 스트리밍 메타데이터 처리
      </Suspense>
    );
  }
  const metadataState = await promise; // 메타데이터 결과 대기
  return metadataState.metadata; // 메타데이터 반환
}

async function resolveFinalMetadata(): Promise<StreamingMetadataResolvedState> {
  let result: React.ReactNode
  let error = null
  try {
    result = await metadata()  // 메타데이터 해결 시도
    return {
      metadata: result,
      error: null,
      digest: undefined,
    }
  } catch (metadataErr) {
    error = metadataErr
    if (!errorType && isHTTPAccessFallbackError(metadataErr)) {
      try {
        result = await getNotFoundMetadata(...)  // not-found 메타데이터 시도
        return {
          metadata: result,
          error,
          digest: (error as any)?.digest,
        }
      } catch (notFoundMetadataErr) {
        // PPR 렌더링에서 오류 처리
        error = notFoundMetadataErr
        if (serveStreamingMetadata && isPostpone(notFoundMetadataErr)) {
          throw notFoundMetadataErr
        }
      }
    }
    // PPR 렌더링에서 오류 처리
    if (serveStreamingMetadata && isPostpone(metadataErr)) {
      throw metadataErr
    }
    return {
      metadata: result,
      error,
      digest: (error as any)?.digest,
    }
  }
}

function createMetadataElements(metadata: ResolvedMetadata) {
  return MetaFilter([
    BasicMeta({ metadata }),
    AlternatesMetadata({ alternates: metadata.alternates }),
    ItunesMeta({ itunes: metadata.itunes }),
    FacebookMeta({ facebook: metadata.facebook }),
    PinterestMeta({ pinterest: metadata.pinterest }),
    FormatDetectionMeta({ formatDetection: metadata.formatDetection }),
    VerificationMeta({ verification: metadata.verification }),
    AppleWebAppMeta({ appleWebApp: metadata.appleWebApp }),
    OpenGraphMetadata({ openGraph: metadata.openGraph }),
    TwitterMetadata({ twitter: metadata.twitter }),
    AppLinksMeta({ appLinks: metadata.appLinks }),
    IconsMetadata({ icons: metadata.icons }),
  ])
}
```

다시 한번 흐름도를 정리해보자

1. createMetadataComponents 호출
2. 반환된 MetadataTree와 ViewportTree 렌더링
3. Metadata 컴포넌트 → resolveFinalMetadata → metadata → getResolvedMetadata → renderMetadata → resolveMetadata → createMetadataElements → 각 메타데이터 컴포넌트 생성
4. Viewport 컴포넌트 → viewport → getResolvedViewport → renderViewport → resolveViewport → createViewportElements → 뷰포트 메타 태그 생성
5. 각 메타데이터/뷰포트 태그가 HTML의 <head> 부분에 삽입됨

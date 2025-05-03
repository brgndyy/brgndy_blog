---
title: 'Next.js dynamic 코드 살펴보기'
date: '2025-05-03'
description: 'Next.js에서 dynamic 관련한 소스코드를 살펴보자'
thumbnail: ''
category: '개발'
---

[소스코드](https://github.com/vercel/next.js/blob/canary/packages/next/src/shared/lib/dynamic.tsx)

---

기본적으로 Next.js의 dynamic은 크게 3가지의 목적이 있다.

1. 코드 분할: 초기 번들 크기를 줄여 애플리케이션 로딩 속도 개선

2. 지연 로딩: 필요한 시점에만 컴포넌트 로드

3. SSR 제어: 필요에 따라 SSR 활성화/비활성화 가능

한번 내부 코드를 살펴보자.

```tsx
// 단순 컴포넌트 모듈 타입
type ComponentModule<P = {}> = { default: React.ComponentType<P> };
```

```tsx
// 컴포넌트를 비동기적으로 로드하는 Promise
export declare type LoaderComponent<P = {}> = Promise<React.ComponentType<P> | ComponentModule<P>>;
```

```tsx
// 컴포넌트 로더 함수나 로더 컴포넌트
export declare type Loader<P = {}> = (() => LoaderComponent<P>) | LoaderComponent<P>;
```

```tsx
// 여러 로더 모듈들을 맵핑하는 객체
export type LoaderMap = { [module: string]: () => Loader<any> };
```

```tsx
//DynamicOptions과 관련한 객체를 인자로 받고 리액트 컴포넌트를 반환하는 함수
export type LoadableFn<P = {}> = (opts: LoadableOptions<P>) => React.ComponentType<P>;
```

```tsx
// dynamic 함수에 사용되는 여러 옵션들
export type DynamicOptions<P = {}> = LoadableGeneratedOptions & {
  loading?: (loadingProps: DynamicOptionsLoadingProps) => React.ReactNode;
  loader?: Loader<P> | LoaderMap;
  loadableGenerated?: LoadableGeneratedOptions;
  ssr?: boolean;
};
```

위에는 dynamic을 사용할때 필요한 타입 정의들이다.

```tsx
function convertModule<P>(mod: React.ComponentType<P> | ComponentModule<P>) {
  return { default: (mod as ComponentModule<P>)?.default || mod };
}

// dynamic 함수에서 이렇게 사용중

const loader = () =>
  loaderFn != null ? loaderFn().then(convertModule) : Promise.resolve(convertModule(() => null));
```

해당 함수는 다양한 형태로 로드된 모듈들을 지정한 `Component`형태로 표준화 하는 역할을 한다.

`ES` 모듈 형태일 수도, 직접 컴포넌트 자체를 반환할 수도 있고 `CJS`일수도 있다.

React.lazy는 내부적으로 `export default`내보내기 방식을 기대하는데, 동적 임포트는 다양한 형태로 모듈을 반환할 수 있으므로 이러한 변환 과정이 필요하다.

### - noSSR

```tsx
export function noSSR<P = {}>(
  LoadableInitializer: LoadableFn<P>,
  loadableOptions: DynamicOptions<P>,
): React.ComponentType<P> {
  // 웹팩과 모듈을 삭제한다는 것은 react-loadable이 프리로딩을 시도하지 않는다는 의미
  delete loadableOptions.webpack;
  delete loadableOptions.modules;

  // 이 검사는 서버에서 react-loadable이 초기화되는 것을 방지하기 위해 필요
  if (!isServerSide) {
    return LoadableInitializer(loadableOptions);
  }

  const Loading = loadableOptions.loading!;
  // 서버 사이드에서만 렌더링
  return () => <Loading error={null} isLoading pastDelay={false} timedOut={false} />;
}
```

위 함수는 SSR을 비활성화하여 CSR만 적용되도록 하는 함수이다.

`{ssr : false}` 옵션을 적용시킬 때 사용되는 함수이다.

초기에 웹팩과 모듈을 삭제하는데, 이는 서버사이드에서 자바스크립트의 청크 사전 로딩을 방지하기 위함이다.

이는 CSR이 될 예정이므로 서버에서의 프리로딩은 불필요한 작업이기 때문이다.

또한 CSR일때만 실제 컴포넌트의 로딩 초기화를 수행하고, 서버에서는 이 과정을 건너뛴다.

마지막으로 실제 컴포넌트 대신 로딩 컴포넌트를 띄워주어서 CLS 문제를 방지한다.

이후에 CSR를 통해 자바스크립트가 로드되면, 이 로딩 컴포넌트는 실제 컴포넌트로 대체된다.

```tsx
export default function dynamic<P = {}>(
  dynamicOptions: DynamicOptions<P> | Loader<P>,
  options?: DynamicOptions<P>,
): React.ComponentType<P> {
  let loadableFn = Loadable as LoadableFn<P>;

  let loadableOptions: LoadableOptions<P> = {
    // A loading component is not required, so we default it
    loading: ({ error, isLoading, pastDelay }) => {
      if (!pastDelay) return null;
      if (process.env.NODE_ENV !== 'production') {
        if (isLoading) {
          return null;
        }
        if (error) {
          return (
            <p>
              {error.message}
              <br />
              {error.stack}
            </p>
          );
        }
      }
      return null;
    },
  };

  // 직접 import() 지원, 예: dynamic(import('../hello-world'))
  // 이는 누군가가 첫 번째 인자로 promise를 전달하는 엣지 케이스를 위해서만 유지된다.
  // react-loadable 바벨 플러그인은 dynamic(import('../hello-world'))를 dynamic(() => import('../hello-world'))로 변환한다.
  // 렌더링 전에 import를 실행하지 않도록 하기 위함
  if (dynamicOptions instanceof Promise) {
    loadableOptions.loader = () => dynamicOptions;
    // 함수로서의 import 지원, 예: dynamic(() => import('../hello-world'))
  } else if (typeof dynamicOptions === 'function') {
    loadableOptions.loader = dynamicOptions;
    // 첫 번째 인자가 옵션인 경우 지원, 예: dynamic({loader: import('../hello-world')})
  } else if (typeof dynamicOptions === 'object') {
    loadableOptions = { ...loadableOptions, ...dynamicOptions };
  }

  // 옵션 전달 지원, 예: dynamic(import('../hello-world'), {loading: () => <p>Loading something</p>})
  loadableOptions = { ...loadableOptions, ...options };

  const loaderFn = loadableOptions.loader as () => LoaderComponent<P>;
  const loader = () =>
    loaderFn != null ? loaderFn().then(convertModule) : Promise.resolve(convertModule(() => null));

  // coming from build/babel/plugins/react-loadable-plugin.js
  if (loadableOptions.loadableGenerated) {
    loadableOptions = {
      ...loadableOptions,
      ...loadableOptions.loadableGenerated,
    };
    delete loadableOptions.loadableGenerated;
  }

  // 서버 사이드 렌더링 비활성화 지원, 예: dynamic(() => import('../hello-world'), {ssr: false}).
  if (typeof loadableOptions.ssr === 'boolean' && !loadableOptions.ssr) {
    delete loadableOptions.webpack;
    delete loadableOptions.modules;

    return noSSR(loadableFn, loadableOptions);
  }

  return loadableFn({ ...loadableOptions, loader: loader as Loader<P> });
}
```

위에가 우리가 실제로 사용하는 dynamic 함수이다.

```tsx
let loadableFn = Loadable as LoadableFn<P>
let loadableOptions: LoadableOptions<P> = {
  loading: ({ error, isLoading, pastDelay }) => { ... }
}
```

컴포넌트를 로드하는 함수와 옵션들을 초기화한다.

```tsx
return loadableFn({ ...loadableOptions, loader: loader as Loader<P> });
```

마지막으로 모든 옵션과 변환된 로더 함수를 loadableFn에 전달하여 동적 컴포넌트를 생성한다.

그리고 중간에 if문 조건식들이 굉장히 많은데, 이는 사용자가 다양한 형태로 컴포넌트를 임포트할 수 있도록 한다.

주석의 설명처럼 함수형일수도, 컴포넌트 그 자체일수도, 모듈 자체를 불러들일 수도 있기때문에 각 케이스별로 대응해놓았다.

그럼으로써 dynamic의 기능이 완성된다.

Next.js 에서 dynamic은 내부적으로 React.lazy와 Suspense를 사용하고 있다.

[loadable.tsx 소스코드](https://github.com/vercel/next.js/blob/canary/packages/next/src/shared/lib/lazy-dynamic/loadable.tsx)

그래서 단순 랩핑 함수인가? 싶을수도 있지만 더 많은 기능을 제공한다.

기본적으로 lazy와 suspense를 사용해도 SSR을 지원해주진 않지만 next.js에서는 지원해준다.

하지만 SSR이기에 fallback을 보여준다기보다 청크로 나누어서 더 효율적으로 화면을 불러들인다고 생각할 수 있다.

또한 CSR이라고 하더라도 loading 옵션을 넣어줌으로써 Suspense로 감싸지 않더라도 fallback UI를 표현할 수 있다는 장점이 있다.

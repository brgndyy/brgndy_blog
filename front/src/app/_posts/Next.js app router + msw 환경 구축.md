---
title: 'Next.js App router + msw 환경 구축'
date: '2024-08-07'
description: 'app router 환경에서 msw 구축해보기'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1723049488085-Next.js-app-router-msw-.png'
---

현재 `MSW` 는 SSR 환경에서 매끄럽게 호환이 안되는 에러가 발생하고 있다.

[이슈 링크](https://github.com/mswjs/msw/issues/1644)

문제 상황을 정리해놓아보자면

`MSW`는 기본적으로 HTTP 요청을 가로채고 응답을 모의하는 역할을 한다.

이를 위해서 `MSW`에선 Node.js 의 기본 HTTP 및 HTTPS 모듈을 패치(patch)한다.

즉, HTTP 및 HTTPS 모듈의 동작을 변경하거나 확장하여 `MSW`가 원하는 방식으로 동작하도록 만드는 것을 의미한다.

`MSW`는 한번의 패치로 모든 HTTP/HTTPS 요청을 가로채야한다.

예를 들어서, 서버가 실행 될때 HTTP 모듈을 패치하면 이후 모든 HTTP 요청은 `MSW`를 통해 처리 된다.

하지만 Next.js app router에서는 2개의 Node.js 프로세스를 사용한다.

1. 지속적인 프로세스 : 한 포트에서 꾸준히 실행 되는 프로세스. 서버가 시작 될때 열리고 지속적으로 실행 된다.

2. 간헐적인 프로세스 : 무작위 포트에서 생성 되어 작업을 수행하는 프로세스. 페이지 레이아웃이 변경 되거나 특정 작업이 필요 할때 생성 되고 작업이 끝나면 종료 된다.

또한 Next.js에서는 `HMR(Hot Module Replacement)`이라는 핫리로딩 기능을 통해 코드 변경 사항을 즉시 반영한다.

핫리로딩은 코드가 변경 될때마다 전체 어플리케이션을 재 로드 하지 않고 변경된 모듈만 즉시 갱신하여 적용 시킨다.

이때 이 간헐적인 프로세스가 발생하는데, 이때마다 `MSW`를 반복적으로 패치해주어야하는 문제가 발생한다.

이 에러를 해결하기 위해선 임시 방편으로 Express를 활용하여 가상의 목 서버를 구축해주어야한다.

> 최근에 [또 다른 방식](https://github.com/mswjs/examples/pull/101)이 나왔는데, 이 방법은 아예 서버사이드 환경일때 분기처리를 해주어서 해결하는 듯하다.

## - Next.js 및 vitest 환경 구축

```
npx create-next-app@latest --example with-vitest with-vitest-app
```

```
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react
```

## - vitest.config.ts

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
});
```

## - MSW 설정

```
npm install msw --save-dev
```

```
npx msw init public/ --save
```

```
npm i -D @mswjs/http-middleware express cors @types/express @types/cors
```

## - worker.ts

```ts
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// This configures a Service Worker with the given request handlers.
const worker = setupWorker(...handlers);

export default worker;
```

## - http.ts

```ts
import { createMiddleware } from '@mswjs/http-middleware';
import express from 'express';
import cors from 'cors';
import { handlers } from './handlers';

const app = express();
const port = 9090; // 서버 포트

app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
  }),
);
app.use(express.json());
app.use(createMiddleware(...handlers));
app.listen(port, () => console.log(`Mock server is running on port: ${port}`));
```

여기서 `createMiddleWare` 인자 안에 handlers가 들어가는데, 요청에 대한 응답값을을 handlers에서 정의한 경로와 데이터로 반환해준다고 생각하면 된다.

## - handlers.ts

```ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/test', () => {
    return HttpResponse.json({
      name: 'brgndy',
    });
  }),
];
```

## - package.json

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "mock": "npx tsx watch ./src/_mocks/http.ts"
  },
```

위 설정을 해주면, 서버 코드가 수정 될때마다 서버가 자동으로 재시작 되기 때문에 유용하게 사용할 수 있다.

```
npm run mock
```

![](https://dp71rnme1p14w.cloudfront.net/compressed_1719563107880--2024-06-28-5.25.04.png)

정상적으로 실행 됐다.

## - MSWComponent.tsx

```tsx
'use client';
import { useEffect } from 'react';

export const MSWComponent = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
        require('@/_mocks/worker');
      }
    }
  }, []);

  return null;
};
```

그리고 이 `MSWComponent`를 루트 레이아웃에 집어넣어준다.

이 컴포넌트는 클라이언트측에서 환경변수를 확인하여 MSW를 실행시키는 역할을 한다.

여기서 `.env.local`에서 환경 변수를 하나 만들어주고 API를 목킹 해주면 된다.

![](https://dp71rnme1p14w.cloudfront.net/compressed_1719563236243--2024-06-28-5.27.11.png)

현재 이상태에서 `describe is not defined`에러가 발생하는데, `@types/jest`를 설치해주니 해결 됐다.

한번 실제로 테스트를 해보자.

```tsx
const getTestData = async () => {
  const res = await fetch('http://localhost:9090/test');
  const data = await res.json();

  return data;
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { name } = await getTestData();

  return (
    <html lang="en">
      <body>
        <MSWComponent />
        <Test name={name} />
        {children}
      </body>
    </html>
  );
}
```

<img width="55" alt="스크린샷 2024-08-08 오전 1 16 11" src="https://github.com/user-attachments/assets/6f230d6f-1e7b-46eb-a85e-67a63368c642">

글씨가 작아서 안보일수도 있지만, handlers에서 정의한 응답값이 정상적으로 렌더링 된다.

---

일단 SSR 환경에서도 msw 를 사용가능하도록 해보았지만 따로 서버를 구축하는게 더 나을거 같다고 판단했다.

아직 msw 와 SSR이 완벽하게 호환이 되지 않는 상황이어서 이런 방법을 사용한것이겠지만, 이 해결책도 결국 express로 서버를 구축하는것과 다름이 없는것이기 때문에 이 방식의 장점이 와닿지는 않는다.

이 정도의 가상 서버를 구축할수 있는 사람이라면, 독립적인 express 환경을 구축할수 있을거 같다고 생각한다.

하지만 나중에 인증/인가 관련 되어서 ssl 인증서 처리를 해주어야한다면, 내부에서 msw로 서버를 구축하는것이 더 효과적일거 같다고 예상한다.

---
title: 'Next.js 14 App router + Sentry 적용'
date: '2024-08-25'
description: 'Sentry에 대해서 알아보고 적용해보자'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1724605407878-Next.js-14-App-router-Sentry-.png'
---

배포후에 에러를 디버깅하는 것은 쉽지 않은 일이다.

1. 사용자의 에러 제보를 받는다.
2. 배포 환경으로 들어간다.
3. 직접 로그를 살펴보며 에러를 디버깅한다.
4. 에러를 고치고 다시 배포한다.

보통 이러한 흐름을 거쳐야하는데, 저 에러가 어디 페이지, 어디 코드에서 발생한 것인지 프로덕션 단에서는 쉽게 알수 없다.

`Sentry`를 활용한다면 손 쉽게 이러한 문제를 해결하고 에러 로깅 시스템을 구축할 수 있다.

<img width="844" alt="스크린샷 2024-08-14 오전 12 42 59" src="https://github.com/user-attachments/assets/61e72847-7382-44de-b777-3a9331a8a50d">

센트리 홈페이지에 가서 원하는 템플릿 (Next.js)와 팀을 만들어준다.

```
npx @sentry/wizard@latest -i nextjs
```

<img width="482" alt="스크린샷 2024-08-17 오후 7 35 58" src="https://github.com/user-attachments/assets/086608c8-99fc-496c-9f3f-9cae49efeeed">

이러한 셋팅이 끝나면 알아서 여러개의 파일들이 생기는데, 한번 살펴보자.

## - next.config.js

```js
module.exports = withSentryConfig(module.exports, {
  org: 'beingjazzer',
  project: 'javascript-nextjs',
  silent: false,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
```

### - org

`organization`의 약자이다.

Sentry 홈페이지 내에서 설정해준 조직 이름으로 설정하면 된다.

### - project

Sentry에서 사용하는 프로젝트 이름을 설정한다.

이 프로젝트는 Sentry 내에서 버그 추적 및 성능 데이터를 수집하는 단위이다.

여기서는 `Next.js`를 사용한다.

### - silent

Sentry의 관련 로그 출력을 제어한다.

여기서 말하는 로그는 에러로그가 아니다.

소스맵 업로드 시작, 소스맵 업로드 완료 등 소스맵 업로드 관련 정보성 로그이다.

`true`로 해놓으면 이러한 로그들은 출력 되지 않는다.

기본적으로 초기에 Sentry를 설정할때 `false`로 해두지만, 설정이 안정화 되고나면 설정 값을 `true`로 둠으로써 에러 로그에만 집중할수 있도록 한다.

### - widenClientFileUpload

이 옵션은 클라이언트 측에서 더 많은 소스맵을 업로드하여 디버깅에 더 많은 정보를 제공 받을 수 있다.

하지만 이로 인해서 빌드 시간이 증가할수 있다는 단점도 존재한다.

### - hideSourceMaps

클라이언트 번들에서 소스맵을 숨기는 옵션이다.

소스맵이 공개되지 않도록 하여 소스 코드 보호를 강화할 수 있다.

### - disableLogger

Sentry 로거 문구를 트리 쉐이킹하여 번들에서 제외시킨다.

여기서 말하는 로거 문구는 `Capturing an exception`이나 `Sending event to Sentry` 같이 디버깅용 문구를 의미하는데, 이러한 문구는 배포 환경에선 필요하지 않으므로 `true`로 둔다.

### - automaticVercelMonitors

`cron`은 보통 정기적인 시간에 특정 이벤트를 발생시키는 패키지를 의미한다.

Vercel 에서는 [이러한 기능을 제공](https://vercel.com/docs/cron-jobs/manage-cron-jobs)하는데, 이를 Sentry와 연동해줄수 있다.

하지만 라우트 핸들러에서는 동작하지 않는다.

## sentry.server.config.ts

```ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1,
  debug: false,
});
```

이 파일은 Next.js 서버에서 Sentry를 초기화하는 설정 파일이다.

서버에서 발생하는 모든 요청과 에러는 이 설정을 통해 Sentry로 전송 된다.

이 설정 파일에 추가된 설정은 서버가 요청을 처리할 때마다 적용된다.

### - dsn (data source name)

이 값은 Sentry에서 프로젝트를 식별하기 위해 사용하는 고유값이다.

이 값을 통해 Sentry가 어디로 데이터를 전송할지 결정할 수 있다.

### - traceSampleRate

이는 트랜잭션 추적 기능의 샘플링 비율을 설정한다.

여기서 트랜잭션이라는 말이 등장하는데,이는 사용자 요청이나 일련의 작업들을 의미한다.

예를 들어 사용자가 페이지를 로드하거나 API 요청을 보낼때, 이 과정에서 발생하는 여러 작업을 하나의 트랜잭션으로 묶어서 모니터링 할 수 있다.

이 값은 0에서 1로 이루어져있으며, 값이 높아질수록 추적할 트랙잭션의 비율도 높아진다.

배포 환경에서는 성능 영향을 줄이기 위해 값을 낮추거나, `tracesSampler`라는 옵션을 추가하여 더 정교하게 제어할 수 있다.

### - debug

이는 Sentry 설정중에 도움 되는 디버깅 정보를 콘솔에 출력할지 여부를 결정하는 값이다.

`false`로 설정하면 디버깅 정보가 출력되지 않고 설정 중에 문제가 발생한다면 `true`로 설정하여 문제를 해결할 수 있다.

## sentry.client.config.ts

```ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
```

`server.config.ts`에서 추가 된 부분을 살펴보자

### - replaysOnErrorSampleRate

이 설정은 Sentry에서 Replay 기능과 관련된다.

이 값은 오류가 발생할때 영상을 기록하는 비율을 나타내는데, 1로 설정하면 오류가 발생한 모든 세션이 기록 된다.

실제로 Sentry에서는 에러가 발생할 당시의 영상을 확인해 볼수 있다.

### - replaysSessionSampleRate

이 부분은 `replaysOnErrorSampleRate`와 반대로 오류가 발생하지 않았을때 세션을 기록할 비율을 나타낸다.

0.1로 설정하면 10%의 세션이 무작위로 기록 된다.
(해피 케이스일때 사용자의 행동도 관찰해볼 수 있다.)

### - replayIntegration

이는 Sentry의 리플레이 기능을 활성화 한다.

사용자 세션을 기록하고 문제가 발생했을때 해당 세션을 영상으로 돌려볼 수있다.

여기서 `maskAllText`는 화면에 표시되는 모든 텍스트를 마스킹하여 개인정보를 보호하는 역할을 한다.

`blockAllMedia`도 마찬가지로 사용자의 개인정보 보호를 위해 모든 미디어 (사진, 비디오)를 블록킹한다.

이 설정을 통해 해당 세션에서 미디어 파일이 나타나지 않도록 한다.

## - instrumentation.ts

```ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');
  }
}
```

`sentry.edge.config.ts`와 `process.env.NEXT_RUNTIME === "edge"`인 경우의 코드도 있지만 `edge` 환경을 사용하지 않으므로 삭제했다.

> 여기서 Edge란 전 세계적으로 분산된 서버 네트워크를 의미한다. 사용자와 가장 가까운 위치에서 요청을 처리함으로써 성능을 향상시킬 수 있다. 예를 들어 사용자가 한국에 있고 어플리케이션이 미국에 있다면, Edge 네트워크를 사용함으로써 한국 Edge 서버에서 요청을 처리하게 된다.

이제 `global-error.tsx`에서 Sentry 관련 코드를 작성해주면 된다.

```tsx
'use client';

import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <h2>Error</h2>
        <button type="button" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
}
```

이제 에러가 발생할때 저 `Sentry.captureException(error)`가 Sentry 페이지 내에 로깅 해주는 역할을 한다.

![](https://dp71rnme1p14w.cloudfront.net/compressed_1724604760033--2024-08-26-1.52.34.png)

Sentry 페이지로 이동해보면 여러 종류의 에러들이 로깅 되어있는걸 볼 수있다.

또한 사이트내에서 재빠르게 대응해야하는 에러 or 단순히 로깅용 에러 같이 에러에 대한 레벨을 나눔으로써 계층화를 시킬수도 있다.

아직은 사용자가 없고 배포를 해놓고 개발을 하는 상황이라 에러에 대한 계층화는 해놓지 않았다.

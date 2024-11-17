---
title: '에러바운더리 분석 및 status 별 에러 핸들링'
date: '2024-09-07'
description: '에러바운더리를 분석하고 status 별 분기 처리를 해보자'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1725689435019--status-.png'
---

리액트를 사용하면서 에러를 감지할때 대부분 에러바운더리를 사용한다.

나 또한 관성적으로 `react-error-boundary` 패키지를 설치하여 사용했었다.

하지만 내부 코드를 봤을때 클래스형 컴포넌트로 구현이 되어있었다.

구현 원리를 분석해볼겸 직접 코드를 살펴보기로했다.

## - ErrorBoundary.tsx

```tsx
import { Component, createElement, isValidElement } from 'react';
import type { ErrorInfo } from 'react';
import { ErrorBoundaryContext } from '@/contexts/ErrorBoundaryContext';
import type { ErrorBoundaryProps, FallbackProps } from '@/types/errorBoundary';

const isDevelopment = process.env.NODE_ENV === 'development';

type ErrorBoundaryState =
  | {
      didCatch: true;
      error: any;
    }
  | {
      didCatch: false;
      error: null;
    };

const initialState: ErrorBoundaryState = {
  didCatch: false,
  error: null,
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return { didCatch: true, error };
  }

  resetErrorBoundary(...args: any[]) {
    const { error } = this.state;

    if (error !== null) {
      this.props.onReset?.({
        args,
        reason: 'imperative-api',
      });

      this.setState(initialState);
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps, prevState: ErrorBoundaryState) {
    const { didCatch } = this.state;
    const { resetKeys } = this.props;

    // 만약 오류를 발생시킨 항목이 resetKeys 배열에 *도* 포함되어 있는 경우,
    // 오류 경계를 즉시 재설정한다.
    // 이것은 두 번째 오류를 발생시킬 가능성이 높다.
    // 따라서 오류가 설정된 후 처음으로 componentDidUpdate가 호출될 때는 resetKeys를 확인하지 않는다.

    if (didCatch && prevState.error !== null && hasArrayChanged(prevProps.resetKeys, resetKeys)) {
      this.props.onReset?.({
        next: resetKeys,
        prev: prevProps.resetKeys,
        reason: 'keys',
      });

      this.setState(initialState);
    }
  }

  render() {
    const { children, fallbackRender, FallbackComponent, fallback } = this.props;
    const { didCatch, error } = this.state;

    let childToRender = children;

    if (didCatch) {
      const props: FallbackProps = {
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      };

      if (typeof fallbackRender === 'function') {
        childToRender = fallbackRender(props);
      } else if (FallbackComponent) {
        childToRender = createElement(FallbackComponent, props);
      } else if (fallback === null || isValidElement(fallback)) {
        childToRender = fallback;
      } else {
        if (isDevelopment) {
          console.error(
            'react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop',
          );
        }

        throw error;
      }
    }

    return createElement(
      ErrorBoundaryContext.Provider,
      {
        value: {
          didCatch,
          error,
          resetErrorBoundary: this.resetErrorBoundary,
        },
      },
      childToRender,
    );
  }
}

function hasArrayChanged(a: any[] = [], b: any[] = []) {
  return a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]));
}
```

차근차근 살펴보자.

### - 초기 상태

```ts
const initialState: ErrorBoundaryState = {
  didCatch: false,
  error: null,
};
```

먼저 이부분은 에러 바운더리의 초기 상태이다.

`didCatch`는 오류가 발생했는지를 판단하는 값, `error`는 실제로 발생한 오류 객체를 나타낸다.

초기 상태는 false와 null 이다.

### - 생성자

```tsx
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
    this.state = initialState;
  }
```

생성자에서 props 값을 상속 받고 인스턴스 메서드 `resetErrorBoundary`를 컴포넌트에 바인딩함으로써 호출시마다 this가 컴포넌트를 가리키도록 한다.

또한 위의 `initialState`를 해당 컴포넌트의 state로 넣어준다.

```ts
static getDerivedStateFromError(error: Error) {
  return { didCatch: true, error };
}
```

위 메서드는 에러가 발생했을때 에러 상태값을 업데이트 해주는 역할을 한다.

### - resetErrorBoundary

```ts
resetErrorBoundary(...args: any[]) {
  const { error } = this.state;
  if (error !== null) {
    this.props.onReset?.({
      args,
      reason: 'imperative-api',
    });
    this.setState(initialState);
  }
}
```

위 `resetErrorBoundary` 메서드는 에러가 발생했을때, props로 받는 `onReset`을 호출한다.

실제로 `ErrorBoundaryProps` 타입 중에 모든 `ErrorBoundary` 컴포넌트가 공통적으로 가지는 props를 정의한 `ErrorBoundarySharedProps`라는 타입이 존재한다.

```ts
type ErrorBoundarySharedProps = PropsWithChildren<{
  onError?: (error: Error, info: ErrorInfo) => void;
  onReset?: (
    details:
      | { reason: 'imperative-api'; args: any[] }
      | { reason: 'keys'; prev: any[] | undefined; next: any[] | undefined },
  ) => void;
  resetKeys?: any[];
}>;
```

저기서 `reason`은 `onReset`이 실행된 이유에 대한 추가적인 컨텍스트를 제공하는 역할을 한다.

### - componentDidCatch

```ts
componentDidCatch(error: Error, info: ErrorInfo) {
  this.props.onError?.(error, info);
}
```

오류가 발생했을때 호출 되고, `onError` 콜백을 호출한다.

### - componentDidUpdate

```ts
componentDidUpdate(prevProps: ErrorBoundaryProps, prevState: ErrorBoundaryState) {
  const { didCatch } = this.state;
  const { resetKeys } = this.props;
  if (didCatch && prevState.error !== null && hasArrayChanged(prevProps.resetKeys, resetKeys)) {
    this.props.onReset?.({
      next: resetKeys,
      prev: prevProps.resetKeys,
      reason: 'keys',
    });
    this.setState(initialState);
  }
}
```

`componentDidUpdate`는 `ErrorBoundary` 컴포넌트가 업데이트 될때 실행 된다.

if문 안에 있는 `didCatch`(에러가 발생했는지), `prevState.error`(이전에 에러가 발생했었는지), `hasArrayChanged`(이전 props와 현재 props 사이에서 변경점이 있는지) 이렇게 총 3가지의 조건식을 통해서 `onReset` 메서드를 호출하고 상태를 초기화 한다.

여기서 `hasArrayChanged`의 역할은 처음 오류가 발생했을때 즉시 오류 경계를 재설정하는 상황을 방지하기 위함이다.

만약 저 조건식이 없는 상태에서 처음에 오류가 발생하게 된다면 `resetKeys` 배열은 변경 되고, 그 변경된 `resetKeys` 배열이 다시 오류를 트리거 해서 순환 참조 에러가 발생한다.

그래서 `hasArrayChanged`는 처음으로 `componentDidUpdate`가 호출 될때 `resetKeys` 배열을 검사하지 않도록 하는 역할을 한다.

```ts
render() {
  const { children, fallbackRender, FallbackComponent, fallback } = this.props;
  const { didCatch, error } = this.state;

  let childToRender = children;

  if (didCatch) {
    const props: FallbackProps = {
      error,
      resetErrorBoundary: this.resetErrorBoundary,
    };

    if (typeof fallbackRender === 'function') {
      childToRender = fallbackRender(props);
    } else if (FallbackComponent) {
      childToRender = createElement(FallbackComponent, props);
    } else if (fallback === null || isValidElement(fallback)) {
      childToRender = fallback;
    } else {
      if (isDevelopment) {
        console.error(
          'react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop',
        );
      }
      throw error;
    }
  }

  return createElement(
    ErrorBoundaryContext.Provider,
    {
      value: {
        didCatch,
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      },
    },
    childToRender,
  );
}
```

위의 로직은 오류가 발생했을때 적절한 fallback UI를 렌더링 하는 역할을 한다.

`fallbackRender`, `FallbackComponent`, `fallback` 중 하나를 선택하여 fallback UI를 결정한다.

### - hasArrayChanged

두 배열이 변화하였는지 판단하는 함수이다. 위에 오류 경계를 즉시 재설정하는 문제를 해결하기 위해서 선언되어있다.

---

현재 `ErrorBoundary` 컴포넌트는 클래스형 컴포넌트로 이루어져있다.

이를 함수형 컴포넌트로 변환해볼수는 없을까?

> 현재 상황에서 변환은 불가능하다.

이유는 `componentDidCatch`라는 클래스형 컴포넌트의 생명주기 메서드때문이다.

함수형 컴포넌트에서는 클래스형 컴포넌트의 생명주기 메서드의 한계를 극복하기 위해서 `hook`을 사용하는데, 이러한 `hook`은 렌더링 될때 호출 되는 것이지 렌더링 과정 그 자체에서 발생하는 에러를 감지할수는 없다.

즉 **비동기 함수가 호출되는 시점이 리액트 생명주기 메서드 외부에서 발생하기 때문에 비동기 호출에서 발생하는 에러를 감지하지 못한다.**

그에 반해 위의 ErrorBoundary의 메서드에서는 렌더링 도중 생명주기 메서드 및 그 아래에 있는 전체 트리에서 에러를 잡아낼 수 있다. [공식문서](https://ko.legacy.reactjs.org/docs/error-boundaries.html)

[react-use-error-boundary](https://www.npmjs.com/package/react-use-error-boundary) 같이 훅을 통해 에러바운더리가 구현된 라이브러리도 존재한다.

하지만 이는 고차 컴포넌트 방식으로 기존 컴포넌트를 감싸주어야하는 단점이 존재한다.

예를 들면 이런식이다.

```tsx
import { withErrorBoundary, useErrorBoundary } from "react-use-error-boundary";

const App = withErrorBoundary(({ children }) => {
  const [error, resetError] = useErrorBoundary(
    // You can optionally log the error to an error reporting service
    (error, errorInfo) => logErrorToMyService(error, errorInfo)
  );

  if (error) {
    return (
      // 내용
    );
  }

  return <div>{children}</div>;
});
```

이러한 방식보다는 내부는 클래스형 컴포넌트로 선언이 되어있더라도, 조금 더 선언적인 현재의 에러바운더리 형식을 채택하는게 낫겠다는 판단을 했다.

---

하지만 기존의 에러 바운더리 컴포넌트에서도 더 추가해보고 싶은 부분이 존재했다.

위에서 말했듯이 기존의 에러바운더리는 렌더링 과정 그 자체에서 발생하는 에러를 캐치한다.

그렇기에 우리가 흔히 알고 있는 에러바운더리는 밑에 기재 된 상황에서 발생한 에러들을 잡아주지는 못한다.

1. 비동기 통신에서 발생하는 에러

2. 이벤트 핸들러에서 발생하는 에러

3. SSR 환경

4. 자식 경계에서 발생한 에러

위에서 발생하는 에러중에 1번, api 콜을 할때 발생하는 에러 또한 에러바운더리에서 처리해준다면 에러 status 별로 깔끔하게 처리해줄수 있지 않을까? 라는 생각이 들었다.

그럼 어떻게 관리해줄수 있을까?

먼저 `status`를 담을 커스텀 에러 클래스를 만들어주어야한다.

## - HTTPError

```tsx
export interface HTTPErrorInfo {
  message?: string;
  payload: {
    HEADING: string;
    BODY: string;
    BUTTON: string;
  };
}

class HTTPError extends Error {
  statusCode: number;
  information: HTTPErrorInfo;

  constructor(statusCode: number, errorInfo: HTTPErrorInfo) {
    super(errorInfo.message ?? errorInfo.payload?.HEADING);

    this.name = 'HTTPError';
    this.statusCode = statusCode;
    this.information = errorInfo;
  }
}

export default HTTPError;
```

그 후에 에러 status를 주입해서 throw 를 해주면 된다.

예를 들면 이런식이다.

```tsx
// api 콜

const response = await fetch(url, {
  method: 'GET',
  'Content-type': 'application/json',
  body: JSON.stringify(body),
});

if (!response.ok) {
  handleAPIError(response.status);
}

// handleAPIError.ts

const handleAPIError = (responseStatus: number, message?: string) => {
  if (responseStatus >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
    throw new HTTPError(responseStatus, {
      message: message ?? HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR].HEADING,
      payload: HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR],
    });
  }

  if (responseStatus === HTTP_STATUS_CODE.NOT_FOUND) {
    throw new HTTPError(responseStatus, {
      message: message ?? HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.NOT_FOUND].HEADING,
      payload: HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.NOT_FOUND],
    });
  }

  if (responseStatus >= HTTP_STATUS_CODE.BAD_REQUEST) {
    throw new HTTPError(responseStatus, {
      message: message ?? HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.BAD_REQUEST].HEADING,
      payload: HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.BAD_REQUEST],
    });
  }
};

export default handleAPIError;
```

## - HTTP_ERROR_MESSAGE

```ts
export const HTTP_ERROR_MESSAGE: Record<number, { HEADING: string; BODY: string; BUTTON: string }> =
  {
    404: {
      HEADING: '404',
      BODY: '요청하신 페이지를 찾을 수 없습니다.',
      BUTTON: '홈으로 돌아가기',
    },
    500: {
      HEADING: '서버 오류가 발생했습니다',
      BODY: '잠시 후 다시 요청해주세요.',
      BUTTON: '새로고침',
    },
    400: {
      HEADING: '잘못된 요청입니다.',
      BODY: '확인 후 다시 시도해주세요.',
      BUTTON: '홈으로 돌아가기',
    },
  };
```

그후에 기존 에러바운더리 컴포넌트에서 `unhandledrejection` 이벤트를 바인딩 해주어야한다.

```tsx
  componentDidMount() {
    window.addEventListener("unhandledrejection", this.captureReject);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.captureReject);
  }

  captureReject = (e: PromiseRejectionEvent) => {
    e.preventDefault();
    const error = e.reason;
    console.error("Unhandled Rejection:", error);

    const statusCode = error instanceof HTTPError ? error.statusCode : 500;

    this.setState({ didCatch: true, error, statusCode });
  };
```

## - unhandledrejection 이란?

`unhandledrejection`은 프로미스가 reject 되었지만, catch 구문 등으로 에러 처리가 이루어지지 않았을때 발생하는 이벤트이다.

프로미스는 성공하면 `resolve` 상태로 바뀌고, 에러가 발생하거나 실패하면 `reject` 상태로 전환 된다.

일반적으로 이 `reject`일때 catch 블록에서 에러를 throw해서 처리한다.

하지만 현재 `catch`에서 처리를 해주는 것이 아니기 때문에, 임의로 `handleAPIError`에서 에러를 throw해서 에러바운더리로 해당 에러를 넘긴다.

해당 경계에서는 `unhandledrejection`이벤트를 통해 비동기 통신에서 발생한 에러 또한 잡을 수 있다.

그래서 이 에러를 감지해서 해당 `status`를 fallback으로 넘겨준다.

다만, 이 `unhandledrejection`이벤트는 전역 이벤트로, 처리되지 않은 모든 프로미스 reject를 감지한다.

그렇기 때문에 코드가 복잡해지고 여러 비동기 작업이 동시에 이루어진다면 디버깅이 힘들수도 있다.

그렇기때문에 `console.error` 을 통해 해당 에러 스택이 출력 되도록 했다.

![](https://dp71rnme1p14w.cloudfront.net/compressed_1725688687401--2024-09-07-2.58.05.png)

에러 스택이 출력 되는 것을 확인할 수 있다.

## - ErrorFallback

```tsx
export interface ErrorFallbackProps {
  statusCode?: number;
  resetError?: () => void;
}

const ErrorFallback = ({ statusCode = 404, resetError }: ErrorFallbackProps) => {
  const currentStatusCode = statusCode;

  return (
    <div>
      <div>
        {isHTTPErrorStatus(currentStatusCode)
          ? HTTP_ERROR_MESSAGE[currentStatusCode].HEADING
          : 'Unknown Error'}
      </div>
      <div>
        {isHTTPErrorStatus(currentStatusCode)
          ? HTTP_ERROR_MESSAGE[currentStatusCode].BODY
          : '알 수 없는 오류가 발생했습니다.'}
      </div>
      <button onClick={resetError}>
        {isHTTPErrorStatus(currentStatusCode)
          ? HTTP_ERROR_MESSAGE[currentStatusCode].BUTTON
          : '홈으로 돌아가기'}
      </button>
    </div>
  );
};

export default ErrorFallback;
```

이런식으로 `statusCode`를 받아서 에러 코드에 대한 UI 분기 처리를 해줄수 있다.

```ts
export const handlers = [
  http.get('http://example.com/test', () => {
    console.log('테스트');
    return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }),
];
```

실제로 msw를 통해 500 에러를 던지면

![](https://dp71rnme1p14w.cloudfront.net/compressed_1725688770181--2024-09-07-2.59.28.png)

500에러에 맞는 UI가 나타나고 404 에러를 던지면

![](https://dp71rnme1p14w.cloudfront.net/compressed_1725688798764--2024-09-07-2.59.55.png)

404 에러에 맞는 UI가 나오는 것을 확인할 수 있다.

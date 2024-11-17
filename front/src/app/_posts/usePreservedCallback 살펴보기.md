---
title: 'toss slash 패키지 살펴보기 usePreservedCallback'
date: '2024-09-23'
description: 'usePreservedCallback을 알아보자'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1710467651082-Object.assign-JS-.png'
---

[원 소스 코드 링크](https://github.dev/toss/slash/tree/main/packages)

[직접 작성한 코드 링크](https://github.com/brgndyy/brgndy-libraries/blob/main/packages/react/react/src/hooks/usePreservedCallback.ts)

해당 훅은 콜백 함수의 참조 무결성을 유지하면서도 함수 내부에서 사용하는 상태 값이 업데이트 될때 그 값을 반영 할 수 있도록 하는 훅이다.

컴포넌트에서 콜백 함수를 사용할때, 의존성 배열이 빈상태로 있으면 해당 함수가 최신 상태를 참조하지 않는다.

예시를 살펴보자.

```tsx
const MyComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log(count);
  }, []);

  return (
    <div>
      <p>{count}</p>
      <button onClick={handleClick}>클릭</button>
      <button onClick={() => setCount(count + 1)}>증가 버튼</button>
    </div>
  );
};
```

이러한 코드가 있다고 했을때, 저 `useCallback`의 의존성 배열에 `count`를 넣어주지 않으면 `handleClick`에서 참조하는 count 값은 계속 0이다.

그렇다고 저기서 `count`를 의존성 배열로 넣어주면 상태가 업데이트 될때마다 함수가 재생성 되는 문제가 발생한다.

`usePreservedCallback`은 이러한 문제점을 해결해준다.

### - 내부 코드

```tsx
import { useCallback, useEffect, useRef } from 'react';

const usePreservedCallback = <Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
): ((...args: Args) => Return) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((...args: Args): Return => {
    return callbackRef.current(...args);
  }, []);
};

export default usePreservedCallback;
```

`useCallback`과 `useRef`를 사용하여, 불필요한 함수의 재생성을 막음과 동시에, 함수 업데이트때마다 `ref`를 동시에 업데이트 해주면서 항상 최신 상태와 `props`를 참조하도록 한다.

또한 사용처에선 의존성 배열을 넣어주지 않아도 되는 편의성 또한 존재한다.

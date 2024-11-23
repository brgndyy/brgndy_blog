---
title: 'toss slash 패키지 살펴보기(2) buildContext'
date: '2024-10-28'
description: 'toss slash 패키지 중 하나인 buildContext 함수를 살펴보자'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1730126990757-toss-slash-2-buildContext.png'
---

[원 소스 코드 링크](https://github.dev/toss/slash)
[직접 작성한 코드 링크](https://github.dev/brgndyy/brgndy-libraries)

리액트에서 컨텍스트를 사용할때의 요구되는 보일러플레이트는 다음과 같다.

1. 컨텍스트의 초깃값을 지정해주고,
2. `createContext`를 통해 컨텍스트를 생성해주어야하며
3. `Provider`로 해당 값을 사용할 컴포넌트를 감싸주고
4. 사용할 컴포넌트에서 `useContext`를 이용하여 값을 사용해준다.

컨텍스트를 사용할때마다 해당 작업들을 반복적으로 해주어야한다.

`buildContext`는 이러한 보일러 플레이트 작업을 줄여주는 헬퍼함수이다.

## - 내부코드

```tsx
import { createContext, useContext, useState, useMemo, ReactNode } from 'react';

type ProviderProps<T> = {
  children: ReactNode;
  value?: Partial<T>;
};

export function buildContext<T extends object>(contextName: string, defaultContext: T) {
  type ContextWithUpdate = T & { updateContext: (updates: Partial<T>) => void };

  const Context = createContext<ContextWithUpdate | null>(null);

  function Provider({ children, value }: ProviderProps<T>) {
    const [state, setState] = useState<T>(() => ({
      ...defaultContext,
      ...value,
    }));

    const contextValue = useMemo(() => {
      const updateContext = (updates: Partial<T>) => {
        setState((prevState) => ({ ...prevState, ...updates }));
      };

      return {
        ...state,
        updateContext,
      };
    }, [state]);

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  }

  function useContextHook(): ContextWithUpdate {
    const context = useContext(Context);

    if (context === null || context === undefined) {
      throw new Error(`use${contextName} must be used within a ${contextName}Provider`);
    }

    return context;
  }

  if (process.env.NODE_ENV !== 'production') {
    Context.displayName = `${contextName}Context`;
  }

  Provider.displayName = `${contextName}Provider`;

  return [Provider, useContextHook] as const;
}
```

함수가 여러개 존재해서 복잡해보일순 있어도, 위에 기재한 저 보일러플레이트 작업을 한곳에 모아서 리턴해주는 코드라고 생각하면 된다.

기존 toss slash의 코드에서는 컨텍스트에 존재하던 값을 가져올수는 있지만, 해당 값을 업데이트 해주지는 못한다.

그리하여 Provider 내부에서 `useState`에서 게으른 초기화를 활용하여 값을 초기화해준 후, 업데이트 함수를 정의해주었다.

타입은 제네릭을 받는데, Partial을 통해 필요한 값만 덮어씌우도록 하였다.

만약 Partial이 아니라면, 업데이트가 필요하지 않은 값 또한 설정해주어야한다.

```tsx
const defaultContext = {
  count: 0,
  name: 'default',
  isLoggedIn: false,
};

//...

<Provider value={{ count: 10, name: 'custom', isLoggedIn: true }}>
  <App />
</Provider>;
```

위의 예시에서 필요한건 count 값이지만, 해당 `name`과 `isLoggedIn` 속성도 추가적으로 계속 넣어주어야한다는 말이다.

최종적으로는 해당 컨텍스트의 Provider와 관련 컨텍스트의 useContext훅을 리턴한다.

## - 사용처

```tsx
interface DefaultCountContext {
  count: number;
  addCount: (count: number) => void;
}

const defaultCountContext: DefaultCountContext = {
  count: 0,
  addCount: () => {},
};

export const [CountProvider, useCountContext] = buildContext('CountContext', defaultCountContext);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CountProvider>
      <App />
    </CountProvider>
  </React.StrictMode>,
);

// 사용처
export default function App() {
  const { count, updateContext } = useCountContext();

  return <button onClick={() => updateContext({ count: count + 1 })}>{count}</button>;
}
```

값이 정상적으로 업데이트 되는 것을 볼 수 있다.

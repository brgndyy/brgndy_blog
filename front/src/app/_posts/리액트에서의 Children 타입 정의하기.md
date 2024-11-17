---
title: '리액트에서 children 타입 정의하기'
date: '2024-04-16'
description: '리액트에서 children 타입은 무엇으로 선언해야하는가?'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1713308805607--children-.png'
---

우리는 보통 컴포넌트 안에 내용물 자체를 넣어줄때, `children`으로 넣어준다.

대표적으로 모달의 Backdrop이 있다.

```tsx
import { ReactNode } from 'react';

interface BackdropProps {
  children: ReactNode;
}

export default function BackDrop({ children }: BackdropProps) {
  return <div>{children}</div>;
}
```

기본적으로 `children`에 대한 타입을 지정해줄때 `ReactNode`로 지정해준다.

`JSX.Element`나 `ReactChild`같은 속성도 존재하지만, 이는 문자열이나 배열은 받지 못하므로 `ReactNode`를 많이 사용한다.

하지만 이마저도, 새로운 레포를 만들때마다 children에 대한 타입을 만들어주어야하므로 번거로움을 느낄 수 있다.

---

## - PropsWithChildren

그러므로 리액트에서 공식적으로 children에 대한 타입을 지정하기 위해서 `PropsWithChildren`이라는 타입을 만들었다.

```typescript
type PropsWithChildren<P = unknown> = P & {
  children?: ReactNode | undefined;
};
```

보면 제네릭을 통해 기존 `props`에 대한 인자들을 받고, `children`은 옵셔널로 `ReactNode` 타입으로 지정해준 것을 볼수 있다.

```typescript
import { PropsWithChildren } from "react";

interface LabelProps {
  htmlFor: string;
}

export default function Label({
  htmlFor,
  children,
}: PropsWithChildren<LabelProps>) {
  return <label htmlFor={htmlFor}>{children}</label>;
}


export default function BackDrop({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}


```

위처럼, 내장된 타입을 이용한다면 간단하게 children에 대한 타입을 정의해줄수 있다.

하지만 `PropsWithChildren`은 옵셔널이기때문에, `children`이 undefined이면 안될 경우에는 완벽히 대응해주지 못한다.

```typescript
export type StrictPropsWithChildren<P = unknown> = P & {
  children: ReactNode;
};
```

이런식으로 옵셔널이 아닌 `ReactNode`만을 인자로 받는 타입을 새롭게 만들어준다면, 더더욱 안정적으로 `children`을 props로 받아줄수 있다.

[StrictPropsWithChildren에 대한 글](https://velog.io/@liswktjs/%EA%B3%B5%EC%8B%9D-%ED%8C%80%EC%97%90%EC%84%9C-children-%EA%B3%BC-%EA%B4%80%EB%A0%A8%EB%90%9C-%ED%83%80%EC%9E%85%EC%9D%84-%EB%A7%8C%EB%93%A0-%EC%9D%B4%EC%9C%A0)

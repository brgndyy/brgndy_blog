---
title: 'createElement 타입 살펴보기'
date: '2024-04-01'
description: '영화 미션에서 사용한 createElement 함수의 타입 살펴보기'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1711889622014-createElement-.png'
---

이번 영화 리뷰 미션을 사용하면서 각각의 태그를 만들기 위해 `createElement`라는 유틸 함수를 만들어서 사용해주었다.

```typescript
type ElementTag = keyof HTMLElementTagNameMap;

interface ElementOption {
  [prop: string]: string;
}

function createElement<T extends HTMLElement>(tag: ElementTag, props: ElementOption = {}): T {
  const element = document.createElement(tag) as T;
  Object.entries(props).forEach(([key, value]) => {
    if (key in element) (element[key as keyof T] as unknown) = value;
    else element.setAttribute(key, value);
  });
  return element;
}

export default createElement;

// 사용하는 곳

const container = createElement('div', { className: 'main-container' });
const text = createElement('p', { textContent: '텍스트입니다.' });
```

처음에는 `setAttribute` 안에 `textContent` 속성도 포함이 될것이라 생각하여 간단히 코드를 작성했었는데, `textContent`같은 경우엔 `setAttribute`가 적용되지 않았다.

[스택오버플로우 글](https://stackoverflow.com/questions/39473537/can-i-use-setattribute-to-change-the-text-inside-the-text-node)

이 글에서 `setAttribute`는 HTML의 속성을 적용시키기 위해 사용하는 메서드라 말한다.

하지만 `textContent`는 단순 프로퍼티이기 때문에 `setAttribute`를 적용시킬수 없다.

그래서 위에 처럼 타입을 분기별로 나눠서 처리해주었다.

하나씩 살펴보면서 타입을 정리해보려고 한다.

```typescript
type ElementTag = keyof HTMLElementTagNameMap;
```

`HTMLElementTagNameMap` 같은 경우,

HTML 태그들을 모아놓은 타입이라고 할수 있다.

```typescript
interface HTMLElementTagNameMap {
    "a": HTMLAnchorElement;
    "abbr": HTMLElement;
    "address": HTMLElement;
    "applet": HTMLAppletElement;
    "area": HTMLAreaElement;
        ...
}
```

여기서 `keyof`를 사용하여 HTML 태그들에 대한 유니언 타입을 생성한다.

```typescript
function createElement<T extends HTMLElement>(tag: ElementTag, props: ElementOption = {}): T;
```

여기서 `HTMLElement` 타입을 상속 받은 제네릭 타입을 반환 값으로 지정해준다.

```typescript
const element = document.createElement(tag) as T;
```

여기서 만약에 `as T`가 없으면

![](https://dp71rnme1p14w.cloudfront.net/compressed_1711407367378--2024-03-26-7.56.04.png)

이런식으로 `element`는 모든 `HTML`요소의 유니언 타입으로 추론이 되어서 에러가 발생한다.

그후에 객체로 받은 `props`를 반복문을 돌면서, 해당 `key`값이 element안에 속한다면, 해당 element의 속성으로 `value` 값을 넣어준다.

### - element[key as keyof T] as unknown 이부분은 왜 필요한가?

우선, `key as keyof T`를 통해서, props로 받은 `key` 값은 T의 키값임을 타입 단언을 통해 보장해준다.

예를 들어서 제네릭으로 들어온 값이 `HTMLDivElement`라면, 이에 맞는 `key`값은 `id`나 `className`이 될 수 있다.

후에 저 `element[key]` 자체를 `as unknown` 로 타입단언을 한번 더 해주어야한다.

저 상태에서 `key`는 무조건 string으로 추론이 되는데, 여기서 `key`값은 문자열 뿐만 아니라 여러 타입을 가질수 있기 때문이다.

만약 `T`가 `HTMLDivElement`이고 `disabled`속성을 적용시켜주고 싶다면 이는 boolean 타입을 갖는다.

그래서 저 값 자체를 `as unknown`으로 단언해줌으로써 에러를 발생시키지 않도록 하고 value 값을 할당해준다.

이렇게 `unknown` 처리를 해주는것은 사실 타입스크립트의 목적성과 어긋난 방법이긴 하다.

또한 현재 `props`로 문자열만 받도록 해주었는데, `boolean`값이나 `number`값이 들어왔을때 처리를 못해주는 상황이다.

만약 모든 값을 수용해주도록 하려면 `if` 분기 처리가 그만큼 늘어날거 같다.

하지만 현재 미션에서 사용하는 값은 `textContent`정도여서 일단 이렇게 처리 해주었다.

---

## - any 타입과 unknown 타입의 차이점

`any`타입과 `unknown` 타입 모두 최상위 타입이다.

즉, 모든 타입이 `any` 또는 `unknown`에 할당 될 수 있다.

하지만 `any`와 `unknown`에는 분명한 차이점이 존재한다.

### - any

any 타입 같은 경우에, 타입 검사를 완전히 비활성화 한다.

`any` 타입의 변수에는 모든 종류의 값이 할당 될수 있으며, 모든 연산이 수행 가능하다.

### - unknown

`unknown` 타입도 마찬가지로 모든 값이 할당 될수는 있지만,

해당 변수를 사용하기 전에 타입을 좁혀야 하는 추가적인 타입 검사가 필요하다.

해당 값에 무슨 타입이 정확히 들어와야하는지 보장할수 없을때 사용한다.

위의 코드에서는 타입 단언 후에, unknown 타입 단언을 사용하여 element[key]에 string 타입의 value를 안전하게 할당할 수 있도록 했다.

---
title: 'ref 는 왜 forwardRef 를 통해서 전달해야할까?'
date: '2024-04-28'
description: 'ref는 왜 forwardRef를 통해서만 전달해야하는지에 대해서'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1714297758881-ref-forwardRef-.png'
---

일반적으로 리액트에서는 상태값을 다루기 위해서 `state`를 사용한다.

하지만 여기서 문제점은 state가 변하는 순간, 부모 컴포넌트에 속한 하위 컴포넌트들은 전부 리렌더링 된다는 것이다.

state가 업데이트 되어서 컴포넌트가 호출이 되는 순간, 해당 컴포넌트에 대한 새로운 컨텍스트가 생성되어서 업데이트 된 state 값으로 리렌더링 된다.

하지만 `ref`를 사용하면 바뀐 상태값은 그대로 유지하지만, 상태가 변하였다고 해서 리렌더링을 유발하지 않는다.

`ref는 읽고 수정할 수 있는 current 프로퍼티를 가진 일반 자바스크립트 객체이다.` (공식문서 발췌)

즉, ref는 리액트의 상태 값이 아니라, 일반적인 자바스크립트 객체이기 때문에 값이 변하여도 리액트가 알지 못한다.

```js
const ReactCurrentDispatcher = {
  current: null,
};

export default ReactCurrentDispatcher;
```

`useRef`의 내부코드를 보면 `current` 프로퍼티를 갖고 있는 객체일 뿐이다.

그렇기 때문에 리렌더링에 영향 받지않고 고정해야하는 값이 있다면 `ref`에 담아서 사용한다.

위 경우에서의 대표적인 예가 직접 `DOM`요소에 접근하는 것이라 할 수 있다.

> 그렇다면 그냥 컴포넌트 내부에 지역 변수를 선언하는 것이나, 외부에 따로 변수를 선언해주는 것과 차이점이 있을까?

일단 함수형 컴포넌트 내부에서 `const`나 `let`을 사용하여 유지하고 싶은 값을 선언해준다면, 컴포넌트가 리렌더링 될때마다 새롭게 선언이 된다.

그렇기 때문에 컴포넌트 생애 주기내에서 꾸준히 관리해주어야하는 값이라면 적당하지 않다.

또한 컴포넌트 바깥에서 `let`이나 `const`를 선언해서 선언해준다면, 불필요한 렌더링을 유발하지도 않고 렌더링때마다 값이 초기화 되지도 않는다.

하지만 해당 컴포넌트를 재사용하면서 값을 따로따로 유지하는 것은 어렵다.

```tsx
let listId = null;

function ListItem(props) {
  listId = props.id;
  return <h1>내용</h1>;
}
```

위의 컴포넌트를 예로 들면, `ListItem` 컴포넌트는 여러곳에서 재사용 되야지만, `listId`는 단일 상태값만 가질수 있다.

> 그렇다면 왜 ref는 forwardRef로 감싸주어야만 하는가 ?

리액트에서는 기본적으로 `ref`를 props로 넘길 수 없도록 했다.

`ref`는 리액트에서의 데이터 흐름인 `props down, events up`의 구조를 따르지 않기 때문이었다.

또한 리액트에서의 캡슐화 원칙때문이다.

각각의 컴포넌트들을 캡슐화와 추상화를 함으로써, 컴포넌트의 재사용성을 높일 수 있는데, ref를 props으로 전달하는 것을 허용하게 되면 직접적인 DOM 노출을 하게 되므로 `forwardRef`를 통해서만 `ref`를 전달할수 있도록 한것이다.

또한 직접적인 DOM에 대한 접근을 제한함으로써 버츄어 돔이라고 불리는 value ui와 실제 DOM과의 동기화를 효과적으로 관리할 수 있다.

---

하지만 리액트 19가 업데이트 되면서 더이상 `forwardRef`로 감싸주지 않아도 된다고 한다..

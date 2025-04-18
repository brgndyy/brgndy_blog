---
title: '리액트에서의 Fiber Architecture'
date: '2024-04-29'
description: '리액트에서의 Fiber Architecture에 대해서'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1714297933790--Fiber-Architecture.png'
---

[Fiber concurrency](https://www.hahwul.com/2023/11/12/fiber-concurrency/)

리액트를 공부하다보면 `fiber`는 빠질수 없는 개념이다.

여기서 말하는 `fiber`란 무엇일까?

`fiber`를 간단히 요약하자면 `리액트에서 각각 컴포넌트에 대한 하나의 작업 단위`라고 할 수 있다.

그렇다면 이 리액트에서의 `fiber`는 어떻게 탄생하게 됐을까?

---

리액트는 16 버전 이전까지 `stack reconciliation architecture`를 채택했었다.

(여기 말하는`Stack`은 우리가 흔히 알고 있는 JS의 실행 컨텍스트 작동 방식으로 이해하면 된다. [어떻게 자바스크립트는 동작하는가 ? ](https://brgndy.me/posts/[%EB%B2%88%EC%97%AD]-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EB%8F%99%EC%9E%91%ED%95%98%EB%8A%94%EA%B0%80-))

즉 각각의 작업들에 대한 컨텍스트들이 JS 엔진 내에서 스택구조로 쌓이게 되면서 작동하는 방식이었다.

하지만 여기서 치명적인 문제점들이 존재했다.

1. 각 컴포넌트의 상태 변경이 발생하면, 최상위 컴포넌트부터 시작하여 변경된 컴포넌트를 찾기 위해 하위 컴포넌트로 내려가면서 전체 트리를 동기적으로 재조정한다. 이는 효율적이지 못하다.

2. 싱글 스레드의 동기적인 실행으로 인해, 장시간 실행되는 스크립트가 UI 업데이트를 차단할 수 있다.

3. 작업에 우선 순위를 지정할 수 없기 때문에 우선적으로 처리되어야할 작업이 후에 처리 될 수도 있다.

> 동기적으로 실행 되는것은 왜 문제인가?

일반적으로 우리가 화면을 응시할때, 부드러운 전환을 위해 초당 60프레임을 기대한다.

즉, 16ms(0.01666...초)당 1프레임을 업데이트 해야지만 사용자가 화면을 바라볼때 버벅거리지 않는다고 인식하는 것이다.

하지만 위의 stack reconciliation 구조를 사용한다면, 사용자한테 바로 보이지 않아도 되는 작업(네트워크 상에서의 데이터 요청)이 사용자한테 바로 보여야 하는 작업 (화면상에서의 애니메이션)보다 먼저 실행 될 수도 있다.

이렇게 된다면 위의 프레임 업데이트 속도를 못따라갈 수 있기 때문에 사용자 입장에선 버벅임을 겪을수 있다.

이러한 문제점을 해결하기 위해서 `fiber reconciliation architecture`가 탄생했다.

---

## - fiber reconciliation architecture

`fiber reconciliation architecture`가 `stack reconciliation architecture`와 다른 점은 크게

1. 작업에 대한 우선 순위를 부여 할 수 있다.

2. 작업을 일시 정지 했다가 다시 재개할 수 있다.

3. 이전에 했던 작업을 다시 재사용하거나 필요하지 않은 경우에는 폐기할 수 있다.

이렇게 말 할 수 있다.

그리고 이 모든 작업들이 동기가 아닌 `비동기`로 일어난다.

---

> 근데 어떻게 하나의 싱글 스레드에서 이러한 작업들이 비동기로 일어날 수 있는 것인가 ?

사실 이 `fiber`라는 용어는 CS 용어이고, `동시성을 위한 경량 스레드`를 의미한다.

여기서 또 그럼 `동시성을 위한 경량 스레드`는 무엇인가?

간단히 설명하자면, 일반적인 스레드는 운영 체제의 스케줄러에 의해 관리 되는 반면에, fiber는 사용자 수준에서 스케줄링 되어서 실행 컨텍스트를 스스로 관리한다.

fiber는 실행을 시작할때 자신의 컨텍스트를 설정해놨다가, 실행이 중지 될땐 해당 컨텍스트를 저장한다. 사용자에게 실행 흐름에 대한 제어권이 있기 때문에 컨텍스트 스위칭이 가능하다.

---

이러한`fiber` 모델을 기반으로 하여 리액트도 동시성과 우선순위를 적용시켰다고 볼 수 있다.

또한 stack 구조에서는 tree구조였지만, fiber 구조에선 tree가 아닌 LCRS트리(linked list)구조를 사용하여 효율성을 높였다.

## - fiber 구조와 stack 구조의 시각적 차이

![](https://velog.velcdn.com/images/brgndy/post/98453084-3e43-4141-84f6-f3ec6e14a18b/image.gif)

`fiber reconciliation structure`에서는 시간복잡도가 O(n)인 [휴리스틱 알고리즘](https://namu.wiki/w/%ED%9C%B4%EB%A6%AC%EC%8A%A4%ED%8B%B1%20%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)을 재조정에 사용한다.

이전과 다른 타입의 요소로 교체되었다면 하위 트리는 더 이상 비교하지 않고 전체를 교체한다. (아예 새롭게 마운트)

## - 요소 교체 예시

### - Parent

```tsx
export default function Parent() {
  const [number, setNumber] = useState(0);

  const handleNumberChange = () => {
    setNumber((prev) => prev + 1);
  };

  return (
    <div>
      <button onClick={handleNumberChange}>더하기</button>
      {number}
      <Children1 />
      <Children2 />
    </div>
  );
}
```

### - Children1

```tsx
export default function Children1() {
  console.log('Children1 렌더링');

  useEffect(() => {
    console.log('useEffect 내부에서 Children1 렌더링');
  }, []);

  return <div>Children1</div>;
}
```

### - Children2

```tsx
export default function Children2() {
  console.log('Children2 렌더링');

  useEffect(() => {
    console.log('useEffect 내부에서 Children2 렌더링');
  }, []);
  return <div>Children2</div>;
}
```

![](https://dp71rnme1p14w.cloudfront.net/compressed_1713829102991--2024-04-23-8.38.19.png)

여기서 Parent에서 버튼을 클릭해보자.

![](https://dp71rnme1p14w.cloudfront.net/compressed_1713829187441--2024-04-23-8.39.44.png)

`useEffect` 내부의 콘솔은 실행 되지 않고 단순히 함수 내부의 콘솔만 실행 된다.

만약 Parent에서 감싸고 있는 `div`를 `span`으로 교체한다면 ?

![](https://dp71rnme1p14w.cloudfront.net/compressed_1713829348439--2024-04-23-8.42.24.png)

요소 자체가 바뀌게 되어서 트리 전체를 교체하므로, 마운트가 새롭게 되어서 `useEffect`가 실행 된다.

key가 동일한 요소는 이전과 동일한 엘리먼트로 취급한다.

그리고 가급적 `fiber`는 첫 생성 이후에 최대한 재사용 된다.

## - 우선 순위

![](https://dp71rnme1p14w.cloudfront.net/compressed_1713619495656--2024-04-20-10.24.53.png)

1. No Priority

NoPriority는 우선순위를 나타내는 여러 값 중 하나로, 이는 '우선순위 없음'을 의미한다.

즉, 해당 작업이 어떤 우선순위도 가지고 있지 않아 스케줄링에서 고려되지 않는 상태를 나타이다. (idle 상태)

이는 어떤 작업이 현재 진행되지 않거나 대기 상태에 있을 때, 또는 처리할 필요가 없어진 작업을 나타낼 때 사용된다.

작업들에 대해서 아직 우선순위가 할당 되지 않았거나, 해당 작업이 더 이상 필요하지 않게 되면 NoPriority 로 설정하여 스케줄러가 해당 작업을 처리할수 있다.

2. Immediate Priority

매우 긴급하고 즉각적으로 처리해야 하는 업데이트이다.

키보드 입력과 같은 상호작용을 예로 들 수 있다.

3. User Blocking Priority

사용자가 직접적으로 인지할 수 있는 작업으로, 반응 시간이 빠르지 않으면 사용자 경험이 저하된다.

버튼 클릭 같은 이벤트 응답이 있다.

4. Normal Priority

일반적인 데이터 가져오기나 화면 업데이트와 같은 표준 우선순위의 작업이다.

사용자 경험에 중요하지만 즉각적인 처리가 필요하지 않은 작업들이 이에 해당 한다.

5. Low Priority

배경에서 수행되어도 되는 작업들, 예를 들어 데이터를 미리 가져오거나 로깅 같은 비교적 중요도가 낮은 작업이다.

6. Idle Priority

CPU가 비는 시간에 수행될 수 있는 작업들이다.

이 우선순위의 작업은 시스템이 비교적 한가할 때 수행되며, 예를 들어 오프스크린 이미지 불러오기(사용자가 아직 보지 않은 이미지)나 비활성 UI 요소의 데이터 처리가 이에 해당한다.

---

리액트는 기본적으로 `beginWork()` 함수를 실행해 파이버 작업을 실행한다.

더 이상 자식이 없는 파이버를 만날 때까지 트리 형식으로 시작 된다.

```ts
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

function performUnitOfWork(unitOfWork: Fiber): void {
  const current = unitOfWork.alternate;

  const next = beginWork(current, unitOfWork, renderLanes);

  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  if (next === null) {
    // 새로운 작업이 없다면 끝냅니다.
    completeUnitOfWork(unitOfWork);
  } else {
    workInProgress = next;
  }
}
```

## - beginWork

```js
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
) {
  if (current !== null) {
    const oldProps = current.memoizedProps;
    const newProps = workInProgress.pendingProps;

    // ...
  }

  switch(workInProgress.tag) {
    // case FunctionComponent:
    // case ClassComponent:
    // case IndeterminateComponent:
    case HostRoot:
      return updateHostRoot(current, workInProgress, renderLanes);
    // case HostPortal:
    // case HostComponent:
    // case HostText:
    // case Fragment:
    // case Mode:
    // case ContextConsumer:
    // case ContextProvider:
    // case ForwardRef:
    // case Profiler:
    // case SuspenseComponent:
    // case MemoComponent:
    // case SimpleMemoComponent:
    // case LazyComponent:
    // case IncompleteClassComponent:
    // case DehydratedFragment:
    // case SuspenseListComponent:
    // case ScopeComponent:
    // case OffscreenComponent:
    // case LegacyHiddenComponent:
    // case CacheComponent:
    // case TracingMarkerComponent:
    // case HostHoistable:
    // case HostSingleton:
  }

  throw new Error(
    `Unknown unit of work tag (${workInProgress.tag}). This error is likely caused by a bug in ` +
    'React. Please file an issue.',
  );
}
```

`workLoopSync` 함수 내에서 `workInProgress`이 null이 될때까지 performUnitOfWork 함수가 실행된다.

그 안에는 `beginWork`가 있는데 파이버 트리를 비교하고 업데이트 한다.

그 후에 더 이상 작업할게 없다면 `completeUnitOfWork`가 실행 되고, 작업을 완료하는 `completeWork` 함수로 넘어가게 된다.

## - completeUnitOfWork

```ts
let completeWork = unitOfWork;

do {
  const current = completeWork.alternate;
  const returnFiber = completedWork.return;

  // 여기서 completeWork 실행
  const next = completeWork(current, completeWork, renderLanes);

  if (next !== null) {
    workInProgress = next;
    return;
  }

  // 다음 자식이 없다면 형제 파이버로 이동
  const siblingFiber = completeWork.sibling;
  if (siblingFiber !== null) {
    workInProgress = siblingFiber;
    return;
  }

  completedWork = returnFiber;
  workInProgress = completedWork;
} while (completeWork !== null);
```

## - completeWork

```ts
function completeWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
): Fiber | null {
  switch (workInProgress.tag) {
    case IndeterminateComponent:
    case LazyComponent:
    case SimpleMemoComponent:
    case FunctionComponent:
    case ForwardRef:
    case Fragment:
    case Mode:
    case Profiler:
    case ContextConsumer:
    case MemoComponent:
      bubbleProperties(workInProgress);
      return null;
  }
}
```

실질적으로 파이버 업데이트 작업이 끝났음을 알리는 `completeWork`함수가 실행된다.

여기 내부에 `bubbleProperties`라는 함수가 있는데,

이 `completeWork`에서 하위에서 실행된 work들을 상위로 합쳐주는 역할을 한다.

## - bubbleProperties

```ts
function bubbleProperties(completedWork: Fiber) {
  let subtreeFlags = NoFlags;
  let newChildLanes = NoLanes;
  let child = completedWork.child;

  while (child !== null) {
    newChildLanes = mergeLanes(newChildLanes, mergeLanes(child.lanes, child.childLanes));

    subtreeFlags |= child.subtreeFlags;
    subtreeFlags |= child.flags;

    child.return = completedWork;
    child = child.sibling;
  }

  completedWork.subtreeFlags |= subtreeFlags;
  completedWork.childLanes = newChildLanes;
}
```

즉, `beginWork` 함수를 업데이트할 파이버가 없을때까지 실행하고,

없다면 `completeWork`를 수행시켜서 실제적인 DOM을 업데이트 하는 `commit phase`로 넘어간다.

세부 코드가 복잡해서 대략적인 흐름만 살펴본것이지만, 리액트가 어떠한 문제점을 해결하기 위해서 `Fiber Architecture`을 도입한 것인지 알수 있었다.

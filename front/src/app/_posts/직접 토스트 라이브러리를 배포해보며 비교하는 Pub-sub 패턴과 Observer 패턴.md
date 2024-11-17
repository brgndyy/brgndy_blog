---
title: '직접 토스트 라이브러리를 배포해보며 비교 해보는 Pub-sub 패턴과 Observer 패턴'
date: '2024-06-17'
description: '직접 비교해보는 pub-sub vs observer pattern'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1718605148415--pub-sub-Observer-.png'
---

# 직접 토스트 라이브러리를 배포해보며 비교 해보는 Pub-sub 패턴과 Observer 패턴

이번 미션을 진행하면서, 토스트 컴포넌트를 만들어야했다.

전부터 토스트 라이브러리 같은 경우 재사용성이 크다고 판단해서, 직접 라이브러리로 배포해보고 싶었는데 이번 기회에 한번 직접 만들고 배포해볼 수 있었다.

## - 완성 화면

![화면 기록 2024-06-16 오후 6 32 19](https://github.com/brgndyy/brgndy-toast/assets/109535991/65133562-6055-47af-aa14-e2a7ff5583c9)

[배포 링크](https://www.npmjs.com/package/brgndy-toast)

구현을 하는 과정에서

1. 옵저버 패턴 (Observer Pattern)

2. Pub-sub 패턴 (Pub-sub Pattern)

이 2가지 중 어떤 패턴으로 구현할 것인지가 고민이 됐었다.

## - Observer Pattern

옵저버 패턴은 객체의 상태 변화를 관찰하고, 변화가 발생할 때마다 그 변화를 모든 관찰자에게 통보하는 디자인 패턴이다.

이는 주로 일대다(one-to-many)의 관계에서 사용 되며, 상태 변화가 있을때마다 자동으로 갱신이 필요한 경우에 유용하다.

### - Observable.ts

```ts
type Listener<T = any> = (data: T) => void;

class Observable {
  private observers: Listener[] = [];

  addObserver(observer: Listener): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Listener): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data: any): void {
    this.observers.forEach((observer) => observer(data));
  }
}

const toastObservable = new Observable();
```

## - toast.ts

```ts
const showToast = (event: string, message: string, duration: number = 3000) => {
  toastObservable.notify(event, { message, duration });
};

const toast = {
  notify: (message: string, duration?: number) => showToast('default', message, duration),
  warning: (message: string, duration?: number) => showToast('warning', message, duration),
  error: (message: string, duration?: number) => showToast('error', message, duration),
  success: (message: string, duration?: number) => showToast('success', message, duration),
};
```

### - Toast.tsx

```tsx
useEffect(() => {
  const handleNewToast = ({ message, type, duration }: ToastMessage) => {
    // 토스트 렌더링 로직
  };

  toastObservable.addObserver(handleNewToast);

  return () => {
    toastObservable.removeObserver(handleNewToast);
  };
}, []);

return (
  <div>
    {toasts.map((toast) => (
      <div>{toast.message}</div>
    ))}
  </div>
);
```

## - 옵저버 패턴의 장점

1. 상태 변화에 대한 실시간 업데이트가 용이하다.
2. 구조가 단순하다.

## - 옵저버 패턴의 단점

1. 직접적으로 관찰자와 객체가 서로를 인지하므로 강한 결합도를 가진다.
2. 대규모 시스템에서는 많은 관찰자와 관찰 대상이 존재할 수 있으므로 의존성이 생긴다.

## - Pub-sub Pattern

Pub-sub 패턴은 말그대로 발행자(Publisher)와 구독자(Subscriber)가 통신하는 패턴을 의미한다

옵저버 패턴과는 다르게, `Publisher`와 `Subscriber`는 서로를 직접 참조하지 않으며, 중개자를 통해서 연결 된다.

서로를 직접 참조하지 않기 때문에, 확장에 용이하며, 결합도가 낮다는 장점이 있다.

하지만 규모가 커지면 커질수록 추적이 어려워지고, 일관성이 없다는 단점이 있다.

이 Pub-sub 패턴을 토스트 컴포넌트에 적용시켜보자.

### - EventEmitter

```ts
class EventEmitter {
  private events: { [key: string]: Listener[] } = {};

  subscribe<T = any>(event: string, listener: Listener<T>): () => void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener as Listener);
    return () => this.unsubscribe(event, listener);
  }

  unsubscribe<T = any>(event: string, listener: Listener<T>): void {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  publish<T = any>(event: string, data: T): void {
    if (!this.events[event]) return;
    this.events[event].forEach((listener) => listener(data));
  }
}

const eventEmitter = new EventEmitter();
```

먼저 이벤트를 관리 할 `eventEmitter` 클래스를 생성해준다.

여기서 이 `eventEmitter`가 브로커의 역할을 해준다.

### - toast.ts

```ts
const showToast = ({ message, type, duration = 3000 }: ToastOptions) => {
  eventEmitter.publish('toast', { message, type, duration });
};

const toast = {
  notify: (message: string, duration?: number) => showToast({ message, type: 'default', duration }),
  warning: (message: string, duration?: number) =>
    showToast({ message, type: 'warning', duration }),
  error: (message: string, duration?: number) => showToast({ message, type: 'error', duration }),
  success: (message: string, duration?: number) =>
    showToast({ message, type: 'success', duration }),
};
```

여기서 `showToast` 함수는 `eventEmitter`의 `publish` 메서드를 호출하여 toast 이벤트를 발행한다.

즉, showToast 함수가 발행자(Publisher)의 역할을 한다.

이를 통해 toast 이벤트가 발행되면, 이를 구독하고 있는 모든 구독자(Subscriber)들이 해당 이벤트를 받아 처리하게 된다.

### - Toast.tsx

```tsx
export default function Toast() {

  useEffect(() => {
    const handleNewToast = ({ message, type, duration }: ToastMessage) => {
        // 토스트 컴포넌트 렌더링
    };

    const unsubscribe = eventEmitter.subscribe('toast', handleNewToast);

    return () => {
      unsubscribe();
    };
  }, []);

    return (
    <div>
      {toasts.map((toast) => (
        <div>
          {toast.message}
        </div>
      ))}
    </div>
  );
```

실질적으로 브라우저 화면상에 띄워지는 토스트 컴포넌트이다.

여기서 중요하게 봐야할 것은, 마운트 될때 unsubscribe라는 변수에 `eventEmitter.subscribe` 함수가 담겨서 실행 되고, 언마운트 될때 `unsubscribe`가 실행된다는 점이다.

이는 `eventEmitter` 내부에 subscribe함수에 클로저로 `unsubscribe` 함수를 담아놓았기 때문에 가능하다.

흐름을 정리해보자면 다음과 같다.

1. `Toast` 컴포넌트 내부에서 `eventEmitter`를 통해서 `subscribe`, 즉 구독을 시작한다.

2. `toast.status('메세지', 시간)`의 호출을 통해, `toast`이벤트가 `publish` 된다.

3. 그 후에 브로커인 `eventEmitter`는 `publish` 받은 토스트 이벤트를 구독자 (handleNewToast)에게 전달한다.

4. `handleNewToast`함수가 실행 되어서, 새로운 토스트 메세지를 상태에 추가하고, 화면에 렌더링 한다.

5. Toast 컴포넌트가 언마운트 될 때, `unsubscribe` 함수가 호출되어서 구독이 해제 된다.

## - Pub-Sub 패턴의 장점

1. 발행자와 구독자가 서로를 직접 참조하지 않으므로 결합도가 낮다. 즉 확장성이 뛰어나다.

2. 중개자가 존재하므로, 이벤트 흐름을 추적하기 어렵다.

이번 경우에는 pub-sub 패턴을 처음 겪어보는지라, pub-sub 패턴을 사용해서 한번 구현해보았다.

더 보완하고 싶은 부분은 현재, 각 토스트 컴포넌트의 배경 색상이 라이브러리 내부에서 지정이 되어있는데,

이를 외부에서 주입받을수 있도록 해주어야하는 필요성을 느끼고 있다.

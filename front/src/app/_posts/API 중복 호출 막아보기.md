---
title: '연속적인 API 호출을 막는 커스텀 mutation 만들기'
date: '2024-08-10'
description: '소위 말하는 따닥을 막아보자'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1724639013147--API-mutation-.png'
---

클라이언트단에서 API 요청에 대한 중복 호출을 방지하는 것은 중요하다.

tanstack-query에서는 기본적인 캐싱 기능이 존재하기 때문에 단순히 데이터를 불러들이는 과정에서는 비용을 줄일 수있다.

하지만 버튼 클릭 같이 직접적인 사용자의 인터렉션이 API 요청을 트리거한다면 별도의 처리가 필요하다.

단순한 로직에서는 중복 요청을 방지하는 것이 중요한가? 라는 생각이 들수도 있다.

하지만 결제 로직 같이 실제적인 비용이 들어간다거나 클릭 한번에 서버에 많은 부하가 일어난다면?

실제로 프로젝트 진행 단계에서, 본인이 수행한 미션에 대한 정보를 작성하고 버튼을 누르면 `미션 제출`이 되는 로직을 구현했다.

이 상황에서 미션 제출 여부에 따른 분기 처리가 확실히 이루어져야했기 때문에 별도의 처리를 해주고 싶었다.

보통 중복 호출을 막기 위해서 `useMutation`의 `isPending` 상태를 사용한다.

```tsx
const { mutate: apiCallMutation, isPending } = useMutation({
  mutationFn: fetchData,
});

const handleSubmit = () => {
  if (isPending) {
    console.warn('이미 호출 되었어요!');
    return;
  }
  apiCallMutation();
};
```

하지만 이러한 방식에는 문제가 발생한다.

리액트 쿼리 내부에서는 옵저버 패턴을 활용하여 옵저버 인스턴스를 통하여 상태를 관리한다.

하지만 이 인스턴스 또한 `useState`를 통해 관리하기 때문에 `setState`가 [batching update](https://react.dev/learn/queueing-a-series-of-state-updates) 처리 되듯이 비동기적으로 작동한다.

<img width="547" alt="스크린샷 2024-08-06 오후 8 06 16" src="https://github.com/user-attachments/assets/791242fb-f347-4c0b-bdd6-6d2b088f9dc4">

그렇기 때문에 이 방법은 실질적인 해결책이 되지 못한다.

한번 다음의 코드를 살펴보자.

```tsx
import { useMutation } from '@tanstack/react-query';

const fetchData = async () => {
  try {
    const res = await fetch('...');

    console.log('api call!');

    const data = await res.json();

    console.log(data);

    return data;
  } catch (err) {}
};

export default function DuplicateCall() {
  const { mutate: apiCallMutation, isPending } = useMutation({
    mutationFn: fetchData,
  });

  const handleSubmit = () => {
    if (isPending) {
      return;
    }
    apiCallMutation();
  };

  const handleDuplicateCall = () => {
    for (let i = 0; i < 10; i++) {
      handleSubmit();
    }
  };

  return (
    <>
      <button onClick={handleSubmit}>일반 트리거</button>
      <button onClick={handleDuplicateCall}>중복 호출 트리거 </button>
    </>
  );
}
```

![화면 기록 2024-08-06 오후 8 08 55](https://github.com/user-attachments/assets/7c10ee4e-5afb-4c9f-8ddc-e7962d88da72)

위의 if문을 통하여 분기처리를 해주었음에도 불구하고 콘솔에는 중복된 호출이 발생하는것을 확인할 수 있다.

이러한 문제를 해결하기 위해선 어떻게 해야할까?

인터넷을 검색해보면 `쓰로틀`이나 `디바운스`를 활용한 방법들이 나오는데, 이러한 방식은 근본적인 해결책이 되지는 못한다.

디바운스나 쓰로틀을 사용하려면 기본적으로 타이머를 지정해놓고 구현해야한다.

```tsx
const debouncedSubmit = useCallback(debounce(handleSubmit, 300), [isPending]);

const throttledSubmit = useCallback(throttle(handleSubmit, 1000), [isPending]);
```

만약 이처럼 일정 주기를 타이머로 잡고 api 콜을 했을때, 지정해놓은 타이머보다 API 응답이 빨리 와도 문제고 늦게 와도 문제다.

1. 지정해놓은 시간보다 응답이 빨리온다면 사용자는 지정해놓은 시간이 되기 전꺼지 추가적인 액션을 하지 못한다.

2. 지정해놓은 시간보다 응답이 늦게 온다면, 지정해놓은 시간 전까지 중복 호출이 가능하므로 무의미하다.

이 디바운스와 쓰로틀의 본질적인 목적은 과도한 api 호출을 막는 것이지, 중복 호출 그 자체를 막는 것은 아니다.

그렇다면 어떻게 해결해볼 수 있을까?

해결책으로 `ref`를 활용하여 중복 호출을 막아낼수 있는데, 이러한 방법에 개인적으로 느꼈던 불편함이 2가지 존재한다.

1. mutation 생성마다 ref를 생성해주어야한다.
2. 단순히 중복 값을 감지하기 위한 ref 그 이상 그 이하도 아니다.

그래서 mutation 자체를 감싸주는 wrapper mutation을 만들면 어떨까? 라는 생각이 들었다.

```ts
import { useRef } from 'react';

const useSingleRequest = () => {
  const apiRequests = useRef<Set<string>>(new Set());

  const startRequest = (requestId: string): boolean => {
    if (apiRequests.current.has(requestId)) {
      console.warn('이미 요청이 진행 중입니다.');
      return false;
    }
    apiRequests.current.add(requestId);
    return true;
  };

  const endRequest = (requestId: string): void => {
    apiRequests.current.delete(requestId);
  };

  return { startRequest, endRequest };
};

export default useSingleRequest;
```

먼저 `useSingleRequest`라는 훅을 만들고, 여기서 Set을 통해 단일 값만 받도록 한다.

해당 `requestId`값을 가진 요청이 중복으로 들어왔을때 false를 리턴하고 순수하게 하나의 요청에만 true를 리턴한다.

```tsx
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import useSingleRequest from './useSingleRequest';
import { ERROR_MESSAGE } from '@/constants/messages';

interface SingleFlightMutationOptions<TData, TError, TVariables>
  extends UseMutationOptions<TData, TError, TVariables> {
  requestId?: string;
  queryFn: (variables: TVariables) => Promise<TData>;
}

const useSingleRequestMutation = <TData, TError, TVariables = void>(
  options: SingleFlightMutationOptions<TData, TError, TVariables>,
): UseMutationResult<TData, TError, TVariables> => {
  const { startRequest, endRequest } = useSingleRequest();
  const requestId = options?.requestId || 'defaultRequestId';

  return useMutation<TData, TError, TVariables>({
    ...options,
    mutationFn: options.queryFn,
    onMutate: async (variables: TVariables) => {
      const canProceed = startRequest(requestId);
      if (!canProceed) {
        throw new Error(ERROR_MESSAGE.duplicate_request);
      }
      if (options?.onMutate) {
        return await options.onMutate(variables);
      }
    },
    onSuccess: (data: TData, variables: TVariables, context: unknown) => {
      endRequest(requestId);
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error: TError, variables: TVariables, context: unknown) => {
      endRequest(requestId);
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    onSettled: (
      data: TData | undefined,
      error: TError | null,
      variables: TVariables,
      context: unknown,
    ) => {
      endRequest(requestId);
      if (options?.onSettled) {
        options.onSettled(data, error, variables, context);
      }
    },
  });
};

export default useSingleRequestMutation;
```

그리고 이 `useSingleRequest`훅의 리턴값을들 받는 `mutation`을 만들고 단일 요청에만 변이가 진행 되도록 한다.

## - 사용처

```ts
const { mutate: apiCallMutation } = useSingleRequestMutation({
  queryFn: fetchData,
  onSuccess: onSuccessCallback,
  onError: onErrorCallback,
  requestId: 'fetchDataRequest',
});
```

위처럼 첫번째 인자로 API함수, 그 후에 `requestId`를 추가해서 고유한 요청 id 값을 넣어준다.

![화면 기록 2024-08-10 오후 9 49 47](https://github.com/user-attachments/assets/8bdbf418-4ddb-4536-8515-9535263f94a2)

위와 똑같은 상황에서 `useSingleRequestMutation`을 사용했을때 최종적인 단 1개의 요청만 실행 되는 것을 확인할 수 있다.

---

여기서 `requestId`를 `mutationKey`로 대체할수도 있다.

하지만 `mutationKey`는 API 중복 호출을 막기 위해서 존재하는 key가 아니다.

[공식 Discussion 글](https://github.com/TanStack/query/discussions/6093)을 보면 알수 있지만,

`mutationKey`는 동일한 키를 가진 뮤테이션들에 대해 기본 설정을 공유할 수 있도록 도와주고, 특정 뮤테이션의 상태들을 여러 컴포넌트들에서 공유할수 있도록 한다.

```tsx
queryClient.setMutationDefaults(['addProduct'], {
  mutationFn: addProductFunction,
});

// 사용처에서 해당 mutationKey를 통해서 mutation 호출 가능
const mutation = useMutation({ mutationKey: ['addProduct'] });
```

```tsx
import { useMutationState, useIsMutating } from '@tanstack/react-query';

// mutationKey를 통해서 해당 mutation의 상태를 가져올 수 있음
const postsMutationState = useMutationState({
  filters: { mutationKey: ['products'] },
});

// 특정 mutation이 진행중인지 알수 있음
const isMutatingPosts = useIsMutating({
  mutationKey: ['posts'],
});
```

그렇기 때문에 `requestId`를 직접 인자로 넣어주어서 중복 호출을 판별해주었다.

---
title: '선택적으로 mutate를 발생 시키는 useCachedMutate 만들어보기'
date: '2024-06-21'
description: 'mutate를 발생 시키고 싶은 값을 캐싱해놓을 순 없을까 ?'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1718986684641--mutate-useCachedMutate-.png'
---

# 선택적으로 mutate를 발생 시키는 useCachedMutate 만들어보기

현재 BEING_JAZZER에서는 사용자가 코드 설정 셋팅을 바꿀때마다 `mutate`함수가 일어난다.

![](https://velog.velcdn.com/images/brgndy/post/af800b61-24e4-45f8-a44a-d5dabd0a3dd3/image.gif)

영상으로 따지면 `설정 변경` 버튼을 누를때마다 항상 api 콜이 발생하는 것이다.

근데 문제는 저 코드 셋팅을 변경하는 로직이 한번 실행 될때마다 서버내에서는 한 유저당 수백개의 데이터가 변경 될 수도 있다.

![](https://dp71rnme1p14w.cloudfront.net/compressed_1718979399954--2024-06-21-11.16.38.png)

이는 각 유저가 설정한 셋팅 값에 맞게 코드 이미지(keyChordDetail 컬럼)도 동시에 저장 되어야 하기 때문에 불가피했다.

이전에 설정해놨던 코드 설정과 동일한데도 `설정 변경`이 일어날 수도 있고, 이는 효율적이지 못하다.

그래서 Mutate를 실행하기 전에, 이전에 상태값과 같다면 아예 Mutate 함수 자체를 실행 시키지 않을순 없을까 ? 생각이 들었다.

그래서 `useCachedMutate` 훅을 만들어보았다.

## - 구현체

```ts
import { useState, useCallback } from 'react';
import {
  MutateOptions,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import compareDeepEqual from '@/_utils/compareDeepEqual';

interface CachedMutationOptions<TVariables, TData, TError>
  extends UseMutationOptions<TData, TError, TVariables> {
  initialValue: TVariables;
  equalityFn?: (a: TVariables, b: TVariables) => boolean;
}

export const useCachedMutation = <TData, TError, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: CachedMutationOptions<TVariables, TData, TError>,
): UseMutationResult<TData, TError, TVariables> => {
  const { initialValue, equalityFn = compareDeepEqual, ...mutationOptions } = options;
  const [previousVariables, setPreviousVariables] = useState<TVariables>(initialValue);

  const mutation = useMutation<TData, TError, TVariables>({
    mutationFn,
    ...mutationOptions,
  });

  const cachedMutate = useCallback(
    (variables: TVariables, options?: MutateOptions<TData, TError, TVariables>) => {
      // 만약 변경 사항이 없다면
      if (equalityFn(previousVariables, variables)) {
        // 사용자가 onSettled 상태에 대한 함수를 지정해주었다면
        if (mutationOptions.onSettled) {
          mutationOptions.onSettled(undefined, null, variables, undefined);
        }
        return;
      }
      setPreviousVariables(variables);
      mutation.mutate(variables, options);
    },
    [previousVariables, equalityFn, mutation, mutationOptions],
  );

  return {
    ...mutation,
    mutate: cachedMutate,
  };
};
```

먼저 mutation 내부의 타입들이 많이 사용 됐는데 타입은 이렇다.

[정보 출처](https://github.com/ssi02014/react-query-tutorial)

1. TData: useMutation에 넘겨준 mutation function의 실행 결과의 타입을 지정하는 제네릭 타입이다.

- data의 타입과 onSuccess(1번째 인자) 인자의 타입으로 활용된다.

2. TError: useMutation에 넘겨준 mutation function의 error 형식을 정하는 제네릭 타입이다.

3. TVariables: mutate 함수에 전달 할 인자를 지정하는 제네릭 타입이다.

- onSuccess(2번째 인자), onError(2번째 인자), onMutate(1번째 인자), onSettled(3번째 인자) 인자의 타입으로 활용된다.

4. TContext: mutation function을 실행하기 전에 수행하는 onMutate 함수의 return값을 지정하는 제네릭 타입이다.

- onMutate의 결과값의 타입을 onSuccess(3번째 인자), onError(3번째 인자), onSettled(4번째 인자)에서 활용하려면 해당 타입을 지정해야 한다.

사실 useMutation 과 사용법은 거진 동일하다.

차이점이 있다면 캐싱을 위한 state를 하나 선언해주고, mutation이 실행 될때 `compareDeepEqual` 함수가 실행 되어서 이전 값과 깊은 비교를 해준다.

만약 이전에 저장된 값과 동일하다면, 그리고 사용자가 `onSettled` 설정을 해놓았다면 해당 함수를 실행시켜주고 return 해준다.

여기서 깊은 비교를 위해 초기에 `JSON.stringify`를 사용했었다.

하지만 이는 값이 `undefined`일때 비교 자체를 건너 뛰는 문제가 발생한다.

예를 들면 이런식이다.

```ts
let obj1 = { a: 1, b: undefined };
let obj2 = { a: 1 };

console.log(JSON.stringify(obj1) === JSON.stringify(obj2)); // true
```

이를 해결하기 위해서 `lodash`의 `isEqual`을 사용할까도 했지만, 외부 라이브러리에 의존성을 갖게 되는것 같아서 차라리 직접 `compareDeepEqual`이라는 유틸 함수를 만들어주었다.

이 유틸함수는 겹객체 뿐만 아니라 Map이나 Set, Date 객체도 비교할수 있도록 만들어주었고, 각각의 경우에 대해 테스트 코드를 작성함으로써 안정성을 더했다.

이제 사용처에서 캐싱하고 싶은 `initialValue`만 정의해서 주입시켜주면 된다.

## - useChangeUserChordSetting.ts

```ts
const { mutate: changeChordSettingMutation } = useCachedMutation(
  ({ accessToken, chordSetting }) => changeUserChordSetting({ accessToken, chordSetting }),
  {
    initialValue: { accessToken, chordSetting: initialChordSetting },
  },
);
//...
```

핵심만 보면, useCachedMutation 사용처에서 initialValue로 accessToken과 initialChordSetting을 넘겨주고 있다.

![](https://velog.velcdn.com/images/brgndy/post/408d5967-9b76-4d38-9442-2baccb5c7ded/image.gif)

아무런 수정사항 없이 변경 버튼을 눌렀을때, 변경 사항이 없다는 콘솔이 작동하는 것을 볼 수 있다.

---

이러한 상황을 방지하기 위한 커스텀 mutation이 추가되면 좋겠다는 생각이 들었다.

그래서 tanstack-query 의 discussion에 직접 글을 남겼다. [글 링크](https://github.com/TanStack/query/discussions/7863)

결과적으로 반영이 안됐지만 그래도 한번쯤은 내가 가진 생각을 통해 이야기 나눠볼수 있어서 좋은 경험이었다.

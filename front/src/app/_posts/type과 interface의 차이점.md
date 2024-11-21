---
title: 'type과 interface의 차이점'
date: '2024-03-11'
description: 'type과 interface의 차이점'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/type%E1%84%80%E1%85%AA+interface%E1%84%8B%E1%85%B4+%E1%84%8E%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8C%E1%85%A5%E1%86%B7.png'
---


기본적으로 `type`과 `interface`는 둘다 타입을 선언하는데에 사용된다.

```typescript
type Person = {
  age: number;
  name: string;
  isBirthday: boolean;
};

interface Person = {
  age: number;
  name: string;
  isBirthday: boolean;
};
```

`type`은 `&`을 통해, `interface`는 `extends` 키워드를 통해 타입을 확장할 수 있다.

```typescript
type Address = {
  address: string;
};

type Person = Address & {
  age: number;
  name: string;
  isBirthday: boolean;
};

interface Person {
  age: number;
  name: string;
  isBirthday: boolean;
}

interface Person extends Address {
  age: number;
  name: string;
  isBirthday: boolean;
}
```

둘다 타입 확장은 가능하지만 Type을 사용했을땐 `선언적 확장`은 불가능하다.

즉 `interface`는 같은 `interface` 명으로 타입을 지정했을때 그 두개의 인터페이스가 합쳐진다.

하지만 같은 `Type` 끼리는 불가능하다.

```typescript
interface Person {
  age: number;
  name: string;
  isBirthday: boolean;
}

interface Person {
  address: string;
}

const brgndy: Person = {
  age: 1,
  name: 'brgndy',
  isBirthday: false,
  address: '1010',
};

type Person = {
  age: number;
  name: string;
  isBirthday: boolean;
};

type Person = {
  address: string;
};
```

![](https://dp71rnme1p14w.cloudfront.net/compressed_1710157780727--2024-03-11-8.49.38.png)

### computed value 의 가능 유무

`computed value`란 변수의 값이나 어떤 표현식의 결과값을 동적으로 계산하는 것을 의미한다.

즉 타입스크립트에서 `in`을 사용하면 새로운 타입을 만들어낼수 있는데, 이를 `interface`안에서 사용하면 에러를 발생시킨다.

```typescritp
type Fruits = 'apple' | 'grape' | 'banana';

interface NewFruits {
  [key in Fruits]: string;
}
```

![](https://dp71rnme1p14w.cloudfront.net/compressed_1710158007249--2024-03-11-8.53.24.png)

```typescript
type Fruits = 'apple' | 'grape' | 'banana';

type NewFruits = {
  [key in Fruits]: string;
};
```

`type`으로 선언해준다면 에러를 발생시키지 않는다.

확장성을 고려한다면 `interface`를, 튜플이나 유니언 타입 즉 확장 불가능한 타입을 사용해야한다면 `type`으로 선언해주는것이 더 나은 방향성일수 있다.

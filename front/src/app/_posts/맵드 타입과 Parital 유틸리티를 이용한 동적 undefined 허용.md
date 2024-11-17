---
title: 'Mapped Type과 Partial 유틸리티를 이용한 undefined 값 동적 허용'
date: '2024-03-09'
description: 'undefined 값을 동적으로 허용해주자'
thumbnail: ''
---

이번 점심 뭐먹지 미션은 자바스크립트가 아닌 타입스크립트를 사용하는 방식이었다.

### - 음식점에 관련된 타입

```javascript
export interface Irestaurant {
  category: Icategory;
  name: string;
  distance: Idistance;
  description?: string;
  link?: string;
}
```

카테고리, 음식점이름, 거리는 필수 값이지만, 설명과 링크는 `undefined`를 허용해준다.

이 음식점 관련 된 값들을 `RestaurantRestaurantStateStore`라는 클래스에서 전역으로 관리해주도록 했다.

하지만 문제는 초기에 해당 state의 값은 입력을 받기 전이어서 모두 `undefined`를 보장해주어야 했는데 처음에는 `IrestaurantField` 라는 undefined를 허용해주는 타입을 만들어서 대응해주었다.

```javascript
export interface IrestaurantField {
  category?: Icategory;
  name?: string;
  distance?: Idistance;
  description?: string;
  link?: string;
}
```

만들면서도 불만족스러운 부분이었다.

해당 속성에 전부 `undefined`를 허용해주기 위해서 새로운 타입을 지정한다는것 자체가 비용이 큰 행위라고 생각했다.

감사하게도 바로 다음날 `Mapped Type`에 대해서 공부하게 됐고, 이를 적용했다.

### - 1번

```javascript
type RestaurantField = {
  [K in keyof Irestaurant]?: Irestaurant[K];
};

const restaurantField: RestaurantField = {
  category: undefined,
  name: undefined,
};
```

### - 2번

```javascript
type MappedType<T> = {
  [K in keyof T]?: T[K];
};

const restaurantField: MappedType<Irestaurant> = {
  category: undefined,
  name: undefined,
};
```

`MappedType`을 사용하기 위해선 제네릭 타입 매개변수 T를 명시해주어야한다.

또한 `keyof 타입 연산자`, `인덱스 접근 타입`에 대해서 이해하고 있어야 한다.

### - keyof 타입 연산자.

`keyof T`는 `T`의 모든 키의 유니언 타입을 생성하는 역할을 한다.

만약 위의 예시라면 `keyof Irestaurant`이 되는것이니 타입은 `category | name | distance | description | link` 가 된다.

### - 인덱스 접근 타입 (Indexed Access Types)

`T[K]` 같은 경우, T 안에서 K라는 값의 키의 타입을 가져온다.

만약에 위의 예시를 들자면 `Irestaurant['name']` 은 string이 된다.

하지만 여기에선 옵셔널 체이닝을 추가해줌으로써 `undefined` 값들도 허용해주었다.

맵드 타입을 사용한다면 크게 3가지의 장점을 누릴 수 있다.

### 1. 재사용성

기존 타입에서 여러 가지 변형된 타입을 만들어야 할 때, 매번 새로운 타입을 직접 정의해야한다.

맵드 타입을 사용하면 기존 타입을 재사용하여 다양한 변형 타입을 쉽게 생성할 수 있다.

### 2. 유지 보수

타입의 구조가 변경될 때, 모든 관련 타입을 일일이 수정해야 한다.

위로 예로 들면, `Irestaurant` 타입이 변경되면 저 필드 타입 또한 전부 다 수정해주어야한다.

하지만 맵드 타입을 사용하면, 기본이 되는 타입만 수정하면 되므로 유지 보수가 더 편리하다.

### 3. 복잡한 타입 조작

선택적 속성, 읽기 전용 속성 등을 넘어서 타입의 속성을 좀 더 복잡하게 조작해야 하는 경우(예: 특정 속성만 추출하거나 제외, 속성의 타입 변경 등), 맵드 타입을 사용하는 것이 더 적합하다.

---

## - Partial 유틸리티 타입

`Partial<T>` 유틸리티 타입을 사용하면 T의 모든 속성을 선택적으로 만들 수 있다.

기본적으로 `Partial` 타입은 어떠한 `T`의 모든 속성을 선택적으로 만드는 유틸리티이다.

이는 주어진 타입의 모든 속성에 `?`가 추가되어서 해당 속성들이 존재하지 않아도 되거나 `undefined`의 값을 허용해줄수 있다.

```typescript
const restaurantField: Partial<IRestaurant> = {
  category: undefined,
  name: undefined,
  distance: undefined,
  description: undefined,
};

const restaurantField: Partial<IRestaurant> = {};
```

`Mapped Type`과 `Partial`을 사용하면 아예 빈 객체로 초기화를 해주어도 무방하다.

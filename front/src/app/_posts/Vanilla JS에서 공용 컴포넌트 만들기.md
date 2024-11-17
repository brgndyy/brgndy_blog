---
title: 'Object.assign()을 활용하여 JS 공용 컴포넌트 만들기'
date: '2024-03-14'
description: 'JS에서 공용 컴포넌트를 만드는법에 관하여'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1710467651082-Object.assign-JS-.png'
---

이번 점심 뭐먹지 미션에서의 주요한 키워드는 `재사용성` 이었다.

미션을 제출했음에도 구현해놓은 컴포넌트들이 결국 재사용성이 가능한가? 에 대한 의문점을 가지고 있었고, 리뷰어분의 피드백 또한 마찬가지였다.

그래서 리팩토링 과정에서 `Object.assign()`을 이용하여 재사용성 가능한 컴포넌트들을 한번 만들어보았다.

에전에 토스의 라이브러리인 `useFunnel`의 내부 코드에서 `Object.assign()` 을 통해서 컴포넌트를 생성해주는 코드를 본적이 있다.

```typescript
  const FunnelComponent = useMemo(
    () =>
      Object.assign(
        function RouteFunnel(props: RouteFunnelProps<Steps>) {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const step = useQueryParam<Steps[number]>(stepQueryKey) ?? options?.initialStep;

          assert(
            step != null,
            `표시할 스텝을 ${stepQueryKey} 쿼리 파라미터에 지정해주세요. 쿼리 파라미터가 없을 때 초기 스텝을 렌더하려면 useFunnel의 두 번째 파라미터 options에 initialStep을 지정해주세요.`
          );

          return <Funnel<Steps> steps={steps} step={step} {...props} />;
        },
        {
          Step,
        }
      ),
    []
  );
```

지금도 마찬가지이지만, 당시에 내부 코드를 전부 이해하진 못하더라도 `Object.assign()`을 통해 속성값을 넘겨주어서 새로운 컴포넌트를 생성해주는구나 정도만 이해하고 넘어갔었다.

이번에 미션에서 사용된 컴포넌트들 또한 이를 활용해 만들어줄수 있었다.

그 전에 먼저 `Object.assign()` 함수의 용도에 대해서 알아보아야한다.

## - Object.assign() 이란 ??

`Object.assign()`은 기본적으로 객체간의 속성을 복사할때 사용된다.

```javascript
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// Expected output: Object { a: 1, b: 4, c: 5 }

console.log(source);
// Expected output: Object { b: 4, c: 5 }

console.log(returnedTarget === target);
// Expected output: true
```

위처럼 `assign`을 통해 두 객체를 인자로 넣어주었을때, `두번째 인자로 넣어준 값들이 첫번째 인자로 얕은 복사` 된다.

즉 위의 코드에서 `target` 객체와 `source` 객체에서 중복된 값이 있다면, 그 값을 덮어 씌워서 `target`값이 업데이트 된다.

[MDN 공식문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

---

# 기본적인 공용 컴포넌트 만들기

만약 `Button` 태그에 대한 공용 컴포넌트들을 만들어본다고 가정하자.

```typescript
function Button({ type = 'button', className, text }: ButtonComponentProps) {
  const button = Object.assign(document.createElement('button'), {
    type,
    className,
    textContent: text,
  });

  return button;
}
```

해당 `Button` 컴포넌트를 생성해주는 함수를 하나 만들어서 해당 함수내에서 `createElement`를 통해 필요한 태그를 생성해준다.

그 후 인자로 받은 값들을 생성한 태그의 속성 값에 넣어주면 된다.

## - 사용하는곳

```typescript
const submitButton = Button({
  type: 'submit',
  className: 'submit-button',
  text: '제출하기',
});
```

그 후에 저 해당 버튼 함수를 호출한 곳에서 해당 버튼에 대해서 이벤트 핸들러를 지정해준다면, 저 `Button` 컴포넌트는 UI 상에서 재사용한 컴포넌트가 된다.

> 해당 요소에 대한 이벤트 핸들러 또한 인자로 넘겨줘서 바인딩을 해줄수 있다.
> 하지만 본인은 UI 상 렌더링 되는 부분과 이벤트 핸들러는 분리를 해놓는게 더 낫다고 판단했다.

이런 식으로 모든 태그들에 대해서 재사용 가능한 컴포넌트들을 만들어줄 수 있다.

하지만 `select` 태그는 안에 `option`태그 또한 생성이 되어야 하는 부분이라서 더 까다로웠다.

---

# 공용 셀렉트 컴포넌트 만들기

이번 미션에서 재사용성 키워드에 가장 부합한 태그는 `Select`가 아닐까 생각한다.

![](https://dp71rnme1p14w.cloudfront.net/compressed_1710048931607--2024-03-10-2.35.29.png)

![](https://dp71rnme1p14w.cloudfront.net/compressed_1710048944306--2024-03-10-2.35.41.png)

위 사진들만 보더라도 `Select` 태그가 메인창, 모달창에서 굉장히 많이 사용되는 것을 확인할 수 있다.

그렇다면 이 `Select` 태그를 어떻게 재사용성 높은 공용 컴포넌트로 만들어줄수 있을까?

## - Select 컴포넌트 생성 함수

```typescript
function Select({
  id,
  name,
  className,
  options,
  defaultValue,
  required,
}: SelectComponentPropsType) {
  const select = createSelectElement({ id, name, className, required });

  createOptionElements({ select, options, defaultValue });

  return select;
}

export default Select;
```

기본적으로 `Select` 컴포넌트를 생성해주는 함수에서 `SelectComponentPropsType` 라는 타입에 맞는 값들을 가져온다.

이는 HTML 요소로 렌더링 될때 사용될 옵션값들이다.

## - createSelectElement

```typescript
const createSelectElement = ({
  id,
  name,
  className,
  required,
}: Partial<SelectComponentPropsType>) =>
  Object.assign(document.createElement('select'), {
    id,
    name,
    className,
    required,
  });
```

위 함수는 `createElement`메서드를 통해 `select` 태그를 생성해준다.

이 생성된 HTML 요소 또한 DOM 요소로 파싱되므로 자바스크립트에서 객체로 취급 된다.

그렇기 때문에 인자로 받은 `id`, `name,` `className`, `required` 값들이 select 태그 안에 속성으로 설정 된다.

```typescript
const createOptionElements = ({ select, options, defaultValue }: OptionElementPropsType) => {
  options.forEach(({ value, text }) =>
    select.add(
      Object.assign(new Option(text, value), {
        selected: value === defaultValue,
      }),
    ),
  );
};
```

`select` 태그 생성을 마친 후에 해당 태그 안에 있는 `option` 태그 값들을 생성해준다.

이 `options`가 반복문을 돌면서 `text(UI 상에서 보일 텍스트)`와 `value(상태로 관리해줄 값)` 2개의 인자를 통해 `select.add()` 메서드를 통해서 옵션태그를 만들어 준다.

add 메서드는 `HTMLSelectElement`에서 사용할수 있는 option 태그 추가 함수이다.

[MDN 링크](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/add)

이 또한 `Object.assign()`을 통해서 `option` 태그를 만들어주는데, 여기선 `new Option()`이라는 option 태그 생성자를 이용한다.

[new Option()에 대한 MDN 링크](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/Option)

```typescript
const selectComponent = Select({
  id: '태그 id',
  name: '태그 name',
  className: '태그 className',
  options: '추가 하고싶은 option 태그들',
  required: '해당 select 태그에 대한 require 속성',
});
```

이제 사용하고 싶은 곳에서 해당 select 태그에 맞는 값을 외부에서 주입해준다면, 재사용성 가능한 `select` 태그를 만들 수 있다.

---

> Object.assign()이 아니라, 그냥 컴포넌트 내에서 if문을 통해서 바로 속성을 할당해주어도 된다. 하지만 해당 키워드를 알아둔다면 후에 리액트에서도 활용해볼수 있음직 하기에 Object.assign()을 활용 해보았다.

# - 이러한 구현 방식을 채택했을때의 단점

일단 어떠한 JS 프로젝트에서도 재사용 가능한 컴포넌트들이 만들어지긴 했지만, 이러한 방식에는 단점 또한 존재한다고 생각한다.

## 1. 컴포넌트를 활용하기 위한 부가적인 비용이 많이 든다.

일단 해당 컴포넌트에 `props`로 주입해주기 위한 데이터 파일들을 만들어주어야한다.

그래서 본인은 각 컴포넌트 폴더 안에 `componentsData`라는 내부 폴더를 만들어주었고, 해당 안에서 props값들을 데이터 취급해서 관리해주었다.

하지만 컴포넌트마다 부가적인 파일을 하나씩 더 만들어주어야 하는 것이므로 비용적인 부분에서 아쉽다.

또한 미션내에서 함수 10줄 라인 제한 조건이 있었기에, 이 조건을 만족하기 위해선 또 컴포넌트를 리턴해주는 중간 레이어 함수를 하나 더 생성했어야했다.

```javascript
const generateSelectComponent = (selectOptionData: SelectElementDataType) => {
  const { TAG_ID, TAG_NAME, TAG_CLASS_NAME, UI_OPTIONS, TAG_REQUIRED } = selectOptionData;
  return Select({
    id: TAG_ID,
    name: TAG_NAME ?? '',
    className: TAG_CLASS_NAME ?? '',
    options: UI_OPTIONS,
    required: TAG_REQUIRED,
  });
};

export default generateSelectComponent;
```

하지만 본인은 함수 10줄 라인 제한 조건이 생긴 이유는 단일 책임 원칙 때문에 생겨났다고 판단했는데, 단순히 함수 라인 10줄이 넘어간다고 해서 단순히 함수 라인을 줄이기 위해 중간 레이어 함수를 더 두는것이 옳은가? 에 대해서 의구심이 들었다.

![](https://dp71rnme1p14w.cloudfront.net/compressed_1710374905205--2024-03-14-9.08.21.png)

## 2. 각 하나하나의 요소들을 전부 컴포넌트로 만들어주어야한다.

`재사용성이 높은 컴포넌트` 라는 키워드를 충족하기 위해서 모든 태그들을 거의 공용 컴포넌트들로 만들어주었다.

이렇게 하다보니, 하나의 아이템을 만들때 해당 아이템 안의 모든 태그들을 전부 공용 컴포넌트들을 통해 만들어 주었다.

결국 `innerHTML`을 통해 태그 템플릿 자체를 주입해주는 방법보다, 시간적인 비용이 많이 들었다.

![](https://dp71rnme1p14w.cloudfront.net/compressed_1710375106150--2024-03-14-9.11.38.png)

하지만 리뷰어분께서는 코드 구조의 일관성만 보장된다면 유지보수와 재사용성 관점에서 괜찮아 보인다고 말씀을 해주셨다.

본인도 시간을 들여서 만들고보니, 수정사항이 생겼을때나 오류가 발생했을때 대응하기에 더 나은 구조인것 같다고 생각이 된다.

실제로 step2에 돌입하면서 새로운 기능들을 추가할때, 변동 사항이 그렇게 크지가 않은듯하다.

---

기능을 구현할때 무조건적인 정답은 당연히 없다.

하지만 이번 미션의 키워드가 `재사용성` 이었기때문에 이를 충족하기 위해서 한번 컴포넌트들을 최대한 잘게 분리해보았다는거에 의의를 두고 싶다.

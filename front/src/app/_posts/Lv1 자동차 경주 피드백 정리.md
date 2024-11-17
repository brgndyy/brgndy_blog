---
title: 'Lv1 자동차 경주 수업중 공통 피드백 정리'
date: '2024-02-25'
description: 'Lv1 자동차 경주 피드백을 정리해본다.'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1708900522259-Lv1-.png'
---

## 1주차 미션: 자동차 경주 게임

### - 구현하기 전 기능 목록을 작성한다.

정상적으로 동작하는 시나리오 외에도, 예외 상황에 대해서도 기능 목록에 정리한다.

주어진 요구 사항에 명시적으로 드러나지 않았지만 고려해야 하는 기능 목록이 있을 지 고민해본다.

이름에 빈 문자열이 들어온다면? 최소 글자 수는? 공백은? 한글/영어/숫자/기호 모두 가능한가?

잘못 입력한 상태를 어떻게 보여주지?

단, 시작할 때 모든 기능 목록을 완벽하게 정리해야 한다는 부담을 가지기보다 기능을 구현하면서 문서를 계속 업데이트한다.

## 🎯 컨벤션

### - 구현 순서도 컨벤션

- 코드를 읽는 사람이 예측 가능한 구조에서 코드를 파악할 수 있도록, 상수, 클래스 변수, 인스턴스 변수, 생성자, 메서드 순으로 작성한다.

### - 개행, 띄어쓰기도 컨벤션

- 함수(메서드) 이름 뒤의 띄어쓰기, 파라미터에서의 띄어쓰기, 각 블록의 개행 등도 모두 컨벤션에 해당한다.

- 가독성을 높이기 위해 규칙을 정한 후 코드 베이스 전체에서 일관된 스타일을 유지한다.

### - import 문 순서도 컨벤션

- 예측 가능하게 코드를 읽을 수 있도록 import 문을 일관된 순서로 정렬한다.

### - 일관성 지키기

컨벤션은 결국 코드의 일관성을 지키기 위한 장치이다.

상수 네이밍, 함수/변수 네이밍, 구현하는 방식 등에서 일관성을 유지할 수 있도록 한다.

일관성이 잘 지켜져있다면 개선할 때에도 일관되게 개선이 가능하다.

`lint`와 `prettier`를 활용한다.

해당 코드를 확인하는 사람들이 모두 같은 규칙을 공유할 수 있도록 설정 파일을 만들고 관리한다.

각 컨벤션 규칙에 대해 스스로, 페어와 함께 고민해본다.

### - EOL(End Of Line)

최종 제출하는 코드에서 EOL을 확인한다.

환경에 따라 의도한 바와 다르게 개행 문자 처리가 되지 않도록 EOL 설정을 확인한다.

## 🎯 읽기 좋은 코드

### - 이름을 통해 의도를 드러낸다.

> 좋은 프로그래머는 사람이 이해할 수 있는 코드를 짠다. - <리팩터링(Refactoring>

### - 축약하지 않는다.

- 변수, 함수 등 이름을 지을 때는 축약하지 않는다. 의도를 드러낼 수 있다면 이름이 길어져도 괜찮다.

- 조금 길더라도 명확한 이름이 축약해서 짧지만 조금 모호한 이름보다 파악하기 쉽다.

- 너무 범용적인 용어를 사용하지 않는다.

- 너무 범용적인 용어, 여러 가지를 포괄할 수 있는 용어를 사용하면 의도가 구체적으로 드러나지 않을 수 있다.
  ex) -Data, -Info, -Manager, 그냥 'Model'

- 해당 코드 내부를 보지 않고도 어떤 정보를 담고 있는지, 어떻게 동작하는지 예측할 수 있을까?

  이름은 실제 동작과 일치해야 한다.

  함수의 이름은 해당 함수가 하고 있는 일 모두를 표현해야 한다.

  그렇지 않는다면 함수를 사용하는 입장에서 예상하지 못한 문제가 발생할 수 있다.

  이름에서 예측할 수 있는 반환값을 돌려주는 지도 확인해 본다.

```javascript
// 예를 들어, is- / should- / can- 같은 네이밍은 boolean값을 반환하기를 기대하게 된다.
// 이러한 이름의 함수가 반환값을 주지 않거나, 검증 이외의 동작을 함께 할 경우 기대와 다르게 동작할 수 있다.
isValidCarName() {}
```

값을 하드 코딩하지 않는다.

문자열, 숫자 등의 값을 하드 코딩하지 않는다. 상수를 만들고 이름을 부여해 이 변수의 역할이 무엇인지 의도를 드러낸다.

자동차 경주 게임에서 자동차의 이름 길이, 이동/정지 기준인 4, Random 생성 기준이라 할 수 있는 10, 에러 메시지와 같이 의미있게 사용하는 값에는 이름을 붙여서 의도를 드러낸다.

```javascript
isValidName(name) {
return name.length >= 1 && name.length <= 5;
}

// vs
isValidName(name) {
return name.length >= MIN_CAR_NAME_LENGTH && name.length <= MAX_CAR_NAME_LENGTH;
}

```

### - 공백 라인을 의미 있게 사용한다.

공백 라인을 의미 있게 사용하면 가독성을 높일 수 있다.

코드도 글이기 때문에, 일반적인 글에서 문단을 나누는 것과 동일하게 생각해본다.

다만 (당연히) 과도한 공백은 오히려 의문을 줄 수 있으므로 문맥에 따라 필요할 때 사용한다.

### - 의미 없는 주석을 달지 않는다.

변수 이름, 함수(메서드) 이름을 통해 어떤 의도인지가 드러난다면 굳이 주석을 달지 않는다.

모든 변수와 함수에 주석을 달기보다 가능하면 이름을 통해 의도를 드러낸다.

코드로 의도를 드러내기 힘든 경우에는 주석을 활용한다.

### - 불필요하게 남아있는 주석이 있지 않은지 확인한다.

개발 과정에서의 console.log, 사용하지 않는 import문 주석, 이미 완료한 todo 등 최종 코드에 반영되지 않아야 하는 주석이 남아있지 않도록 한다.

### - 함수가 한 가지 기능만 담당하게 한다.

하나의 함수에서 하나의 일만 책임지게 한다.

함수 길이가 길어진다면, 여러 일을 같이 하려고 하는 경우일 가능성이 높다.

예를 들어, 검증하기 / 검증 결과에 따라 행동하기 는 각각 별개의 일. 아래 코드는 길이가 짧더라도 여러 가지 일을 하고 있어 분리가 필요하다.

```javascript
isValidLength(name) {
if (name.length <= 5 && name.length >= 1) {
return true;
}

throw new Error("자동차 이름은 1자 이상 5자 이하로 입력해주세요!");
}
```

isValid- 라는 이름을 본다면, true/false 여부를 판단하는 일을 할 것이라고 짐작할 수 있다.

이렇게 기대한 상황에서 Error를 던지는 일이 이 안에서 일어나는 건 예측하지 못한 동작, 기대한 일에 더해 다른 일을 추가로 하는 함수가 된다.

또한, 반환값을 별도로 명시할 수 없는 JS의 특성상 반환값의 타입도 경우에 따라 다르다.

각각은 별개의 함수에서 이루어지도록 분리한다.

```javascript
isValidLength(name) {
return name.length <= 5 && name.length >= 1;
}

validateName(name) {
if (!isValidLength(name)) {
throw new Error("자동차 이름은 1자 이상 5자 이하로 입력해주세요!");
}
}
```

### - 함수 인자의 수를 줄인다.

함수 인자의 수는 3개 미만으로 유지한다.

그 이상이 필요하다면 객체로 묶는 것을 고려해본다.

객체로 묶을 수 없는, 성격이 다른 인자가 3개 이상이라면 위에서와 마찬가지로 함수가 한 가지보다 많은 일을 하고 있다는 신호일 수 있다.

### - 함수의 depth를 줄이는 방법을 고민한다.

- depth가 깊어질수록 가독성이 떨어지고 이해하기 어려운 코드가 된다.

### - early return

이 형태로 작성할 경우, 불필요한 else 구문을 제거할 수 있다.

선호도 차이가 있을 수 있지만 예외 케이스를 함수 상단에서 먼저 정의함으로써 예외 케이스에 대해 파악하기 쉽다는 장점도 있다.

```javascript
moveForward() {
if (!canMove()) {
return;
}

    this.position += 1;

}

createCars(names) {
if (isValid(names)) {
this.cars = names.map(name => new Car(name))
} else {

    }

}
```

### - boolean 값만 리턴해주는 함수라면 조건문 없이 리턴하기

```javascript
const isValidLength = (name) => {
  if (name.length > 5) {
    return false;
  }

  return true;
};

// =>
const isValidLength = (name) => name.length <= 5;
```

### - 함수 추출하기

마찬가지로, 여러 일을 하기 위해 depth가 깊어지고 있다면 함수로 묶어 추출한다.

### - 반복문보다는 Array 내장 메서드 사용하기

일반적인 반복문에는 인덱스 카운팅할 변수, 조건, 인덱스를 어떻게 올릴지 까지 직접 입력하게 되어 있어 사람이 실수하기 쉬운 요소들이 많다.

아래와 같은 내장 메서드들이 어떤 역할을 하는 지 알아보자. 기존의 for문을 어떻게 바꿀 수 있을까?

forEach / map / join / reduce / some / every / includes / find / filter
[연습용 codesandbox](https://codesandbox.io/s/js-naejang-meseodeu-hagseubhagi-moxy3?file=/src/__test__/array.test.js)

구현하려는 기능이 내장 메서드를 사용해서 해결할 수 있는지 확인해본다.

내장 메서드로 해결할 수 없는 경우에만 for 문을 사용한다.

### - 명령형보다 선언형으로 작성한다.

선언형 프로그래밍은 결과를 얻기 위한 과정을 상세히 명시하는 대신, 원하는 결과를 선언한다.

절차 반복문을 사용하기보다는 배열 내장 메서드를 사용하는 것 역시 원하는 결과를 얻기 위함이다.

```javascript
createCars(carNames) {
    let cars = [];

    for (let i = 0; i < carNames.length; i++) {
        cars.push(new Car(name));
    }

    return cars;
}

// -> map으로 바꾼다면
createCars(carNames) {
    return carNames.map((name) => new Car(name));
}
```

```javascript
isValidLengths(names) {
    for (let i = 0; i < names.length; i++) {
        if (names[i].length > 5) {
            return true;
        }
    }

    return false;
}

// -> every로 바꾼다면
isValidLengths(names) {
    return names.every((name) => name.length <= 5);
}
```

```javascript
convertArrayToString(array) {
  let string = '';
  array.forEach((item, index) => {
    if (index !== 0) {
      string += ',';
    }
    string += item;
  });
  return string;
}

const winners = ["준", "크론", "공원"];
const gameResult = convertArrayToString(winners); // 준,크론,공원

// -> join으로 바꾼다면
const winners = ["준", "크론", "공원"];
const gameResult = winners.join(","); // 준,크론,공원
```

마찬가지 방식으로 우승자를 구하는 로직을 아래와 같이 더 간결하게 작성할 수 있다.

```javascript
const determineWinners = (cars) => {
  const maxPosition = Math.max(...cars.map((car) => car.position)); // 전개 연산자에 대해 알아보세요
  const winners = cars.filter((car) => car.position === maxPosition).map((car) => car.name);

  return winners;
};
```

### - 가능한 const로 개발하기

가능한 한 let 대신 const를 사용하여, 코드의 변경 가능성을 최소화한다.

const 사용은 코드의 안정성을 높이고, 함수 분리나 선언적인 프로그래밍 스타일로의 전환을 유도한다.

let 변수를 사용하고 수정하는 작업들은 대체로 명령형 방식일 확률이 높다.

let을 const로 바꿀 수 있도록 고민해 본다.

이렇게 바꾸려고 하다보면 높은 확률로 함수를 분리하게 되고 명령형 방식으로 되어있는 코드를 대체할 방법을 고민하게 된다.

### - 테스트를 위한 코드는 프로덕션 코드에서 분리되어야 한다

테스트를 통과하기 위해 프로덕션 코드를 변경하거나 테스트에서만 사용되는 로직을 만들지 않는다.

> 테스트를 위해 # prefix를 바꾸는 경우
> 테스트 코드에서만 사용되는 메서드

> 테스트 쓰기가 어려워요! 테스트 때문에 구현 코드를 바꿔야 하나요?

일단, 테스트 코드 자체가 아직 낯설기 때문인데 기본 문법과 API들에 익숙해지는 것을 먼저 목표로 삼는다.

기본적인 사용 자체에 익숙해졌는데도 어렵다면, 테스트 코드를 쓰기 위해 억지로 프로덕션 코드를 바꿔야 한다면, 하나의 함수나 객체가 너무 많은 일을 하고 있어 리팩터링이 필요하거나 구조의 변경이 필요하다.

혹은 위에서 살펴본 Random같은 요소때문에 테스트하기 어려운 경우에 해당할 수도 있다. 이 경우에는 최대한 단위 테스트 가능한 영역을 분리해내고, 그 외에는 테스트를 하지 않는다.

## - 추가적으로 공부해야할 부분

1.  함수 선언 방식의 이해
    함수 선언문과 함수 표현식의 차이점은 무엇일까?

2.  클래스, 함수 그리고 객체
    어떤 경우에 class를 사용하고, 어떤 경우에 일반 객체를 사용할까?
    class와 함수의 차이는 무엇일까?

3.  비동기 처리의 다양한 접근
    비동기 입력을 처리할 때 callback, promise, async/await 중 어떤 것을 활용했고 왜 선택했는지?
    비동기 코드의 에러 처리 방법은 어떻게 다를까?

4.  모듈 시스템의 이해
    require/module.exports와 import/export 의 차이점은 무엇인가?

5.  명령형 VS 선언형 프로그래밍
    명령형 프로그래밍과 선언형 프로그래밍의 핵심적인 차이는 무엇인가? 각각의 접근 방식이 주는 장점과 단점은 무엇인가?
    실제 개발 시, 어떤 상황에서 명령형 접근 방식이 유리하고, 언제 선언형 접근 방식을 선택하는 것이 좋을까? 구체적인 예시를 들어 설명해 보자.

6.  Git 사용법

- 다른 사람의 레포지토리에서 내 로컬 환경으로 소스코드 가져오기
- `git merge` 와 `git fetch`, `git rebase`, `git remote`등 용어 정리

---

## - 리뷰어께 받은 피드백 정리

1.  상수 객체 안에 들어가는 key 값 또한 카멜케이스나 upper_case를 사용하자.

```javascript
const ERROR_MESSAGE = Object.freeze({
  HAVE_DUPLICATION: '중복된 이름이 존재합니다.',
  NOT_NUMBER: '숫자를 입력해주세요.',
});
```

가령 이런식으로

2.  주석과 해당 라인 사이에는 보통 개행없이 붙여서 작성한다.

```javascript
class AppError extends Error {
	/**
	 * @type {string}
	 */
	static PREFIX = '[ERROR]';
```

3.  함수명을 명확하게

함수가 길어지더라도 함수명은 명확하게 작성하는 것이 맞다.

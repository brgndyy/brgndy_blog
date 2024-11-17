---
title: 'script 태그에서의 async, defer'
date: '2024-03-03'
description: 'script 태그에서의 async, defer 속성에 관하여'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1709467548357-script-async-defer-.png'
---

이번 우테코 미션을 진행하면서 리뷰어께 정리해볼만한 키워드를 제공 받았다. (이 자리를 빌어 감사합니다. 🙇)

원래 얕게 키워드 정도만 알고 있던 부분인데, 이번 기회에 제대로 정리해두려고 한다.

---

기본적으로 브라우저는 HTML 파싱작업을 하다가, `script` 태그를 만나면 DOM 생성을 멈춘다.

그 후에 script 태그 안에 있는 내용을 실행 하고, 그 후에 다시 돔트리를 생성한다.

이러한 흐름은 여러가지 문제점을 일으킨다.

1. `script`태그 아래에 있는 DOM 요소에 접근할 수 없다.

```html
<body>
  <script>
    const button = document.getElementById('button');
    console.log('버튼 : ', button); // null 값 출력
  </script>
  <button id="button">버튼</button>
</body>
```

`button`태그는 script 태그 아래에 위치하므로, 해당 script에서는 버튼 값을 읽어오지 못한다.

2. 어느 연산 비용이 큰 스크립트가 존재한다면, 해당 스크립트 아래에 있는 요소들은 해당 연산을 마치기 전까지 렌더링 되지 않는다.

```html
<body>
  <p>상위 컨텐츠</p>

  <script>
    for (let i = 1; i < 10000; i++) {
      console.log(i);
    }
  </script>

  <p>하위 컨텐츠</p>
</body>
```

해당 코드를 살펴보면, 하위 컨텐츠가 바로 렌더링 되는 것이 아니라 조금의 딜레이가 있음을 확인해 볼수 있다.

또한 내부 script 뿐만 아니라, 외부 script 태그나 스타일 시트(link 태그를 사용한 외부 css)를 사용하게 되는 경우가 있다.

이렇게 웹페이지의 초기 로딩 및 렌더링을 방해하는 요소들을 `Rendering Blocking Resources`라고 한다.

이러한 경우에 아예 이러한 태그들을 맨 밑으로 위치해서 이러한 부작용들을 피할수야 있겠으나, 이는 완벽하지 않다.

HTML 문서의 용량이 엄청 크다면, 그리고 그 큰 문서를 다운 받은 후에 스크립트를 또 실행시키려면 엄청난 비용을 유발한다.

이러한 문제점을 해결하기 위해서 탄생하게 된 script 속성이 바로 `defer`와 `async`이다.

## - defer

script 태그에 `defer` 속성을 추가해주는 경우, 이는 해당 스크립트를 병렬적으로 처리한다.

즉 HTML 파싱을 하는 과정에서도 해당 script를 백그라운드에서 다운 받으며 이 스크립트의 실행은 페이지 구성이 끝난 후에 이루어진다.

```html
<body>
  <p>상위 컨텐츠</p>

  <script defer>
    for (let i = 1; i < 10000; i++) {
      console.log(i);
    }
  </script>

  <p>하위 컨텐츠</p>
</body>
```

위의 코드를 예로 든다면 먼저 html 태그들이 전부 파싱 된 후에 script 코드가 실행 되는 것이다.

이는 스크립트의 실행 순서를 순서대로 보장해준다. 만약

```html
<script src="1" defer>
<script src="2" defer>
<script src="3" defer>
```

이처럼 순서가 적혀져있다면, 위에서부터 차례대로 스크립트가 실행 된다.

또한 DOM이 완전 구성 된 후에 스크립트가 실행 되기 때문에 DOM 조작이 필요한 스크립트에 유용하다.

`type="module"` 선언이 `defer`를 내포하고 있는 것이므로 해당 선언들은 스크립트 태그 위치에 영향을 받지 않는다.

하지만 `DOMContentLoaded`가 존재한다면, 이는 `DOMContentLoaded` 이벤트 발생 전에 실행된다.

```html
<body>
  <p>...스크립트 앞 콘텐츠...</p>

  <script>
    document.addEventListener('DOMContentLoaded', () =>
      console.log('DOMContentLoaded 후 실행 되는 스크립트'),
    );
  </script>

  <script defer>
    for (let i = 1; i <= 1000; i++) {
      console.log('hi');
    }
  </script>

  <p>...스크립트 뒤 콘텐츠...</p>
</body>
```

![](https://dp71rnme1p14w.cloudfront.net/compressed_1709384282884--2024-03-02-9.58.00.png)

위의 코드를 살펴보면 `DOMContentLoaded` 핸들러가 작성된 스크립트가 먼저 선언이 됐음에도 불구하고 반복문 후에 콘솔 값이 출력 된 것을 확인할 수 있다.

## - async

`async` 속서잉 붙은 스크립트는 `defer`와 비슷하게 HTML 파싱과는 별개로 이루어지지만, 이는 순서가 보장되지 않는다는 특징이 있다.

또한 `defer`는 아예 HTML 파싱이 이루어지고 난후에 실행이 되지만, `async`는 파싱 작업 중에 script 태그를 만나게 된다면 해당 파싱작업은 중단 되고 스크립트가 실행 된다.

그리고 여러개의 `async`로 선언된 스크립트가 존재할경우, 이들의 실행 순서는 확실히 보장할 수없다.

이 `async`로 선언한 스크립트들은 방문자수나 광고 관련 스크립트처럼, 독립적으로 존재할수 있는 동작들에 사용될 수 있다.

```html
<script async src="https://google-analytics.com/analytics.js"></script>
```

실 예로 google-analytics 같은경우 이런식으로 `async`선언으로 스크립트를 불러온다.

그리고 `async`로 선언한 script 태그들은 `DOMContentLoaded`이벤트와 독립적으로 작동한다.

`async`로 선언한 스크립트들은 로드되는 대로 즉시 실행이 되기 때문에, 이 실행이 `DOMContentLoaded` 이벤트보다 먼저 일어날수도, 나중에 일어날수도 있다.

## - 대략적인 사진

![](https://dp71rnme1p14w.cloudfront.net/compressed_1709385110992--2024-03-02-10.11.47.png)

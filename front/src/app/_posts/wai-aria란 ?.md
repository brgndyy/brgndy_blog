---
title: 'Wai-aria 란?'
date: '2024-06-02'
description: 'wai-aria에 대해서'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1717335571196-wai-aria-.png'
---

`WAI-ARIA(Web Accessibility Initiative - Accessible Rich Internet Applications)`란 웹 콘텐츠 및 웹 애플리케이션의 접근성을 향상시키기 위한 기술 사양이다.

스크린 리더가 브라우저를 읽을 때, 각 요소가 어떤 의미로 어떻게 존재하는지 알수 있도록 할 수 있다.

> 여기서 스크린 리더란, 컴퓨터나 모바일 화면의 텍스트를 TTS를 통해 읽어주는 소프트웨어이다.

특히나 장애를 가진 사용자들이 웹 콘텐츠를 더 쉽게 접근할 수 있도록 돕기 위해서 고안 되었다.

만약에 시맨틱 태그나 wai-aria를 사용하지 않고, 본인만의 편의성을 위해서 코드를 작성한다면, 스크린 리더를 사용하는 사용자가 어플리케이션을 이용하기 어려울 것이다.

wai-aria는 또한 요즘 같이 동적으로 업데이트 되는 컨텐츠에 대해서, 스크린 리더가 잘 인식할 수 있도록 돕는 역할을 한다.

```js
<div role="alert" aria-live="assertive">
  새로운 알림!
</div>
```

또한 탭, 아코디언, 슬라이더와 같은 복잡한 UI 요소는 기본 HTML 태그만으로는 접근성을 보장하기 어렵다.

이런 경우에 wai-aria 역할과 속성을 사용하여 이러한 요소의 접근성을 높일 수 있다.

```js
<div role="tablist">
  <div role="tab" aria-selected="true">
    탭 1
  </div>
  <div role="tab">탭 2</div>
</div>
```

시멘틱 태그를 사용하는 것이 가장 좋지만, 시멘틱 태그를 사용하지 못하는 경우나, 추가적인 설명이 필요한 경우 wai-aria를 사용할 수 있다.

```js
<!-- 시맨틱 태그 사용 예시 -->
<button>클릭</button>

<!-- 시맨틱 태그를 사용할 수 없는 경우 -->
<div role="button" tabindex="0" aria-pressed="false">클릭</div>
```

또한 wai-aria를 사용할때, 키보드 접근성을 생각해야한다.

`tabindex`를 사용하여 키보드 포커스를 제어할 수 있다.

```js
<div role="button" tabindex="0">
  버튼
</div>
```

여기서 `tabindex`는 키보드 포커스 순서를 제어하는데에 사용 된다.

기본적으로 대화형 요소 (버튼, 인풋, a 태그 등)은 키보드로 접근할 수 있지만, 경우에 따라 사용자 정의 요소에도 포커스를 부여해야 할 때, `tabindex` 속성을 사용한다.

`tabindex=0`은 요소를 기본 탭 순서에 포함시킨다는 의미이다.

이 값은 요소가 문서의 자연스러운 탭 순서에 따라 포커스를 받을 수 있게 된다.

## - 주요 ARIA 속성

1. aria-hiddden

요소를 스크린 리더에서 숨긴다.

```js
<div aria-hidden="true">이 요소는 스크린 리더에서 숨겨집니다.</div>
```

2. aria-label

사용자에게 시각적으로 보이지 않는 라벨을 제공한다.

```js
<button aria-label="Submit Form">제출</button>
```

3. aria-labelledby

다른 요소에 의해 라벨링 된 요소를 연결한다.

```js
<h1 id="header">헤더</h1>
<section aria-labelledby="header">
  <p>헤더 밑에 컨텐츠 내용</p>
</section>
```

4. aria-describedby

다른 요소에 의해 설명 된 요소를 연결한다.

```js
<button aria-describedby="desc">더 보기</button>
<div id="desc">이 버튼은 더 많은 정보를 보여줍니다.</div>
```

5. aria-live

```js
<div aria-live="polite">새로운 알림이 있습니다!</div>
```

`aria-live` 속성의 목적은, 페이지가 변경 될 때, 사용자에게 해당 변경 사항을 실시간으로 알려준다.

`polite`와 `assertive`속성이 있는데, `polite`는 스크린 리더가 현재 읽고 있는 내용을 끝낸 후 다음 내용을 읽도록 한다.

즉 사용자 흐름을 방해하지 않으면서 새로운 정보를 제공하는 방식이다.

그와 반대로 `assertive`는 즉각적으로 해당 내용을 읽는다.

이런식으로 wai-aria는 웹 접근성을 향상 시킬수 있고, 조건에 관계 없이 모든 사용자가 어플리케이션을 효율적으로 이용할 수 있도록 한다.

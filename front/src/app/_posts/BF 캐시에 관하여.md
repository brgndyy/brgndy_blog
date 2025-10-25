---
title: 'BF 캐시에 관하여'
date: '2025-10-18'
description: ''
thumbnail: ''
---


## - 문제 상황

A와 B 퍼널이 존재하는 상황이다.
B 퍼널에서 스와이프를 통해 A 퍼널로 돌아올때 ios 다크모드에서 흰 화면이 깜빡이는 문제가 발생했다. (네비바 백버튼 클릭시에는 문제 없이 동작함)

이에 대한 문제를 해결하고 싶어서 이것저것 시도를 해보았지만 안되었고.. 다른 동료분을 통해 BF캐시라는 키워드를 알게 되었고 이를 통해 해결할 수 있었다.

![](https://velog.velcdn.com/images/brgndy/post/104298b3-0cc8-4582-97d3-36fd44b9cb9a/image.png)

## - BF 캐시란?

BF캐시는 Back/Forward Cache, 즉 뒤로가기나 앞으로 가기를 했을때의 캐시를 의미한다.

사용자가 뒤로가기나 앞으로 가기를 눌렀을때 이전 페이지를 다시 로드하지 않고, 렌더 트리, DOM, 자바스크립트 메모리 상태까지 그대로 메모리에 보관해두었다가 즉시 복원하는 기술이다.

그 덕분에 뒤로 가기를 눌렀을때 네트워크 요청 없이 바로 원복이 가능하다.

[참고 영상 링크](https://www.youtube.com/watch?v=cuPsdRckkF0)

> 위 영상은 크롬 안드로이드에서 발생하는거지만 보통 BF 캐시를 활용하면 영상과 같은 이점을 누릴 수 있다고 보면 된다.

BF 캐시를 사용한 상태에서 사용자가 뒤로가기를 누른다면 네트워크 요청 없이 해당 상태의 스냅샷을 복구한다.

`DOMContentLoaded`나 `load` 이벤트는 다시 발생하지 않는다.

대신 `pageshow` 이벤트의 event.persisted 상태가 true가 된다.

```js
window.addEventListener("pageshow", (event) => {
  // BF 캐시 작동
  if (event.persisted) {
    console.log("복원된 BFCache.");
  }
});
```


그럼 IOS 스와이프 제스처와 BF 캐시랑은 무슨 관계일까?

원인은 ios 스와이프 애니메이션이 진행 될때, CSS가 적용되기 전에 GPU 레이어가 먼저 그려지고, 그 사이에 잠깐의 깜빡임 문제가 발생하는 것이다.

가볍게 브라우저 렌더링 파이프라인 순서에 대해서 훑어보자면

1. DOM Tree 생성
2. CSSOM 트리 생성
3. 렌더트리 생성
4. 레이아웃 계산
5. 페인팅
6. 컴포지팅

의 순서대로 발생한다. (여기서 1~5번 단계는 CPU가 담당하고 6번 작업은 GPU가 처리)

GPU 레이어 교체(swap)는 6번 단계에서 일어나는데, 이는 DOM Tree를 바꾸는 것이 아니라 GPU 메모리에서 쓰이는 프레임 버퍼와 텍스쳐를 바꾼다.

```
// 1. 현재 페이지의 레이어
LayerTree* current = activeLayerTree; // page B

// 2. 새로운 페이지 복원
LayerTree* restore = restoreFromBFCache(pageA);

// 3. GPU 렌더러 교체 준비
gpuRenderer->detach(current->surfaces);
gpuRenderer->attach(restore->surfaces); // 여기서 swap

// 4. clear color 적용 (기본값 white, 이때 흰색 발생)
gpuRenderer->clear();

// 5. 새로운 frame paint
gpuRenderer->draw(restore->surfaces);
```


사용자가 B퍼널에서 스와이프를 통해 A퍼널을 다시 불러오려고 할때 4번에서 5번 단계로 넘어갈때에 있는 조금의 텀에서 위의 문제가 발생한다.

> 다크테마로 그럼 지정해놓으면 괜찮은거 아닌가?

위에서 말했다시피 다크로 돔의 테마 값을 지정하였다고 하더라도, 이는 CPU 메모리에만 적용되어있을뿐 GPU는 아직 값이 적용되기 전이기 때문에 GPU의 VRAM에 올라가지 않은 상태이다.

그렇기 때문에 다크테마를 지정해준다고해서 GPU 레이어에서의 swap 과정까지 관여할수는 없다.

> 스와이프 애니메이션을 유지해주면서 흰색 깜빡임이 발생하지 않도록 해줄수 있는 방법은 없을까?

지금 상황에서는 완벽하게 존재하지 않는거 같다.

히스토리를 찾아봐도 ios 일때 스와이프 애니메이션을 꺼주는 방법으로 해결한 것이 전부이다.

해결책은 한번 더 찾아봐야겠다.

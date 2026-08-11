---
title: 'top과 transform 비교를 통한 브라우저 렌더링 딥다이브'
date: '2026-08-10'
description: '같은 움직임을 top과 transform으로 구현하고, rAF callback 간격과 Chrome Trace의 Layout·Paint 작업을 나누어 관측했다.'
thumbnail: ''
---

브라우저 렌더링은 HTML과 CSS를 화면의 픽셀로 바꾸는 과정이다. 단순화하면 Style, Layout, Paint, Composite 순서로 이어진다. Style은 어떤 CSS 규칙을 적용할지 계산하고, Layout은 요소의 크기와 위치를 정한다. Paint는 그 결과를 그리기 명령으로 만들며, Composite는 준비된 레이어를 최종 화면에 합친다.

이 흐름을 공부하다 보면 `top`보다 `transform`으로 요소를 움직이라는 설명을 자주 만난다. `top`은 Layout과 Paint를 다시 일으킬 수 있지만 `transform`은 Composite 단계에서 처리될 가능성이 높다는 이유다. 설명 자체는 이해됐지만 한 가지가 궁금했다.

> 실제 화면에서 둘 다 부드럽다면 렌더링 비용도 같다고 봐도 될까?

이 질문을 확인하려고 같은 사각형을 같은 거리만큼 움직이는 테스트 페이지를 만들었다. 브라우저 안에서 확인할 수 있는 프레임 간격과 브라우저 내부의 Layout·Paint 작업을 따로 측정했다.

[Rendering Lab에서 직접 실행해 보기](https://rendering-lab-pi.vercel.app)

## 먼저 바꿀 변수를 하나로 제한했다

비교 실험에서 가장 먼저 할 일은 두 코드의 차이를 줄이는 것이다. 사각형의 크기, 시작점, 이동 거리, 실행 시간과 easing은 모두 같게 두었다.

```css
.moving-object {
  position: absolute;
  top: 76px;
  left: 50%;
  width: 118px;
  aspect-ratio: 1;
  transform: translateX(-50%);
  /* 배경색·글자색 등 시각 스타일 생략 */
}

.scene-panel.is-running .moving-object.is-top {
  animation: move-with-top 1.25s ease-in-out infinite alternate;
}

.scene-panel.is-running .moving-object.is-transform {
  animation: move-with-transform 1.25s ease-in-out infinite alternate;
}

@keyframes move-with-top {
  from { top: 76px; }
  to { top: 416px; }
}

@keyframes move-with-transform {
  from { transform: translate(-50%, 0); }
  to { transform: translate(-50%, 340px); }
}
```

두 사각형은 절대 좌표 기준으로 `76px`에서 `416px`까지 이동한다. 달라지는 것은 애니메이션에 쓰는 속성뿐이다.

처음에는 `transform` 쪽에 `will-change: transform`도 넣었다. 하지만 그러면 비교 대상이 `top`과 `transform`이 아니라 `top`과 `transform + will-change`가 된다. 브라우저가 레이어를 미리 준비하도록 주는 힌트까지 결과에 섞이기 때문이다. 최종 실험에서는 `will-change`를 제거했고, transform 실행 rule에 이 선언이 다시 추가되지 않는지 확인하는 테스트를 남겼다.

```js
it("does not add will-change to the transform animation rule", () => {
  const transformRule = css.match(
    /\.scene-panel\.is-running \.moving-object\.is-transform\s*\{([^}]*)\}/s,
  )?.[1];

  expect(transformRule).toBeDefined();
  expect(transformRule).not.toContain("will-change");
});
```

## 화면에서 관측할 수 있는 것

첫 번째 관측은 `requestAnimationFrame`, 줄여서 rAF로 진행했다. rAF는 다음 repaint 전에 브라우저가 등록한 callback을 호출하도록 요청하는 API다. callback 호출 빈도는 일반적으로 디스플레이 주사율을 따른다.

테스트 페이지는 10초 동안 rAF timestamp를 모은다.

```ts
export function collectFrameTimestamps(
  durationMs: number,
  options: FrameCollectorOptions = {},
): Promise<number[]> {
  const scheduleFrame = options.scheduleFrame ?? requestAnimationFrame;
  const cancelFrame = options.cancelFrame ?? cancelAnimationFrame;
  const { signal } = options;

  return new Promise((resolve, reject) => {
    const timestamps: number[] = [];
    let startedAt: number | null = null;
    let frameId: number | null = null;
    let settled = false;

    // ... abort와 cleanup 처리

    const collect = (timestamp: number) => {
      if (settled) return;
      startedAt ??= timestamp;
      timestamps.push(timestamp);

      if (timestamp - startedAt >= durationMs) {
        settled = true;
        cleanup();
        resolve(timestamps);
        return;
      }

      frameId = scheduleFrame(collect);
    };

    // ... 이미 취소된 실행 처리
    frameId = scheduleFrame(collect);
  });
}
```

인접 timestamp의 차이로 평균 프레임 간격과 p95를 계산했다. p95는 측정값의 95%가 이 값 이하였다는 뜻이다. 평균만으로 가려질 수 있는 느린 구간을 함께 보려는 지표다.

같은 시간에 `PerformanceObserver("longtask")`도 연결했다. Long Task는 UI thread를 50ms 이상 점유한 작업이다. 다만 Long Tasks API는 모든 주요 브라우저에서 지원되는 기능이 아니다. 그래서 미지원 환경이나 observer 생성 실패를 `0`으로 기록하지 않고 `null`로 남겼다. `0`은 관측했지만 없었다는 뜻이고, `null`은 관측하지 못했다는 뜻이기 때문이다.

여기에는 중요한 한계가 있다. rAF timestamp의 간격은 callback cadence를 보여줄 뿐, Paint가 끝난 시점이나 GPU 작업 시간을 직접 알려주지 않는다. 화면이 얼마나 일정한 간격으로 갱신될 기회를 얻었는지는 볼 수 있지만 브라우저가 그 사이에 무슨 일을 했는지는 이것만으로 알 수 없다.

## 브라우저 내부 작업은 별도 trace로 수집했다

Layout과 Paint를 보려고 Playwright에서 Chrome DevTools Protocol(CDP) trace를 수집했다. public 웹페이지의 일반 JavaScript가 자신의 CDP trace를 직접 시작하고 읽는 구조가 아니다. 자동 benchmark가 production 서버와 Chromium을 별도로 실행한다.

```js
async function runTraceMeasurement(context, scenario) {
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);

  await configureScenario(page, scenario);
  await cdp.send("Tracing.start", {
    categories: [
      "devtools.timeline",
      "disabled-by-default-devtools.timeline.frame",
      "blink.user_timing",
    ].join(","),
    transferMode: "ReturnAsStream",
  });

  await page.getByRole("button", { name: "10초 실험 시작", exact: true }).click();
  await page.getByRole("heading", { name: "관측 결과", exact: true }).waitFor({
    state: "visible",
    timeout: 15_000,
  });

  // ... Tracing.end 이후 stream을 읽고 Layout·Paint event를 집계
}
```

프레임 측정과 trace는 한 번에 실행하지 않았다. tracing 자체의 비용이 rAF 결과에 섞일 수 있어서다. 각 전략마다 먼저 웹 지표를 수집하고 페이지를 닫은 뒤, 새 페이지에서 trace pass를 실행했다.

```text
top web measurement
→ top CDP trace
→ transform web measurement
→ transform CDP trace
```

실행 조건은 benchmark script와 결과 JSON에 나눠 남겼다. production build와 10초 실행은 script가 정하고, JSON은 실제 관측 환경·viewport·반복 횟수와 각 run의 관측 시간을 보존한다.

```text
script: production build → 각 전략 10초 실행
JSON: Chromium 151.0.7922.34
JSON: viewport 1440 × 1000 · deviceScaleFactor 1
JSON: 반복 1회 · 각 run의 실제 관측 시간
```

trace에서는 `Layout`, `Paint`, `CompositeLayers` 가운데 완전한 duration event만 집계했다. 음수이거나 유한하지 않은 duration은 버렸다. `CompositeLayers` event는 이번 trace category에서 관측되지 않아 `0`이 아닌 `null`로 기록했다.

## 프레임 간격은 같고 내부 작업은 달랐다

`will-change`를 제거한 최종 자동 benchmark 결과다.

```text
지표                 top                 transform
평균 프레임 간격      16.67ms             16.67ms
p95 프레임 간격       18.0ms              17.8ms
추정 누락 프레임      0                    0
Long Task             0                    0
Layout                602회 / 46.47ms      2회 / 5.10ms
Paint                 1,183회 / 181.57ms   10회 / 1.53ms
```

웹 지표만 놓고 보면 두 방식의 rAF callback 간격은 비슷했다. 평균이 같고 p95 차이는 0.2ms였다. 다만 `추정 누락 프레임`은 각 간격마다 `max(0, round(interval / 16.67ms) - 1)`을 계산해 합산한 60fps 기준 추정치다. 실제 화면 표시나 frame presentation 실패를 센 수치가 아니며, `0`이라고 해서 deadline 충족을 증명하지는 않는다.

trace에서는 다른 모습이 나왔다. `top` 시나리오에서는 Layout 602회와 Paint 1,183회가, `transform` 시나리오에서는 Layout 2회와 Paint 10회가 집계됐다. 횟수로 비교하면 `top` 시나리오의 Layout은 약 301배, Paint는 약 118배 많았다. 누적 시간도 Layout은 약 9배, Paint는 약 119배 차이가 났다. 이 값에는 버튼 클릭과 결과 렌더링 등 trace 구간 안의 작업도 포함되므로 CSS 속성 하나의 순수 실행 시간으로 해석하지 않았다.

```text
top 변경
→ 요소의 기하학적 위치가 달라짐
→ 이번 trace에서 반복적인 Layout·Paint 관측

transform 변경
→ 기존 레이아웃 좌표는 유지
→ 이번 trace에서 Layout·Paint가 크게 감소
→ 합성 작업과 비용은 이번 category에서 미관측
```

여기서 `transform`이 언제나 더 높은 fps를 보장한다고 결론 내리면 안 된다. 이번 장면은 단순했고 rAF timestamp만으로 실제 화면 표시 deadline 충족 여부는 확인할 수 없다. 결과가 말해주는 것은 더 좁다.

> 비슷한 rAF callback 간격을 보인 이번 실행에서 `transform` 시나리오의 Layout·Paint 집계값이 훨씬 작았다.

차이는 장면이 복잡해졌을 때 의미가 커질 수 있다. 주변 요소가 많거나 다른 main-thread 작업이 겹치면 반복되는 Layout과 Paint가 프레임 예산을 잠식할 여지가 생긴다. 이번 실험은 그 가능성을 직접 재현한 것이 아니라, 같은 출력 뒤에 남은 작업량의 차이를 관측한 것이다.

## rAF와 trace는 서로 다른 질문에 답한다

처음에는 프레임 수치를 측정하면 어느 방식이 빠른지 바로 알 수 있을 거라고 생각했다. 실제로는 관측 도구마다 답하는 질문이 달랐다.

```text
rAF callback 간격
→ callback 호출 간격이 흔들렸는가?

Long Task
→ UI thread를 50ms 이상 연속 점유한 작업이 있었는가?

CDP trace
→ 그 장면에서 Layout과 Paint가 몇 번, 얼마나 오래 실행됐는가?
```

평균 rAF 간격이 같다는 사실과 Layout·Paint 집계값이 다르다는 사실은 모순이 아니다. 이번 실행에서는 callback 간격 차이가 드러나지 않았을 뿐이다. rAF만 봤다면 내부 작업의 차이는 보이지 않았고, trace만 봤다면 사용자가 실제로 끊김을 느꼈다고 과장하기 쉬웠을 것이다.

## 아직 일반화할 수 없는 이유

이번 benchmark는 한 장비, 한 Chromium 버전, 하나의 viewport에서 각 전략을 한 번씩 실행한 smoke observation이다. 통계적인 성능 비교가 아니다. 브라우저의 레이어 승격 판단도 구현과 장면에 따라 달라질 수 있다. `CompositeLayers: null`인 상태라 합성 비용 자체를 수치로 비교하지도 못했다.

다음 실험에서는 반복 횟수를 늘리고 CPU throttling, 더 복잡한 DOM, paint가 무거운 콘텐츠를 단계적으로 추가할 생각이다. 같은 조건에서 장면의 복잡도만 높였을 때 `top`의 추가 작업이 언제 실제 frame cadence 차이로 나타나는지 확인하려 한다.

이번 실험으로 얻은 결론은 단순하다. rAF callback 간격만으로는 브라우저가 적게 일했다고 말할 수 없다. 렌더링 성능을 설명하려면 callback timing과 내부 파이프라인을 나눠서 봐야 한다.

## 참고 자료

- [MDN: Window.requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
- [MDN: PerformanceLongTaskTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming)
- [Chrome for Developers: 런타임 성능 분석](https://developer.chrome.com/docs/devtools/performance/)
- [web.dev: 고성능 CSS 애니메이션을 만드는 방법](https://web.dev/articles/animations-guide?hl=ko)

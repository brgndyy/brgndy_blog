---
title: '간단한 sine 파형 소리 만들어보기'
date: '2025-02-02'
description: '초간단 sine 파형 소리'
thumbnail: ''
---

간단한 sine 파형의 소리를 만들어보자.
먼저 소리와 파형은 무엇일까?

소리는 결국 **공기의 진동** 이고, 파형은 이 **공기의 진동이 전달되는 방식을 시각적으로 나타낸 것**이다.
흔히 얘기하는 주파수(frequency)는 1초당 진동하는 횟수를 의미하고 이 단위가 헤르츠(Hz)이다.

우리가 매일 매순간 듣는 소리는 어떻게 소리가 될까?
피아노에서 '도'건반을 쳤다고 가정해보자.

1. 피아노의 해머가 현을 타격하고 이 현이 진동하며 주변 공기 분자들을 밀고 당긴다.
2. 보통 C4 건반은 1초에 261.63번 진동(261.63hz)하며, 주변 공기 분자들이 서로 부딪히며 압축과 팽창을 반복한다. (여기서 261.63hz 뿐만 아니라 배음이라고 하는 2배음, 3배음 등 N배음들과의 조합을 통해 피아노의 음색을 만들어낸다.)
3. 이러한 과정에서 파동 형태가 만들어지며 퍼져 나간다.
4. 이 파동이 고막으로 전달 되고, 달팽이관에서 주파수별로 다르게 내부의 특정 위치를 가장 강하게 진동시킨다.
5. 내부의 유모세포가 이 기계적 진동을 전기 신호로 변환하여 뇌로 전달시킨다.
6. 뇌에서는 음높이와 크기, 음색 등을 분석하고 '도'라고 인식한다.


정리해보자면 결국 소리라는 것은 공기의 진동이고, 이 진동의 형태를 시각화한 것이 파형이다. 

기본적으로 음악에는 크게 4가지의 파형 종류가 존재한다.

![](https://velog.velcdn.com/images/brgndy/post/217d01ec-d776-412f-b255-bdb0216bb68d/image.png)

각각의 파형마다 기본이 되는 소리가 다른데, 위 모양은 시간에 따른 진폭의 변화를 나타낸다. (X축은 시간, Y축은 진폭)
이 중에서도 사인파형은 가장 자연스러운 진동 형태이고 진폭이 부드럽게 증가했다가 감소하는 곡선 형태를 띄우고 있다. 또한 가장 기본이 되는 파형으로써 여러개의 사인파의 조합을 통해 다른 파형도 만들어낼 수 있다.
그리고 이 기본 파형들은 소리의 시작점이고 진동을 만들어내는 기본 장치로써 발진기, 즉 오실레이터(Oscillator) 역할을 한다.

### - 왜 파형은 4가지 종류일까? 파형 자체가 많을수록 다양한 음색을 만들어 낼 수 있을거 같은데?
> 결론부터 말하자면 이 4가지의 파형으로 대부분의 음색을 만들 수 있다.
위의 4가지 파형 말고도 Pulse, Noise, Super Saw 등 다양한 파형이 있는데 이러한 파형들도 기존의 파형들의 조합 + 변형일 뿐 아예 새로운 파형은 아니다. 또한 Square, Triangle, Sawtooth 도 결국 Sine 파형을 기본으로 하여 만들어졌다.

그럼 여기서 컴퓨터는 이 파형을 어떻게 소리로 만드는 것일까?
여기서 Web Audio API의 한 종류인 `AudioContext`를 활용하여 소리(진동)들을 디지털 신호로 변환한다.

### - 디지털과 아날로그

기본적으로 컴퓨터는 0과 1만 인식한다.
하지만 진폭은 0과 1로 이루어지지 않는다. 진폭은 기본적으로 아날로그이다.
여기서 아날로그와 신호의 대표적인 차이점을 이해해야한다.

아날로그는 어떤 양이나 데이터를 연속적으로 변환하는 물리량으로 변환한 것이고 디지털은 동일한 대상을 0과 1 이진수로 표현한다.

즉 아날로그는 곡선의 연속적인 형태이고 디지털은 0과 1이라는 숫자로 나타낸다.

![](https://velog.velcdn.com/images/brgndy/post/bec133da-3dc9-447c-8e32-be867fc8cd37/image.png)

대표적으로 아날로그 시계와 디지털 시계를 비유해볼 수 있다.

아날로그 시계는 시침, 분침이 흘러가는 모습을 직접 볼 수 있으며, 각 숫자 사이의 연속적인 시간 또한 가리킨다.
하지만 디지털 시계는 0과 1을 이용하여 시간이 가고 있음을 표현한다.
12시 30분 00초에서 12시 30분 1초로 흘러가는부분을 볼수야 있지만 그 안에서 0.2초 0.5223초 등 그 안에서의 무수한 값들을 볼 수 없다.

----

위처럼 audioContext를 활용하여 해당 진폭에 맞는 음을 디지털 신호로 변환해주어서 소리를 만드는 것이라 생각하면 된다. 
여기서 샘플 레이트라는 개념을 훑고 가보자.
`샘플레이트(Sample Rate)`는 소리를 디지털화 할때 1회당 샘플링하는 횟수를 의미한다.
즉 이미지로 따지면 해상도라고 생각하면 된다. 샘플레이트가 높을수록 더 음질이 좋아지지만 용량이 그만큼 커진다. (사진도 고화질일수록 용량이 높듯이)
현재 CD의 표준 샘플레이트는 44.1Khz이다.
즉, 1초 당 44,100번 소리를 측정하여 각각의 높낮이(진폭)를 기록한다.

```
시간(1/44100초)    진폭값
0                  0.0
1                  0.7
2                  1.0
3                  0.7
4                  0.0
5                 -0.7
... 등등
```

표로 나타내면 이러한 느낌인데, 소리가 재생되면 사운드카드가 이 숫자들을 받아서 진폭 값에 따라 스피커를 진동시켜서 실제 소리로 낸다.

한 노트에 각 장마다 그림을 그려놓고 빠르게 넘기면 각 그림들이 연속적으로 보이는 느낌이라고 비유해볼 수 있다.

그렇다면 이제 코드로 한번 직접 옮겨보자.

```tsx

  const audioCtxRef = useRef<AudioContext | null>(null);

// AudioContext 초기화
  const initAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    } else if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  }, []);
```

위가 아까 말한 AudioContext를 초기화하는 코드이다.
만약 ref에 값이 담겨져있지 않다면 AudioContext를 ref에 담아주여서 초기화 작업을 해준다.

여기서 suspended 체크를 하는 부분이 있는데, 사용자가 페이지에서 인터렉션이 있기 전에 자동 재생을 방지하는 브라우저 정책때문이다.
만약 페이지에 접속해서 아무것도 하지 않았는데 소리가 재생 되면 브라우저 정책을 위반하게 된다.
그래서 초기에 suspended 상태로 두고, 상호작용을 후에 resume 메서드를 실행시켜서 `running` 상태로 전환시켜서 소리를 재생시킨다.


```tsx

  const oscillatorsRef = useRef<Map<string, OscillatorNode>>(new Map());
  const gainNodesRef = useRef<Map<string, GainNode>>(new Map());
  //...

oscillator.type = "sine";
oscillator.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
gainNode.gain.setValueAtTime(0.2, audioCtxRef.current.currentTime);

oscillator.connect(gainNode);
gainNode.connect(audioCtxRef.current.destination); // 게인노드를 출력으로 연결

oscillator.start();
oscillatorsRef.current.set(key, oscillator);
gainNodesRef.current.set(key, gainNode);
```

여기서 오실레이터 관련된 ref와 음량을 조절하는 ref가 있다.
오실레이터는 위에서 말한 발진기의 역할이고 게인노드는 Web Audio API에서 볼륨을 제어하는 역할을 해준다.

오실레이터에 음을 삽입하고 그를 gainNode에 연결함으로써 음량이 결정되고 소리가 출력되도록 한다.

위의 코드에서 각각 ref에 `setValueAtTime` 메서드를 통해서 현재 재생할 음(Hz)과 audioContext 의 시간을 담아준다.

또 오디오 컨텍스트의 destination이 음량이 최종적으로 출력 될 위치를 나타낸다. (스피커나 헤드셋 등 출력 장치라고 생각하면 된다.)

이를 gainNode와 연결하여 최종적으로 출력하게 한다.


![](https://velog.velcdn.com/images/brgndy/post/6872f758-041f-42bf-bd25-3f9bf080d6fe/image.gif)

(소리가 나오지 않아서 아쉽지만 😭 기본적인 sine 파형의 소리가 나오고 있다.)

[구현한 코드 링크](https://github.com/brgndyy/sine-vst/tree/main/vst-practice)


----

마냥 음악을 만들땐 몰랐는데 직접 작은 사이즈로나마 구현해보면서 많은 부분을 공부해볼 수 있었다.
다음에는 로파이 필터를 한번 구현해보겠다.
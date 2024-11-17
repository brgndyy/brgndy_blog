---
title: 'WaveForm 라이브러리 컴포넌트 만들어보기'
date: '2024-04-14'
description: 'WaveForm 라이브러리 제작기'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1713069071346-WaveForm-.png'
---

# - WaveForm 라이브러리 컴포넌트 만들어보기

![](https://dp71rnme1p14w.cloudfront.net/compressed_1712724790774--2024-04-10-1.53.05.png)

개인 음악 블로그 사이트를 만들때, 오디오 파일을 받아서 해당 음악에 맞는 파형을 만들어주는 `WaveForm` 컴포넌트를 만들었었다. (사운드 클라우드 같은...)

직접 `Canvas`를 통해서 그려주어야하고, 재생 상태와 상황에 따라서 해당 캔버스가 색상이 점점 채워져야했다.

로컬 내에서는 한번 구현해보았는데 이걸 라이브러리 컴포넌트로 만들어보면 재밌지 않을까? 라는 생각을 했고, 한번 구현해보기로 했다.

여기서 가장 고민했던 부분은 다음과 같다.

1. 어떻게 사용자가 간편하게 이 라이브러리를 사용할 수 있을 것인가?

2. 동시에 어떻게 자율성을 보장해줄수 있을 것인가?

만약 사용자가 간편하게 컴포넌트를 사용한다고 가정한다면 이런식으로 이루어질것이다.

```tsx
function Component() {
  return (
    <>
      {musicData.map((music) => {
        return <AudioWaveForm id={music.id} audioFileSrc={music.src} />;
      })}
    </>
  );
}
```

이런 그림을 생각하고 한번 내부를 구현해보았다.

## - drawWaveForm.ts

```tsx
export default function AudioWaveForm({ audioFileSrc }: AudioWaveFormPropsType) {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);

  // 초기에 음악 파일 생성해주기
  useEffect(() => {
    const audio = new Audio(audioFileSrc);
    setMusicFile(audio);
  }, [audioFileSrc]);

  // 초기에 파형 그려주기
  useEffect(() => {
    const drawInitialWaveForm = async () => {
      const initializedWaveForm = await initializeWaveForm(audioFileSrc, 200);

      if (canvasRef.current) {
        drawWaveForm();
        //...
      }
    };

    drawInitialWaveForm();
  }, [audioFileSrc]);

  // 노래 재생 핸들러
  const playSelectedSongHandler = () => {
    //...
  };

  return (
    <Container>
      <PlayOrPauseButton playSelectedSongHandler={playSelectedSongHandler} />
      <WaveFormCanvas canvasRef={canvasRef} />
    </Container>
  );
}
```

![](https://dp71rnme1p14w.cloudfront.net/compressed_1712726624347--2024-04-10-2.23.41.png)

초기 파형이 렌더링 되는데에는 문제가 없었다.

하지만 1번 노래를 재생하고, 2번 노래를 다시 클릭하면 2번 노래만 새롭게 재생이 되어야했는데 모든 노래가 재생이 되는 문제가 발생했다.

상위 컴포넌트에서 단일 상태값을 가지게 한 후에, 재생되는 노래가 변경 될때마다 하나의 노래만 재생되도록 해야했다.

## - AudioWaveFormProvider.tsx

```tsx
const AudioWaveFormProvider = ({ children }: PropsWithChildren<{}>) => {
  const audioRef = useRef(new Audio());

  const playAudio = useCallback(
    (src: string) => {
      const absoluteSrc = new URL(src, window.location.origin).href; // 절대 경로 받아오기

      // 다른 노래를 클릭했을시에
      if (audioRef.current.src !== absoluteSrc) {
        audioRef.current.src = absoluteSrc;
        audioRef.current.play();
        setIsPlaying(true);
        setCurrentSrc(src);
      } else {
        if (audioRef.current.paused) {
          audioRef.current.play();
          setIsPlaying(true);
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    },
    [audioRef],
  );

  return <AudioContext.Provider value={{ playAudio }}>{children}</AudioContext.Provider>;
};
```

컨텍스트를 하나 만들어주어서 현재 재생중인 노래와, 새롭게 인자로 들어온 `src`가 다르다면 받아온 노래를 재생해주고, 그게 아니라면 일시정지를 해주는 식으로 구현했다.

하지만 기존에 재생되고 있는 노래 경로에서 localhost 주소(도메인주소)가 추가 되는 문제가 발생했다.

```
audioFileSrc :  /music2.mp3
currentAudio.src  :  http://localhost:5173/music2.mp3
```

그렇기 때문에 `URL` 객체를 사용해서 현재 접속하고 있는 경로를 가져옴으로써 절대 경로를 얻어오도록 했다.

## - 초기에 파형을 받아오는 initializeWaveForm 함수

```javascript
const initializeWaveForm = async (fileUrl: string, samples: number) => {
  try {
    const audioContext = new AudioContext();
    const res = await fetch(fileUrl);

    const data = await res.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(data);

    const leftChannel = audioBuffer.getChannelData(0);
    const rightChannel =
      audioBuffer.numberOfChannels > 1
        ? audioBuffer.getChannelData(1)
        : leftChannel;

    const blockSize = Math.floor(leftChannel.length / samples);
    let waveform = new Float32Array(samples);

    for (let i = 0; i < samples; i++) {
      let blockStart = i * blockSize;
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum += (leftChannel[blockStart + j] + rightChannel[blockStart + j]) / 2;
      }
      waveform[i] = sum / blockSize;
    }

    return waveform;
  } catch (err) {
    console.error("WaveForm 생성 중 오류가 발생했어요 ! ", err);
    return null;
  }
};

export default initializeWaveForm;
```

위 함수가 음악 파일을 인자로 받아서, 파형으로 변환하여 반환해주는 함수이다.

초기에 오디오 데이터를 처리하기 위해서 Web Audio API 중 하나인 `AudioContext`를 생성 해준다.

그 후에 `fetch`를 통해 오디오 파일을 가져 온후에, `arrayBuffer`를 통해 바이너리 데이터로 변환해준다.

그 후에 `decodeAudioData`를 통해 바이너리 형태의 오디오 데이터를 디코드 해서 `AudioBuffer`객체로 변환한다.

`leftChannel`과 `rightChannel` 은 채널 데이터를 추출한다.

즉, 모노 음원이라면 왼쪽 채널 데이터만을 사용한다.

하지만 스테레오 음원이라면 왼쪽과 오른쪽 데이터를 각각 추출한다.

그 후에 waveform을 담아주기 위하여 `Float32Array` 배열을 사용한다.

`Float32Array`는 자바스크립트 내에서 타입이 지정된 배열(Typed Array) 중 하나이다.

이 배열의 각 요소는 32비트 부동 소수점 숫자로 구성이 되어있다. (즉 정교한 숫자까지 전부 다룰 수 있다.)

WebGL 같은 웹 기반 그래픽이나 오디오 데이터 같은 부분의 바이너리 데이터를 효율적으로 다룰때 사용한다.

---

위와 같이 코드를 정리 한후에 사용자 입장에서 살펴보니, 재생 or 일시정지 버튼 커스텀에 대한 자율성이 떨어진다는 생각이 들었다.

그래서 버튼 컴포넌트도 따로 사용자가 import 해서 사용할수 있도록 분리했다.

최종적으로 사용할때의 모습은 다음과 같다.

```tsx
function Component() {
  return (
    <>
      <AudioWaveFormWrapper>
        {musicData.map((music) => {
          return (
            <div className={waveFormContainer}>
              <PlayOrPauseButton
                src={music.src}
                className=""
                playOrPauseValues={[<PlayIcon className={icon} />, <PauseIcon className={icon} />]}
              />
              <AudioWaveForm
                waveFormWidth={800}
                barWidth={3}
                barGap={3}
                barVariability={0.5}
                waveFormClassName={waveFormClass}
                audioFileSrc={music.src}
                backgroundTopColor={'red'}
                backgroundBottomColor={'yellow'}
                barTopColor={'black'}
                barBottomColor={'gray'}
              />
            </div>
          );
        })}
      </AudioWaveFormWrapper>
    </>
  );
}
```

재생과 일시정지에 대한 속성 값을 선택적으로 텍스트 or svg 컴포넌트를 받도록 수정하여 자율성을 높여보았다.

전에 간단하게 메트로놈에 관한 라이브러리 컴포넌트를 만들어서 배포했던적이 있었다.
[메트로놈 라이브러리](https://github.com/brgndyy/brgndy-react-metronome)

첫 라이브러리 배포였어서 이도 쉽지는 않았었고, 아직 수정해야 할 부분이 많다.

하지만 이번에는 전보다 조금 더 복잡한 로직을 담은 라이브러리이다 보니까 난이도가 더 있었고 공부하게 된 부분이 많았다.

더군다나 어떻게 하면 사용자 입장에서 더 간편하게 사용할 수 있고, 더 많은 자율성을 보장해줄수 있을까? 에 대한 고민을 해볼 수 있었다.

또한 메트로놈 라이브러리를 만들었을때는 만들어봤다는 것에 만족 하고 마무리 했었다.

하지만 이 WaveForm 라이브러리 같은 경우는 개발을 처음 시작할때부터 도전해보고 싶었던 부분이어서 그런지, 더 많은 사람들의 피드백을 듣고 디벨롭 시키고 싶었다.

![](https://dp71rnme1p14w.cloudfront.net/compressed_1713068257953--2024-04-14-1.17.34.png)

![](https://dp71rnme1p14w.cloudfront.net/compressed_1713068449913--2024-04-14-1.20.45.png)

![](https://dp71rnme1p14w.cloudfront.net/compressed_1713068478851--2024-04-14-1.21.14.png)

![](https://dp71rnme1p14w.cloudfront.net/compressed_1713068500351--2024-04-14-1.21.35.png)

더 발전시킬 수 있는 부분이 있을까 싶어서 우테코 내에 전체 방에 글을 올렸었고, 내가 놓치고 있는 부분들을 짚어주셨다. (다시 한번 감사합니다..🙇)

현재 테스트 코드는 작성했지만, 렌더링에 관한 기본적인 부분에 대한 테스트 코드만 작성한 상태라서 여러 케이스에 대한 코드를 추가할 예정이다.

[배포 링크](https://www.npmjs.com/package/brgndy-react-wave-form)

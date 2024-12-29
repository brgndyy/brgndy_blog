---
title: 'RN 얕게 시작하기'
date: '2024-12-29'
description: '리액트 네이티브를 찍먹해보자'
thumbnail: ''
---

리액트 네이티브는 자바스크립트로 코드를 작성하고, 이를 활용하여 IOS 와 Android에서 네이티브 앱을 만든다.
일단 여기서 네이티브 앱이란 무엇인지 알고 가야한다.

## - 네이티브 앱이란?

네이티브 앱은 운영체제(OS)에 최적화되어 개발 된 어플리케이션을 의미한다.
예를 들어서 iOS에서는 swift, 안드로이드에선 코틀린, 자바를 이용하여 개발하는 것을 의미한다.
즉, RN을 활용하여 위의 네이티브 앱을 만들 수 있다는 의미이고 이 RN은 자바스크립트와 네이티브 코드 사이의 가교 역할을 해준다.

RN을 시작하는 방식에는 `expo cli`와 `react-native cli` 총 2가지가 있다.
react-native cli를 사용하는 경우에 더 많은 확장성을 가지고 있고 대규모 프로젝트에 적합하다.
expo cli는 RN을 쉽게 관리해주는 프레임워크이고 빠르게 MVP 모델을 만들때 활용할 수 있다.
또한 expo를 활용하여 작업하다가 react-native cli로 변환도 가능하다고 한다.

## - 시작하기

```
npx create-expo-app@latest
```

<img width="192" alt="스크린샷 2024-12-29 오후 5 07 35" src="https://github.com/user-attachments/assets/5dd07f90-4b6f-49ad-948c-18377bf4f195" />

위 명령어를 치면 이러한 QR 코드가 나오는데, expo 어플을 다운받으면 본인의 기기에서 로컬환경에 대한 테스트를 진행해볼 수도 있다.
(이 외에도 ios환경이라면 XCode를 다운 받아서 실행시켜볼 수도 있다.)

## - 폴더구조

<img width="192" alt="스크린샷 2024-12-29 오후 5 06 57" src="https://github.com/user-attachments/assets/4a4c1b06-ec39-4865-adca-491aa6a23d36" />

expo를 사용하여 환경을 구축한다면 자동으로 expo-router로 라우팅 구조가 잡힌다.
이는 Next.js 처럼 폴더구조에 따른 라우팅을 지원한다.

```
app
 ┣ (tabs)
 ┃ ┣ _layout.tsx
 ┃ ┣ explore.tsx
 ┃ ┗ index.tsx
 ┣ +not-found.tsx
 ┗ _layout.tsx
```

app 폴더 안에 전체적인 `_layout.tsx`가 있는데, 이는 전체 어플리케이션의 레이아웃을 말한다.
또한 `(tabs)` 폴더가 존재하는데, 이는 라우트 그룹을 말한다. (Next.js에서의 라우트 그룹을 생각하면 된다.)
해당 라우트 그룹에 맞는 레이아웃이 또 존재하고 `tabs`라는 라우트 그룹으로 묶여있다.

![KakaoTalk_Video_2024-12-29-16-40-37](https://github.com/user-attachments/assets/c745469a-e397-4530-81c8-4f7c8c074232)

처음에 화면을 켜면 애니메이션이 적용되어있는데, RN 안에서 애니메이션 관련한 기능들이 내장이 되어있다.
이 외에도 많이 쓰이는 커스텀 훅들도 내장 되어있는데, 패키지 구성 자체가 DX 친화적이라고 느꼈다.

```tsx
export function HelloWave() {
  const rotationAnimation = useSharedValue(0);

  useEffect(() => {
    rotationAnimation.value = withRepeat(
      withSequence(withTiming(25, { duration: 150 }), withTiming(0, { duration: 150 })),
      4, // Run the animation 4 times
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <ThemedText style={styles.text}>👋</ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});
```

---

## - 더 알아봐야할 부분들

1. StyleSheet을 통해서 스타일링을 해주는데 특별한 이유가 있나
2. View 관련한 컴포넌트들이 많다. (BlurView, Stack.View 등) 각각의 역할과 원리는 뭐지
3. 테마나 폰트 같이 유틸성 기능들이 전부 커스텀훅으로 되어있다. 커스텀 훅인 이유가 있나?

등등..

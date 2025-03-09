---
title: 'Go Expo 패키지 살펴보기'
date: '2025-03-09'
description: 'Expo에서 초기 셋팅이 너무 잘되어있다..'
thumbnail: ''
category: '개발'
---

Go Expo는 RN을 더 쉽게 개발할 수 있도록 해주는 프레임워크이다.
[공식 문서](https://docs.expo.dev/) 를 읽어보면 알 수 있듯이, 명령어 하나면 바로 RN 개발 환경을 구축해준다.

초기 셋팅시부터 구축 되어있는 것들이 굉장히 많아서 개발하기 굉장히 편할 것 같다고 생각했지만, 이는 일장일단 이 있었다.
잘 되어 있기때문에 이 구조를 파악만 하면 바로바로 활용할 수 있을거 같았지만, 초기에는 구조 파악하는 것이 쉽지가 않아서 RN 공부해볼 겸 하나씩 까보면 재밌지 않을까 해서 정리해보려한다.

## - \_layout.tsx

```tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
```

먼저 루트 컴포넌트이다.
리액트와 마찬가지로 레이아웃을 잡아주는데, ThemeProvider 내부에서는 `useContext`를 활용하여 테마를 지정해주고 있다.

```tsx
SplashScreen.preventAutoHideAsync();
```

이 부분이 뭔지 이해가 안갔는데, 이는 앱이 완전히 로딩 될때까지 스플래시 스크린이 자동으로 사라지는 것을 방지한다.

### - 스플래시 스크린은 무엇인가?

스플래시 스크린이란 앱이 실행 될때 처음으로 보이는 화면을 의미한다.

![](https://velog.velcdn.com/images/brgndy/post/3d78605c-4e93-451d-a2de-749e63c9c36a/image.png)

토스로 예를 들면 어플을 키자마자 보이는 위의 화면인데, 카카오톡이나 넷플릭스도 마찬가지이다.
초기에 앱 실행시 로고 화면을 보여주면서 백그라운드에서는 앱 자체를 초기화하는 역할을 한다.

위 코드에서는 폰트를 완전히 불러오기 전까지 스플래시 스크린을 보여주고, 리소스 로드가 완료 됐을때 화면을 띄워준다.
Stack은 라우터 역할을 해주고, options 부분에서 `headerShown`이 있는데 이 부분은 네비바를 보여줄지 말지를 결정한다.

### - headerShown : true 일때

![](https://velog.velcdn.com/images/brgndy/post/11737ffe-4819-4b53-b35b-05dd99536251/image.png)

### - headerShown : false 일때

![](https://velog.velcdn.com/images/brgndy/post/b3986f3e-7ebc-4d6d-bf58-2541fbea1b38/image.png)

false로 설정하면 네비바가 가려지는 것을 볼 수 있다.

`StatusBar`는 최상단에 와이파이나 시간, 배터리 잔량을 나타내는 부분의 색상을 지정해줄수 있는데, `light`, `auto`, `inverted`, `dark`등으로 나타낼 수 있다.

---

### 생각해보고 싶은 점

1. colorScheme을 각각 불러올 필요가 있나? 조금 더 테마 값을 똑똑하게 쓸 수 있을거 같다.
2. Expo 에서는 스플래시 스크린 이미지를 그냥 app.json에서 경로 지정만 해주면 되는거 같은데 Expo를 사용하지 않았을때는 어떻게 하지?
3. Expo가 굉장히 간편하고 잘 구성이 되어있는건 맞지만, 확실히 의존성이 큰 느낌이다. Expo로만 작업하다보면 Expo만 계속 써야할거 같은 느낌..

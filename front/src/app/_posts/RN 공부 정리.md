---
title: 'RN에서 사용하는 모듈들 정리하기'
date: '2025-05-04'
description: 'RN에서 사용하는 모듈들을 정리해보자'
thumbnail: ''
category: '개발'
---

RN은 웹과 환경이 다르다.

기본적으로 div태그를 사용하여 컨테이너로 감싸면 에러가 발생하고, RN에서 제공하는 `View`컴포넌트로 감싸주어야지 작동한다.

div는 HTML DOM요소이기 때문에 네이티브 환경에서 사용할수 없기 때문이다.
(웹만 하다가 확실히 RN을 공부하려니 헷갈리는 부분이 있다.)

이번 기회에 RN에서 자주 사용하는 기본적인 모듈들을 정리해놓으려 한다.

### - Image

```ts
import { Image } from 'react-native';

const ImageComponent = () => {
  return (
    <Image
      source={{ uri: 'https://example.com/image.jpg' }}
      style={{ width: 200, height: 200 }}
      resizeMode="cover"
    />
  );
};
```

이미지를 적용할때 사용하는 컴포넌트이다. 웹에서 css로 적용시켜주던 `obejct-fit`을 내부적으로 적용시켜줄 수 있다.

### - TextInput

```tsx
import { TextInput } from 'react-native';

const InputComponent = () => {
  const [text, setText] = React.useState<string>('');

  return (
    <TextInput
      value={text}
      onChangeText={(newText: string): void => setText(newText)}
      placeholder="텍스트를 입력하세요"
    />
  );
};
```

웹에서 사용하던 input 컴포넌트라고 생각하면 된다.

### - ScrollView

```tsx
import { ScrollView, Text } from 'react-native';

const ScrollableContent = () => {
  return (
    <ScrollView>
      <Text>스크롤 가능한 긴 콘텐츠...</Text>
    </ScrollView>
  );
};
```

기본적으로 View 컴포넌트는 스크롤이 되지 않는다.
내용물이 너무 길어서 스크롤을 적용시키려면 `ScrollView` 컴포넌트를 사용해야한다.

> 왜 근데 View랑 ScrollView랑 나뉘어져있지? 그냥 View에도 스크롤이 가능하도록 하면 되지 않나?

View랑 ScrollView가 나뉘어진데에는 몇가지 이유가 있다.

첫번째로 성능 최적화이다.
네이티브에서는 스크롤을 적용시키는 것 조차도 기능 중 하나인데, View에 이 스크롤 기능을 적용시켜버리면 스크롤이 필요하지 않은 요소에도 스크롤 기능을 넣어버리는 셈이다.

ScrollView에는 터치 이벤트, 스크롤 위치 계산, 모멘텀 스크롤링 등 추가적인 로직을 포함하고 있기 때문에 더 많은 리소스를 사용한다.

또 네이트브 컴포넌트 맵핑의 이유가 있다.

View는 IOS의 UIView, 안드로이드의 ViewGroup과 맵핑 되고, ScrollView는 IOS의 UIScrollView, 안드로이드의 ScrollView와 맵핑 된다.

마지막으로 기능적으로 ScrollView는 모든 자식 요소들을 한번에 메모리에 로드하고 렌더한다.

만약에 모든 View가 ScrollView의 기능을 가진다면, 앱의 메모리 사용량이 크게 증가할 수 있다.

(FlatList나 SectionList 같이 가상화 컴포넌트를 사용하는 것 또한 이러한 이유이다.)

### - FlatList

```ts
import { FlatList, Text } from 'react-native';

type ItemType = { id: string; title: string };

const ListComponent = (): JSX.Element => {
  const data: ItemType[] = [
    { id: '1', title: '항목 1' },
    { id: '2', title: '항목 2' },
  ];

  const renderItem = ({ item }: { item: ItemType }): JSX.Element => (
    <Text>{item.title}</Text>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item: ItemType): string => item.id}
    />
  );
};
```

FlatList는 대량의 데이터를 나타내는데에 용이하다.

### - SectionList

```ts
import { SectionList, Text } from 'react-native';

type ItemType = { title: string };
type SectionType = { title: string; data: ItemType[] };

const SectionedList = (): JSX.Element => {
  const sections: SectionType[] = [
    {
      title: '섹션 1',
      data: [{ title: '항목 1' }, { title: '항목 2' }],
    },
    {
      title: '섹션 2',
      data: [{ title: '항목 3' }, { title: '항목 4' }],
    },
  ];

  return (
    <SectionList
      sections={sections}
      renderItem={({ item }: { item: ItemType }): JSX.Element => (
        <Text>{item.title}</Text>
      )}
      renderSectionHeader={({ section }: { section: SectionType }): JSX.Element => (
        <Text>{section.title}</Text>
      )}
    />
  );
};
```

`SectionList`는 말그대로 섹션이 존재하는 리스트이다.

위에서 렌더링하는 데이터 형식을 보면 알겠지만, `FlatList`는 단순 리스트, `SectionList`는 섹션화 된 리스트라고 생각하면 된다.

### - Button

```ts
import { Button } from 'react-native';

const ButtonComponent = () => {
  return (
    <Button
      title="버튼"
      onPress={(): void => console.log('버튼이 눌렸습니다')}
    />
  );
};
```

버튼 컴포넌트이다. 웹과는 다르게 `onClick`이 아닌 `onPress`라는 용어를 쓴다.

### - Switch

```ts
import { Switch } from 'react-native';

const SwitchComponent = (): JSX.Element => {
  const [isEnabled, setIsEnabled] = React.useState<boolean>(false);

  return (
    <Switch
      value={isEnabled}
      onValueChange={(value: boolean): void => setIsEnabled(value)}
    />
  );
};
```

토글 컴포넌트이다. (이런것도 제공해준다니 놀랐다..)

### - Pressable

```ts
import { Pressable, Text } from 'react-native';

const PressableComponent = () => {
  return (
    <Pressable
      onPress={(): void => console.log('pressed')}
      style={({ pressed }): object => ({
        backgroundColor: pressed ? 'lightgray' : 'white',
        padding: 10,
      })}
    >
      <Text>누르세요</Text>
    </Pressable>
  );
};
```

`Pressable`은 터치 컴포넌트이다. 웹에서는 `hover`나 `cursor` 같은 속성들을 통해 clickable함을 나타냈지만, RN에서는 `Pressable`을 활용하여 더 직관적으로 터치 애니메이션을 구현할 수 있다.

![](https://velog.velcdn.com/images/brgndy/post/2bfb504d-aaec-4d04-bd5d-589255947724/image.gif)

### - Animated

```ts
import { Animated, View } from 'react-native';

const FadeInView = () => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View style={{ width: 100, height: 100, backgroundColor: 'blue' }} />
    </Animated.View>
  );
};
```

`Animated`는 애니메이션을 위한 모듈이다.
위 코드처럼 해당 컴포넌트가 렌더링 될때의 애니메이션을 지정해줄 수 있다.

### - Dimensions

```ts
import { Dimensions, View } from 'react-native';

const ScreenInfo = () => {
  const windowWidth: number = Dimensions.get('window').width;
  const windowHeight: number = Dimensions.get('window').height;

  return (
    <View>
      <Text>화면 너비: {windowWidth}px</Text>
      <Text>화면 높이: {windowHeight}px</Text>
    </View>
  );
};
```

`Dimensions`는 화면 크기를 가져오는 역할을 한다.

> 왜 네이티브는 웹이 아닌데 window라는 용어를 쓸까?

RN은 웹 개발자들이 모바일 앱 개발을 쉽게 시작할 수 있도록 설계됐다.

window는 웹개발자들에게 굉장히 친숙한 용어이기 때문에 DX를 향상시키기 위해 유사한 네이밍 규칙을 채택했다.

여기서 `window`는 웹 환경에서 말하는 `window`가 아니라, 앱의 가시적인 영역을 의미한다.

`window`가 아니라 `screen`을 불러올 수 있다.

```ts
// 앱의 가시적인 영역 (상태 표시줄 등 제외)
const window = Dimensions.get('window');

// 물리적 화면 전체 크기
const screen = Dimensions.get('screen');
```

screen이 window보다 더 넓은 개념이다.

### - Platform

```ts
import { Platform, View, Text } from 'react-native';

const PlatformSpecific = () => {
  return (
    <View>
      <Text>
        현재 플랫폼: {Platform.OS}
      </Text>
      {Platform.OS === 'ios' ? (
        <Text>iOS 전용 컴포넌트</Text>
      ) : (
        <Text>Android 전용 컴포넌트</Text>
      )}
    </View>
  );
};
```

`Platform`은 플랫폼의 특정 코드 작성을 위한 API이다.

OS별로 다른 코드를 작성해야할때 사용할 수 있다.

### - Linking

```ts
import { Linking, Button } from 'react-native';

const LinkingExample = () => {
  const openURL = async (url: string): Promise<void> => {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      console.error('URL을 열 수 없습니다');
    }
  };

  return (
    <Button
      title="웹사이트 열기"
      onPress={(): void => {
        void openURL('https://reactnative.dev');
      }}
    />
  );
};
```

RN에서는 자체적으로 외부앱을 열 수 있는 기능이 없다.
그렇기때문에 Linking 모듈을 사용해야한다.

> RN은 RN자체가 네이티브가 아니라, JS코드와 네이티브 코드 사이의 가교 역할을 한다.

이거 말고도 상태 표시줄을 나타내는 StatusBar, Modal, SafeAreaView, ImageBackground 등 다양한 모듈들이 존재한다.

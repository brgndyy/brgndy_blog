# 컴파운드 패턴

현재 해당 블로그의 글쓰기 기능의 코드는 대략 이렇다.

```javascript
export default function WriteForm({}) {

  const postTitleHandler = () => {
  // 게시글 제목 작성 핸들러
  };

  const postBodyHandler = useCallback((value: string) => {
    // 게시글 본문 작성 핸들러
  }, []);

  const postThumbnailImageHandler = () => {
    // 게시글의 썸네일 이미지 핸들러
  };

  const postDescriptionHandler = () => {
    // 게시글에 대한 설명 추가 핸들러
  };

  const openSubmitFormHandler = () => {
   // 게시글 등록


  };

  const openSubmitFormHandler = () => {
   // 게시글 등록

  };

  return (
    <>
      <TitleSection />
      <ContentSection/>
      <ButtonSection />
      {isOpenSubmitForm && (
        // 썸네일 이미지, 게시글 설명 등 추가 컴포넌트
      )}
    </>
  );
}
```

가독성을 위하여 내부 코드를 다 지운 후에, 적은것이지만, 글 작성 중에 드래그앤드랍으로 이미지를 삽입하면, 해당 이미지의 cdn 링크도 받아오도록 되어있어서 상당히 지저분하다.

이를 한번 컴파운드 패턴으로 리팩토링을 진행해보려고 한다!

## - Compound Pattern 이란 ?

컴파운드 패턴은 말그대로 `합성 패턴`이라고 이해하면 된다 .

여러개의 컴포넌트를 합성하여서 UI를 분리하여 가독성을 좋게 만들어줄수 있고, 변경사항이 생겼을때 유연하게 대처가 가능하다.

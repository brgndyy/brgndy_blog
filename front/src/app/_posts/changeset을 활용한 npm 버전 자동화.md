---
title: 'Github Actions + changesets를 활용한 npm 배포 자동화'
date: '2024-08-26'
description: 'npm 배포에 대해 CI/CD를 구축해보자'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1724642179316-Github-Actions-changesets-npm-.png'
---

기존에 메트로놈 라이브러리를 배포할때는 직접 `npm login`을 해주고 버전업을 수동으로 해준후에 `npm publish`까지 해주었다.

하지만 어플리케이션에 대한 배포 파이프라인을 구축하듯이 이 npm에 배포하는 과정 또한 배포 자동화를 해줄수 없을까? 란 생각이 들었다.

Github action을 활용하여 자동화를 해야겠다! 라는 생각은 들었지만, 구체적인 버저닝 관리에 관한 부분은 그려지지 않았다.

![](https://dp71rnme1p14w.cloudfront.net/compressed_1713068478851--2024-04-14-1.21.14.png)

하지만 웨이브폼 라이브러리를 만들었을때 우테코 전기수 분께서 `changesets`를 활용한 버전 관리를 추천해주셨던 것이 기억이 났고 이를 알아보고 적용시켜보기로 했다.

## changeset이란?

`changeset`는 보통 라이브러리나 패키지에 대한 버전 관리 및 배포 자동화를 돕는 도구이다.

특히 모노레포에서 각 패키지의 버전 및 배포를 관리하는데 유용하다.

`changesets`는 여러 패키지의 독립적인 버전 관리를 가능하게 하고, 패키지 간의 종속성을 자동으로 감지하여 종속된 패키지의 버전 또한 자동으로 업데이트한다.

또한 모노레포에서는 여러개의 패키지가 한번에 배포 되는 경우가 많다고 한다.
이럴때 여러 패키지의 변경 사항을 자동으로 수집하고 한번의 명령으로 모든 변경 사항을 배포할 수 있도록 도와준다.

현재 관리하고 있는 라이브러리들은 단일 패키지들이지만, 훗날 본인이 만든 라이브러리들을 모아서 하나의 레포지토리 안에서 관리할 예정이므로 `changesets`를 사용해보았다.

### changesets 설치

```
npm install @changesets/cli -D
```

### 설치 후 초기화

```
npx changeset init
```

![](https://dp71rnme1p14w.cloudfront.net/compressed_1724243104299--2024-08-21-9.25.01.png)

이렇게 되면 루트 폴더 내부에 `.changeset` 이라는 폴더가 생기고 하위에 config.json이 생긴다.

```ts
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.2/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "restricted",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

### - $schema

Changesets 설정 파일의 스키마를 지정한다. 즉 템플릿 형식을 지정하는건데, 이 `config.json` 파일이 특정 형식에 따라서 작성되어야함을 의미한다.

실제로 저 경로에 접속하면 json 파일이 나오는데, 저 경로에서 명시한 형식에 맞도록 config.json이 만들어져야함을 의미한다.

이는 형식의 일관성을 보장하고 JSON 파일을 작성할때 발생할 수 있는 휴먼에러를 방지한다.

### - changelog

릴리스 노트를 생성할 때 사용할 템플릿 또는 패키지를 지정한다.

현재는 기본을 제공 되는 릴리즈 노트 템플릿을 사용한다.

만약 커스텀한 릴리즈 노트를 생성하고 싶다면, 별도의 패키지나 템플릿을 지정할 수 있다.

### - commit

버전을 업데이트할때 자동으로 Git 커밋을 생성할지 여부를 결정한다.

기본 값은 `false`이고 이를 `true`로 하면 패키지가 버전이 증가한 후 자동으로 커밋 메세지가 생성 된다.

### - fixed

모노레포에서 고정된 버전 정책을 사용할 패키지를 지정한다.

만약에 여러 패키지가 항상 같은 버전 번호를 유지해야 하는 경우, 이 속성에 해당 패키지를 지정한다. (ex: `["package-a", "package-b"]`)

빈 배열로 두면 이 기능을 사용하지 않는다.

### - linked

특정 패키지들이 같은 마이너 버전이나 패치 버전을 공유해야 할때 사용한다.

서로가 링크 된 패키지는 하나의 패키지가 업데이트 될 때 다른 패키지도 동일한 버전으로 업데이트 된다.

만약 위처럼 `a-package`와 `b-package`를 `["package-a", "package-b"]`로 설정해놓으면 두 패키지가 항상 동일한 마이너 및 패치 버전을 공유한다.

### - access

패키지를 배포할 때의 접근 범위를 설정한다.

`restricted`는 기본 설정으로, 해당 패키지를 프라이빗(비공개) 레지스트리에 배포한다.

이를 `public`으로 설정하면 패키지를 공개 된 npm 패키지로 배포한다.

### - baseBranch

`Changesets`가 기본적인 기준으로 잡을 브랜치를 지정한다.

기본값은 `main`이고 만약 레포지토리의 기본 브랜치가 `main`이 아닌 다른 브랜치라면 해당 브랜치 이름으로 변경해야한다.

### - updateInternalDependencies

모노레포에서 패키지 간의 내부 종속성 업데이트를 어떻게 처리할지 결정한다.

기본값은 `patch`이고, 내부 종속성을 가진 패키지가 업데이트 되면 해당 종속성의 버전도 `patch`로 업데이트 된다.

이 값을 `minor`나 `major`로 설정하면 내부 종속성의 버전 업데이트 방식이 변경 된다.

> minor : 1.1.0 => 1.2.0
> major : 1.0.0 => 2.0.0
> patch : 1.0.1 => 1.0.2

### ignore

`changesets`에서 버전 관리에서 제외할 패키지를 지정한다.

`ignore`배열 안에 패키지 이름을 추가하면, 해당 패키지는 버전 업데이트에서 무시 된다.

---

### changesets 실행

```
npx changeset
```

![](https://dp71rnme1p14w.cloudfront.net/compressed_1724246315091--2024-08-21-10.18.33.png)

여기서 업그레이드 할 버전 종류를 고를 수 있다.

![](https://dp71rnme1p14w.cloudfront.net/compressed_1724246709471--2024-08-21-10.25.06.png)

`changesets`의 실행이 끝나면 summary로 적었던 내용이 담긴 로그가 생긴다.

저 `cold-plants-grow`란 파일명은 `changesets`가 중복 방지를 위하여 랜덤으로 만들어내는 파일 명이고 파일 안에 기록 된 내용이 중요하다.

해당 파일 안의 내용은 프로젝트의 변경 사항을 기록하는 change log의 일부이고, 파일 버전 관리와 릴리즈 노트 생성을 위해 사용 된다.

이는 변경 사항을 추적하는 데에 중요하다.

이를 이제 Github action 에서 스크립트로 옮겨보자.

```ts
name: Package Release

on:
  push:
    branches:
      - main

jobs:
  release:
    runs-on: ubuntu-latest

    defaults:
      run:
        working-directory: react-metronome

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm ci

      - name: Create release version
        run: |
          npx changeset version
          git add .
          git commit -m "Version Packages" || echo "No changes to commit"

      - name: Push changes and tags
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          git push origin HEAD:main --follow-tags

      - name: Create .npmrc file
        run: echo "//registry.npmjs.org/:_authToken=${{ secrets.NPM_TOKEN }}" > ~/.npmrc

      - name: Publish to npm
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npx changeset publish
```

흐름은 대략 이러하다

1. main 브랜치에 push가 될때 액션이 트리거 된다.

2. 우분투 환경에서 `react-metronome`폴더를 기준으로 작업한다.

3. 가장 최신 커밋만 가져오니 변경사항을 감지 못하는 문제가 발생했다. 그러므로커밋 기록을 2개를 최근 2개를 가져옴으로써 변경사항을 감지한다.

4. `changeset`을 실행하여 버전을 자동으로 설정하고 변경사항을 커밋한다.

5. 생성 된 커밋과 변경 된 버전을 바탕으로 메인에 push 한다.

6. npm 인증을 위하여 .npmrc 파일을 만든다.

7. npm에 배포한다.

---

처음으로 changesets를 활용해보았는데, 왜 모노레포 구축에 유용하다는지 알게 됐다.

머지않아 만든 라이브러리들 + changesets를 활용하여 직접 모노레포를 구축해볼 예정이다.

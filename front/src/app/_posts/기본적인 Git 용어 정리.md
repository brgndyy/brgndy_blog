---
title: '기본적인 Git 기본 용어 정리'
date: '2024-02-19'
description: 'Git에 대한 기본적인 용어를 정리해보자.'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1708351423550--Git-.png'
---

우테코 1주차 미션을 진행하면서, 페어의 로컬에서 페어프로그래밍을 했었다.

그 후 나의 로컬로 작업한 코드들을 가져오는 과정에서 문제가 발생했었고, 이 과정에서 페어에게 신세를 많이 졌었다.

또한 conflict들을 해결하느라 리뷰를 받는 과정에서도 리뷰어분이 보시기에 깔끔한 커밋 내역이 생성 되지 않는 문제도 생겼다.

이번 기회에 기본적인 Git 용어들을 한번 정리해두려고 한다.

## - fork

`fork` 는 다른 사람의 원격 저장소를 자신의 깃허브 계정으로 복사한다.

이를 통해 원본 저장소에 영향을 주지 않으면서 코드 추가, 수정을 자유롭게 진행할 수 있다

> 이 상태에서는 아직 자신의 깃허브 레포에 추가가 된 것일뿐, 실질적으로 이루어진것은 없다.

---

## - clone

원격 저장소의 내용을 로컬 컴퓨터로 복사하는 것을 말한다.

이 과정을 통해 로컬에서 작업을 시작할 수 있다.

clone한 원본 저장소를 remote 저장소로 갖고있다.

## - remote

원격 저장소를 가리키는 이름이다.

> 여기서 원격 저장소라는건, A 프로젝트가 있다고 가정했을때 A 프로젝트를 본인의 레포로 fork 해온 그 저장소를 의미한다. 보통 원격 저장소는 `origin`이라는 이름으로 참조 된다.

## - upstream

`upstream`은 포크한 저장소에서 원본 저장소를 참조할때 사용된다.

upstream은 로컬 저장소가 아닌, 원격에 위치한 저장소이다.

upstream의 목적은 포크한 저장소와 원본 저장소 간의 동기화를 용이하게 하기 위함이다.

```bash
git remote add upstream 저장소_URL
git remote -v
```

위의 뜻은 저장소\_URL을 내 로컬환경에서 원격 저장소로 추가를 하겠다는 뜻이다.

추가 후에 git remote -v 를 해보면 upstream이라는 원격 저장소가 추가 되어있다.

## - fetch

원격 저장소에서 최신 변경사항을 가져오지만, 로컬 저장소의 작업을 업데이트하지 않는다.

따로 merge 나 rebase 같은 추가적인 브랜치 병합 작업이 필요하다.

```
git fetch upstream main // upstream 저장소의 main 브랜치의 이력을 가져온다

git fetch origin main // origin 저장소의 main 브랜치의 이력을 가져온다.

git fetch upstream step1:step1 // upstream 저장소의 step1 브랜치의 소스코드를 가져와서, 나의 로컬 안에 step1 브랜치를 새롭게 만들어 저장한다.
```

## - merge

두 브랜치의 변경사항을 하나로 합치는 과정이다.

이를 통해 다른 브랜치에서의 작업을 현재 브랜치에 통합할 수 있다.

remote 저장소에서 가져온 변경된 이력을 내 브랜치로 병합할 수있다.

```
git checkout step1 // step1 브랜치로 이동한다
git merge upstream/step1 // upstream 저장소의 step1 브랜치를 병합한다.
```

## - rebase

rebase 는 한 브랜치의 변경사항을 다른 브랜치에 적용할 때 사용한다.

이 과정에서 기존의 커밋 이력을 새로운 브랜치의 이력 위에 "재배치"한다.

이는 커밋 히스토리를 깔끔하게 유지하는 데 도움이 된다.

여기서 merge는 커밋 히스토리가 그대로 남게 되지만, rebase는 원본 커밋 내역을 변경시킨다.

즉 merge는 원본 내역을 그대로 저장하고 rebase는 커밋 내역을 재배치한다.

## - pull

`pull`은 fetch 와 merge를 한번에 해주는 명령어라고 생각하면 된다.

```
git pull [원격 저장소 별칭] [브랜치 이름]
git pull origin main // origin 저장소의 main 브랜치를 가져와서 병합한다.
git pull upstream step1 // upstream 저장소의 step1 브랜치를 가져와서 병합한다.
```

만약 페어프로그래밍을 예로 들어서, B와 페어프로그램을 하는 과정에서 B가 작업해놓은 소스코드들을 내 로컬 환경으로 가져와야할때라면 ?

### 1. 내 로컬 환경에서 원격 저장소 추가

```
git remote add upstream B가 올려놓은 레포지토리 URL
```

### 2. 원격 저장소의 브랜치에 대한 소스코드 가져오기

```
git fetch upstream step1
```

### 3. 로컬 환경에서 브랜치 만들어주기

```
git checkout -b  step1
git checkout step1
```

### 4. merge 를 통해 내 로컬 환경에서 원격 저장소의 브랜치에 대한 소스코드를 병합

```
git merge upstream/step1
```

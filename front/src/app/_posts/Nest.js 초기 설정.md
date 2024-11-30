---
title: 'Nest.js 기본 개념 훑어보기'
date: '2024-11-28'
description: 'Nest.js 의 기본 개념에 대해 알아보자.'
thumbnail: ''
---

## 1. 초기 필요한 파일 설치

```
npm install @nestjs/common @nestjs/core @nestjs/platform-express reflect-metadata typescript
```

각 패키지 역할은 다음과 같다.

1. @nestjs/common

NestJS의 데코레이터, 유틸리티, 인터페이스 등 주요 기능을 제공하는 패키지이다.

Controller, Injectable, Module 등 다양한 기능들을 담고 있다.

2. @nestjs/core

NestJS의 초기화 및 실행을 담당한다.

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

3. @nestjs/platform-express

Express를 NestJS 내에서 웹서버로 쓸 수 있도록 지원하는 어댑터 패키지이다.

Express 말고도 Fastify 와 같은 다른 프레임워크를 사용할 수 있다.

여기서 중요한건 NestJS 자체는 HTTP 요청에 대한 응답을 해주지 않는다.

실제적인 HTTP 구현물이 필요하다.

4. reflect-metadata

타입스크립트의 메타데이터 리플렉션 기능을 제공하는 패키지이다.

### - 메타데이터 리플레션이란?

코드의 구조와 정보를 `런타임`에 참조하거나 수정할 수 있도록 지원하는 기능이다.

여기서 메타데이터란 코드 요소(클래스, 메서드, 프로퍼티 등)에 대한 추가적인 정보를 의미한다.

이를 컴파일 시점이 아니라 런타임 시점에 해당 정보에 접근하여 동적인 처리를 가능하게 한다.

이를 활용하여 의존성 주입, 검증, 동적 라우팅 등 고급 기능을 지원하는 중요한 도구라고 한다.

(사실 아직 정확히 뭔 기능인지 모르겠다.. )

## - tsconfig.json

```js
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

여기서 `experimentalDecorators`는 데코레이터를 사용할 수 있도록 활성화해주는 역할이다.

타입스크립트에서 데코레이터는 표준이 아니라 추가적인 기능이므로, 이를 활성화하기 위해서 해당 옵션을 사용한다.

`emitDecoratorMetadata`는 데코레이터가 사용하는 메타데이터를 자동으로 생성하고 포함시킨다.

데코레이터가 메타데이터를 활용할 수 있도록 추가적인 정보를 제공한다.

### - 데코레이터는 무엇인가?

데코레이터는 클래스, 메서드, 접근자(getter, setter), 프로퍼티, 파라미터 등에 붙여서 동작을 확장하거나 메타데이터를 추가하는 역할을 하는 **문법**이다.

코드의 동작을 수정하거나 보강할 수 있는 도구로, 컴파일 시점에 적용 되고 런타임에 실행되어서 추가적인 기능을 부여한다.

타입스크립트에서 데코레이터는 4가지 주요 유형으로 나뉜다.

1. 클래스 데코레이터

클래스의 동작을 수정하거나 메타데이터를 추가하는 역할을 한다.

2. 메서드 데코레이터

클래스의 메서드에 적용한다.
메서드 실행 전에 로그를 남기거나, 실행 조건을 제어하는 역할을 한다.

3. 속성 데코레이터

클래스의 속성에 적용한다.
특정 속성에 메타데이터를 추가하거나 초기값을 설정할때 사용된다.

위의 데코레이터들에 들어가는 매개변수들은 **정해진 규칙**에 따라서 정해져있다.
이는 일관성 유지와 데코레이터 동작의 표준화를 위한 것이다.

4. 파라미터 데코레이터

메서드의 매개변수에 적용한다.
특정 파라미터에 대한 정보를 추가하거나 동작을 제어한다.

---

## - 기본 파일 만들어보기

```ts
import { Controller, Module, Get } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

@Controller()
class AppController {
  @Get()
  getRootRoute() {
    return '안녕하세요!';
  }
}

@Module({
  controllers: [AppController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
}

bootstrap();
```

여기서 `AppController`에서 `@Controller` 데코레이터를 사용하여 클래스를 컨트롤러로 지정하였다.

해당 컨트롤러는 HTTP 요청을 처리하고 응답을 반환하는 데에 사용된다.

매개변수로 특정 경로를 지정할 수 있고, 아무런 인자가 없다면 `/`를 사용한다.

그 후에 `AppModule`을 `@Module` 데코레이터를 통해서 클래스를 모듈로 지정했다.

이 `@Module`은 NestJS에서 어플리케이션을 구성하는 기본 단위이다.

그리고 안에 인자로 `controllers`라는 컨트롤러 목록을 지정하는 옵션이 있다.

이 의미는 `AppModule`을 루트 모듈로 사용하면서 `AppController`라는 컨트롤러를 사용하겠다라는 의미이다.

마지막으로 `bootstrap`이라는 함수는, NestJS 어플리케이션의 인스턴스를 생성하고 실행시켜주는 역할을 한다.

현재 3000포트를 통해 서버를 열어주었다.

<img width="303" alt="스크린샷 2024-11-30 오후 7 04 24" src="https://github.com/user-attachments/assets/848e429c-5217-4fae-9b30-5e51f46f2aa9">

---

## - 파일 네이밍 규칙

1. 하나의 파일에는 하나의 클래스가 존재해야한다 (예외는 당연히 존재한다.)

2. 클래스명은 무엇에 관한 것인지 명시 되어야한다.

3. 클래스명과 파일명이 매칭되어야한다.

4. 파일명의 템플릿은 name.type_of_thing.ts의 형식이다.

예를 들어

```
app.module.ts
app.controller.ts
```

식이다.

---
title: 'api-gateway에 대하여'
date: '2025-10-06'
description: 'api-gateway 정리해보기'
thumbnail: ''
---

## - API-Gateway란

`API Gateway`는 클라이언트와 여러 서버 서비스 사이에 놓이는 중간 계층 (Reverse Proxy)인데, 말 그대로 API 요청들이 지나가는 대문이라고 생각하면 된다. 

![](https://velog.velcdn.com/images/brgndy/post/85f6ec51-7744-497a-8a5a-869b82e792fc/image.png)


규모가 큰 서비스에서 api 요청을 한다고 가정해보자.

```
[클라이언트] ───→ server-1.com/end-point/1
[클라이언트] ───→ server-2.com/end-point/2
[클라이언트] ───→ server-3.com/end-point/3
```

이런식으로 하나의 서비스에서 각기 다른 서버가 3개가 있을때, 각각 따로따로 직접 요청을 해야한다.

이 과정에서 하나의 서비스에서 사용할 공통 기능 (ex : 인증, 로깅, 속도제한)들을 서버에서 각각 구현해주어야하는 문제점이 발생한다.

하지만 API-Gateway를 사용한다면

```
[클라이언트] ───→ api.example.com (Gateway)
                     │
                     ├──→ server-1.com/end-point/1
                     ├──→ server-2.com/end-point/2
                     └──→ server-3.com/end-point/3
```

위처럼 하나의 게이트웨이를 통해 여러개의 엔드포인트들을 대응해줄 수 있다.

### -  다중 api-gateway일때의 예시

```
                    ┌────────────────────────────┐
                    │        Auth Gateway        │
                    │  - 로그인, 토큰 발급, 검증 │
                    └───────────┬────────────────┘
                                │
                ┌───────────────┴────────────────┐
                │                                │
┌─────────────────────────┐       ┌─────────────────────────┐
│   User Gateway          │       │   Order Gateway         │
│  /user/*  요청 처리       │       │  /order/* 요청 처리     │
│  캐싱/속도제한/로그          │       │  결제/주문 관련 라우팅 │
└─────────────────────────┘       └─────────────────────────┘

```


## - Gateway 기능 정리

### - 1. 라우팅

가장 기본적인 기능이다.
클라이언트 요청이 들어오면, 요청 경로(Path)나, 메서드(Method)에 따라 내부의 올바른 서비스로 전달한다.

```
/api/user/*  → user-service
/api/order/* → order-service
/api/pay/*   → payment-service
```


### - Mediation (데이터 및 프로토콜 중재)

이 중재 개념이 애매한데, 한마디로 통역사 역할이라고 생각하면 된다.

1. REST => gRPC나 SOAP 등 서로 다른 통신 프로토콜을 변환해주는 경우
2.  JSON ↔ XML / Snake_case ↔ camelCase 처럼 요청/응답의 데이터 포맷을 변환해주는 경우
3. 여러 서비스 응답을 합쳐서 하나의 응답으로 변환해주는 경우 (ex : /dashboard로 요청이 오는 경우 user + order + point 서비스를 병합한다.)
4. 백엔드에서 온 데이터 중 필요한 필드만 응답한다. (ex: 중요한 개인정보 같은 경우 마스킹, 필드 매핑)
5. 서비스 간 통신시 필요한 헤더나 인증 정보를 추가한다. (ex : X-Request-ID, JWT, API Key 등 주입)
6. 요청에 추가 데이터를 삽입한다.(userId, locate, timeZone 추가 등)

```
| 기능                              | 설명                          | 예시                                         |
| ------------------------------- | --------------------------- | ------------------------------------------ |
| **Protocol Mediation**          | 서로 다른 통신 프로토콜을 변환           | REST ↔ gRPC / REST ↔ SOAP / HTTP ↔ MQTT 등  |
| **Message Transformation**      | 요청/응답의 데이터 포맷을 변환           | JSON ↔ XML / Snake_case ↔ camelCase        |
| **Request Aggregation**         | 여러 서비스 응답을 합쳐서 하나의 응답으로 제공  | `/dashboard` → user + order + point 서비스 병합 |
| **Response Filtering**          | 백엔드에서 온 데이터 중 필요한 필드만 전달    | 내부 민감정보 제거, 필드 매핑                          |
| **Header / Metadata Injection** | 서비스 간 통신 시 필요한 헤더나 인증 정보 추가 | X-Request-ID, JWT, API Key 등 주입            |
| **Payload Enrichment**          | 요청에 추가 데이터 삽입               | userId, locale, timezone 등 추가              |

```


| 기능                      | 설명                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| **요청 라우팅**              | 요청 URL, Path, Header 등에 따라 올바른 내부 서버로 전달합니다. <br/>예: `/user/*` → user-server, `/order/*` → order-server      |
| **응답 병합 (Aggregation)** | 필요하면 여러 서버에서 받은 응답을 조합해서 한 번에 내려줄 수도 있습니다. <br/>예: `/dashboard` 요청 시, user-server + order-server 데이터를 합쳐서 응답 |
| **인증/보안 처리**            | JWT 토큰 검증, TLS 종료, API Key 확인 등을 Gateway 단에서 통합 관리                                                           |
| **공통 정책 적용**            | 속도 제한(Rate limiting), 캐싱, 로깅, 모니터링, 장애 격리 등 공통 로직 처리                                                         |



[참고 자료](https://www.wallarm.com/what/the-concept-of-an-api-gateway)
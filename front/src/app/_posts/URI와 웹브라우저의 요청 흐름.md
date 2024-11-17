---
title: 'URI와 웹 브라우저의 요청 흐름'
date: '2024-02-13'
description: 'URI와 웹 브라우저의 요청 흐름에 관하여'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1707784091375-URI-.png'
---

## - URI (Uniform Resource Identifier)

![](https://dp71rnme1p14w.cloudfront.net/compressed_1707782083935--2024-02-13-8.54.40.png)

**URI는 URL(Resource Locator) 와 URN(Resource Name)을 포함하는 개념**이다.

URL은 해당 리소스의 위치를 의미하고, URN은 해당 리소스의 이름을 의미한다.

![](https://dp71rnme1p14w.cloudfront.net/compressed_1707782695356--2024-02-13-9.04.52.png)

위의 사진처럼 URL은 찾고자 하는 리소스의 모든 경로를 의미하지만 URN은 경로 그자체에 이름을 부여한다.

이 이름은 영구적이고, 변하지 않는 값이다.

하지만 이는 리소스 접근 방법이나, 웹상의 위치가 표기가 되어있지 않고 이름만 부여되어있다.

그렇기때문에 실제 리소스를 찾을 수 있는 방법이 보편화 되어있지 않다.

그렇기에 URN은 보통 URL로 변환하여 사용한다.

---

URI의 U(Uniform)은 리소스를 식별하는 통일 된 방식,
R(Resource)는 자원, URI로 식별할수 있는 모든 것 (쿼리 스트링, 프로토콜 등 모든것을 포함),
I(Identifier)은 다른 항목과 구분하는데에 필요한 정보를 의미한다.

```
scheme://[userinfo@]host[:port][/path][?query][#fragment]
https://www.google.com/search?q=hello&hl=ko
```

보통 URI 는 이런식으로 구성 되어있다.

### - scheme

`scheme는 프로토콜`이라고 생각하면 된다. (http or https, ftp 등)

http 는 보통 80포트, https는 443 포트를 주로 사용한다. (포트는 생략 가능하다)

### - userInfo

userInfo는 URL에 사용자 정보를 포함해서 인증할때 사용한다

(하지만 거의 사용하지 않는다.)

### - host

host는 호스트명이다.

보통 도메인명이나 IP주소를 직접 사용 가능하다.

### - PORT

포트는 말그대로 포트 번호이다.

http는 80번 포트, https 는 443번 포트를 사용한다.

### - path

path는 `리소스 경로`를 의미한다. 이는 보통 계층적 구조로 되어있다.

예를 들어서 `/home/file1.jpg`라는 식의 path로 구성되어있다면 home 안에 file1.jpg가 찾고자하는 리소스인것이다.

### - query

query는 보통 `key=value`의 형태로 이루어진다.

?로 시작하고, &로 추가가 가능하다.

```
?keyA=value&keyB=valueB
```

이를 보통 query parameter, query string 등으로 불린다. 웹서버에 제공하는 파라미터이다.

### - fragment

fragment는 주로 사용하지는 않고, 서버에 전송하는 정보는 아니다.

html 내부에서 내부 북마크 등에 사용된다.

예를 들어서 한 게시글에 앵커 태그가 A, B, C 로 구성 되어있다고 가정해보자.

https://example.com/post/1/#A

로 가면 post 1번 게시글의 A 앵커태그로 이동하게 되는것이다.

---

## - 웹브라우저의 요청 흐름

```
https://www.google.com/search?q=hello&hl=ko
```

위의 이 주소로 서버에게 요청을 한다고 가정해보자.

이 url의 요청 페이지는

```
GET /search?q=hello&hl=ko HTTP/1.1
Host : www.google.com
```

이런식으로 path 정보와 http 정보, 그리고 host 정보도 포함되어서 서버에게 요청한다.

![](https://dp71rnme1p14w.cloudfront.net/compressed_1707783732481--2024-02-13-9.22.09.png)

그림으로 설명해보자면 1번 단계에서 웹브라우저가 HTTP 메세지를 생성하는 것이다.

그 후에 TCP/IP가 연결되어서 데이터를 패킷으로 만들고, HTTP 메세지를 포함해서 물리적인 하드웨어(LAN)을 통해 서버로 전송 된다.

요청을 받은 서버에서는 위의 사진 같은 HTTP 응답 메세지를 응답해준다.

![](https://dp71rnme1p14w.cloudfront.net/compressed_1707783987471--2024-02-13-9.26.24.png)

---
title: '코틀린에서 var과 val의 차이점'
date: '2025-02-23'
description: '코틀린에서 var선언과 val선언은 무엇이 다를까'
thumbnail: ''
---

코틀린을 공부하다가 어떤 변수는 var, 어떤 변수는 val로 선언한 경우를 발견했다.

이 두개의 차이점은 무엇일까?

결론부터 말하자면 `var는 변경 가능한 변수`, `val는 변경 불가능한 변수`이다.

한번 살펴보자

```kotlin
fun main() {
   var name = "이름";

    fun changeName (){
        name = "이름2"
    }
}

```

위 처럼 var 키워드를 사용하여 변수를 선언했을때는 다른 값으로 재할당이 가능하다.

하지만 이를 val로 바꾼다면?

![](https://velog.velcdn.com/images/brgndy/post/33e8cad6-7998-455f-ad07-03872ae8ae94/image.png)

val 키워드는 재할당이 불가능하다고 나온다.
하지만 val 키워드로 선언한 값이 원시값이 아니라 객체인 경우, 그 내부 값은 변경이 가능하다.

```kotlin
class Person(var name: String)

fun main() {
    val person = Person("이름")

    fun changeName (){
        person.name = "이름2"
    }
}

```

그러면 아예 불가능한 상수를 만들려면 어떻게 해야하는걸까?

`const val` 키워드를 사용하면 런타임이 아니라 컴파일 타임의 상수로 최상위 수준의 object내에서만 선언 할 수 있다. (런타임은 지원하지 않는다.)

또한 컴파일시에 결정되는 값만 저장 가능하기때문에, 기본 타입 (String, Int, Double)만 사용 가능하다.

> 여기서 컴파일 타임의 상수, 런타임 상수가 헷갈릴 수 있는데 기본 BASE_URL은 컴파일 타임의 상수, 런타임 상수는 사용자가 어플리케이션을 사용할때의 상수이다.

여기서 `object`를 사용하면 런타임 상수를 만들 수 있다.

```kotlin
class Person(var name: String)

object Config {
    val APP_NAME = "MyApplication"
    val DEFAULT_PERSON = Person("이름")
}

fun main() {
    println(Config.APP_NAME)  // 출력: MyApplication
    // Config.APP_NAME = "NewName" // 에러 발생 (재할당 불가)

    // Config.DEFAULT_PERSON = Person("이름2") // 에러 발생 (객체 자체 변경 불가)
    // Config.DEFAULT_PERSON.name = "이름2"  // 가능 (내부 값 변경 가능)
}

```

object 키워드는 런타임 상수를 생성해줌으로, 기본 타입이외에도 객체 타입도 선언이 가능하다.

객체 자체는 변경이 불가능하지만, 객체 내부의 값은 변경 가능하다.
또한 기본적으로 object는 싱글턴이므로 한번만 생성 된다.

```kotlin
data class Person(val name: String) // 내부 값 변경 불가

object Config {
    val DEFAULT_PERSON = Person("홍길동")
}

fun main() {
     Config.DEFAULT_PERSON.name = "이름2" // 에러 발생 (내부 값 변경 불가)
    println(Config.DEFAULT_PERSON) // 출력: Person(name=홍길동)
}

```

만약에 이런식으로 아예 data 클래스 내에 val을 선언해준다면 완전한 상수를 만들어줄 수 있다.

![](https://velog.velcdn.com/images/brgndy/post/c0feb67b-6997-4777-9a8a-3862095ae9d4/image.png)

정리하자면 val로 선언한다면 data class로 객체를 생성해준다고 하더라도 객체 내부 값도 변경 불가능한 완전한 상수를 만들어줄수 있다.

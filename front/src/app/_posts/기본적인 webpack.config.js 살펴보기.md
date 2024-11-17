---
title: '기본적인 webpack.config.js 살펴보기'
date: '2024-02-24'
description: '간단한 webpack.config.js 를 키워드별로 정리해보았습니다.'
thumbnail: 'https://dp71rnme1p14w.cloudfront.net/compressed_1708746768393--webpack.config-.png'
---

> 첫번째 미션이었던 자동차 경주의 webpack.config.js 를 간단히 키워드 별로 정리해보았습니다.

```javascript
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  devtool: 'inline-source-map',
  target: 'node',
};
```

### - entry

웹팩이 빌드를 시작하는 진입점 파일로써, ./src/index.js로 설정해두었다.

### - output

웹팩이 빌드를 한후의 결과물에 대한 설정을 정의한다.

path는 결과물이 저장될 디렉토리, filename은 생성 될 파일의 이름을 지정한다.

여기서는 dist 디렉토리에 bundle.js 란 결과물 파일을 생성해준다.

### - resolve

reslove는 `모듈 해석 방법`에 대한 설정이다.

extensions 배열에 정의 해둔 파일 확장자를 가진 파일들은 import 나 require시에 확장자명 없이 파일을 불러올수 있다.

여기서는 js와 mjs파일을 확장자 없이 불러 올수 있다.

### - module

module은 프로젝트 내의 다양한 유형의 모듈을 처리하는 방법을 정의한다.

rules 배열 내에서는 다양한 로더 (loader) 설정을 포함한다.

현재 위 파일에서는 js 파일에 대해 babel-loader를 사용하여 ES6 이상의 문법에 관하여 `babel-loader`를 사용하여 이전 버전의 자바스크립트 문법으로 변환해준다.

> 예를 들어 화살표 함수, let, const, 클래스, async/await 등등이 포함 된다.

그리고 `exclude`에 node_modules를 넣어줌으로써 해당 파일은 제외한다.

또 options의 `@babel/preset-env`는 babel을 사용하여 js 코드를 변환할때 사용하는 프리셋이다.

이는 babel이 js 코드를 변환하는 과정을 자동화 해주어서 다양한 환경에서 코드가 실행될수 있도록 해준다.

### - plugins

빌드 과정에서 추가적인 작업을 수행할 플러그인을 설정한다.

여기서는 `CleanWebpackPlugin` 를 사용했는데, 이는 빌드 전에 output.path에 지정된 디렉토리 내에서 이전 빌드 파일들을 제거하는 역할을 해준다.

### - devtool

개발 도구 설정으로, `source map`을 생성하여 개발 환경에서 디버깅을 용이하게 해준다.

소스맵이란 변환된 코드(번들 코드)를 원본 소스코드와 연결해주는 정보를 담고 있는 파일이다.

개발자 도구에서 변환전 코드를 볼수 있게 해준다.

현재 build 후에 나온 결과물을 보면 use strict후 var 변수들로 변환이 되어있는데, 이를 소스맵을 통해서 원본 소스로 볼수 있도록 해준다.

여기선 `inline-source-map`을 사용했는데, 이 inline-source-map 은 웹팩이 빌드할때 빌드 결과물과 별개로 .map 파일을 생성한다.

이는 개발 중에 발생한 오류를 편하게 디버깅 할 수 있도록 해준다.

개발자 도구에서 원본 코드 구조와 함께 오류가 난 부분을 맵핑하여 볼수 있기 때문이다.

> 이는 개발자의 편의성을 위한 도구로써, 배포환경에서는 사용하지 않는 것이 좋다. 최종 빌드 파일에 포함됨으로써 용량이 증가하고 원본 소스 코드가 포함됨으로써 보안상에도 안좋다. 대체하기 위해 `source-map` 이나 `hidden-source-map` 같은 다른 설정들이 존재한다.

### - target

target은 `빌드 대상 환경`을 지정해준다.

여기선 node로 되어있는데, Node.js 환경을 위한 코드로 빌드가 된다.

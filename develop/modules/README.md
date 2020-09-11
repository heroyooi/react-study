# React Modules

리액트 모듈을 쉽게 가져다 사용하기 위해 정리

## Import CSS · SCSS

```command
npm i css-loader style-loader -D
```
```JavaScript (webpack.config.js)
module.exports = {
  module: {
    rules: [{
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    }]
  }
}
```
- 위와 같이 했을 경우, App.jsx파일에 App.css를 import 하는 방식으로 사용할 수 있다.

```command
npm i sass-loader sass file-loader -D
```
```JavaScript (webpack.config.js)
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      }, {
        test: /\.(woff2?|ttf|otf|eot|svg|png|jpe?g|gif)$/i,
        loader: 'file-loader',
      }
    ]
  }
}
```
- scss 사용 가능해짐
- css 내부적으로 이미지나 폰트를 불러올 겨웅 file-loader로 실행시켜야함

```command
npm i postcss-loader -D
```
- postcss 관련 작성 예정

[postcss-preset-env 테스터](https://preset-env.cssdb.org/playground)

## React Router + Loadable

```command
npm i react-router react-router-dom
npm i @loadable/component
```

## React Redux + Redux (with Immer)

```command
npm i redux react-redux redux-devtools-extension immer
npm i shortid moment
```

## Axios + Lodash

```command
npm i axios lodash
```

## Swiper

```command
npm i swiper
npm i react-slick slick-carousel
```
[Swiper | React](https://swiperjs.com/react)
[Swiper | API](https://swiperjs.com/api)


## Popup

```command
npm i react-modal
```
[React Modal](https://github.com/reactjs/react-modal)

## Framer-motion

```command
npm i framer-motion@1.10.3
```
- 2버전은 ie에서 안됨

## Etc

```command
npm i react-transition-group styled-components classnames
npm i query-string
```

## IE 대응
```command
npm i react-app-polyfill
```
# React Word Cloud
리액트와 파이어베이스로 만드는 워드 클라우드앱

## 설치
```command
npm i react react-dom react-router-dom
npm i -D webpack webpack-cli webpack-dev-server
npm i -D babel-core babel-loader babel-preset-react-app
npm i @material-ui/core @material-ui/icons
npm i use-react-router
npm i react-text-truncate
npm i style-loader css-loader
```

## 강좌
[React와 Firebase로 앱 개발하기 | 10강](https://www.youtube.com/watch?v=w1c3dmwmu-8&list=PLRx0vPvlEmdCjiCfu4QB6tV7cZS4ZoTOQ&index=10)
[파이어베이스 콘솔](https://console.firebase.google.com)
[배포한 결과물](https://react-firebase-90ace.web.app)

## 배포
```command
npm i -D copy-webpack-plugin
npm i firebase-tools

npm run build
firebase login

firebase init
```

- Hosting 체크
- What do you want to use as your public directory? build
- File build/index.html already exists. Overwrite? N

```command
firebase deploy
```
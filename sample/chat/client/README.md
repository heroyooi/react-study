This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### Heroku·netlify 배포 및 REACT-REAL-CHAT 완성
1. 깃 저장소 설정
- HEROKU 대쉬보드에서 New > Create new app > Heroku CLI 인스톨

2. server 서버 설정 및 히로쿠 저장소 push
Procfile 생성
```procfile
web: node index.js
```
```Json (package.json)
{
  "scripts": {
    "start": "node index.js" // nodemon을 node로 수정
  }
}
```
```command
heroku login

git init
heroku git:remote -a react-real-chat
git add .
git commit -m '아무거나'
git push heroku master
```
- Settings 탭에서 도메인 확인

3. client 서버 완성
- 백엔드 서버 주소를 실제 서버 주소로 변경
```JavaScript (Chat.js)
const ENDPOINT = 'https://react-real-chat.herokuapp.com/'; // localhost:5000
```

4. netlify Sites에서 Client 폴더 드래그 엔 드랍

5. client 서버 실행
```command
npm i netlify-cli -g
netlify login
netlify deploy
```
- 디플로이 설정 마친 이후에 빌드하고 다시 디플로이
```command
npm run build
netlify deploy
./build
```
- 생성된 주소로 이동 이후 확인

```command
netlify deploy --prod
./build
```
[socket.io](https://socket.io)<br />
[HEROKU](https://www.heroku.com)<br />
[netlify](https://www.netlify.com)<br />
[강좌](https://www.youtube.com/watch?v=ZwFA3YMfkoc&list=PL6QREj8te1P6wX9m5KnicnDVEucbOPsqR&index=8)<br />
[결과물](https://kind-bohr-dc2039.netlify.app)

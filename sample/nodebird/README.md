# React SNS 만들기 강좌

리액트로 SNS를 만드는 풀스텍 개발 강좌입니다.


## 개념

### SSR 방식

- 브라우저 → FE 서버 → BE 서버 → 데이터베이스 → BE 서버 → FE 서버 → 브라우저

- 로딩 속도가 많이 걸린다.

### SPA 방식(CSR)

- 브라우저 → FE 서버 → 브라우저 (데이터 X)
데이터가 없기 때문에 로딩창을 띄우고 있음. 그러면서 한번 더 브라우저에서 백엔드로 요청
- 브라우저 → BE 서버 → 데이터베이스 → BE 서버 → 브라우저

- 전체적인 시간은 리액트가 더 오래 걸릴 수도 있다. 하지만 화면에 보이는 시간이 단축되서 리액트를 쓰는 것이다.
- 사용자가 빠르게 인터렉션이 필요할 때 좋다. 하지만 검색엔진에서 순위가 떨어질 수도 있다.
- 그래서 검색엔진을 위해서 SSR, 코드스플리팅이란 기술로 해결한다. 실무할 땐 꼭 적용 해야한다.


## 세팅 및 주요 내용 (Frontend)

### ch1

- Frontend Server 구성
```command
npm init
npm i next@9
npm i react react-dom
npm i prop-types
npm i eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks -D
```
- 초기 파일 설정

### ch2

```command
npm i antd styled-components @ant-design/icons
```
- antd로 페이지 코딩

### ch3

```command
npm i next-redux-wrapper
npm i redux react-redux
npm i redux-devtools-extension
npm i react-slick
```
- next-redux-wrapper 6버전
- 리덕스 설치

### ch4

```command
npm i redux-thunk
npm rm redux-thunk
npm i redux-saga next-redux-saga
npm i axios

npm i -D babel-eslint eslint-config-airbnb eslint-plugin-import
npm i -D eslint-plugin-react-hooks eslint-plugin-jsx-a11y

npm i shortid faker
npm i immer
```

### ch6

```command
npm i babel-plugin-styled-components
npm i swr
npm i moment
npm i @next/bundle-analyzer
npm i cross-env
```

- swr: next에서 만든 라이브러리, SSR이 좀 힘들다.
       SSR 할 필요없지만 불러와야하는 데이터들에 적용

- cross-env: .env 도움 없이 process.env 값을 변경
```json (package.json)
{
  "scripts": {
    "dev": "next -p 3060",
    "build": "cross-env ANALYZE=true NODE_ENV=production next build" // 윈도우에서도 실행될 수 있게끔 해준다.
  },
}
```


## 요약

- 함수형 컴포넌트에서 리렌더링 될 때 함수 안의 부분이 전부 다시 실행된다.<br />
  리턴문 안에서 바뀐 부분이 있다면, 리턴문 안의 바뀐 부분만 다시 그린다. 그래서 style을 객체로 선언하면 {} === {} 는 false로 인식하기에 다시 그린다.

- 리덕스(중앙 데이터 저장소): 앱이 안정적이다. 그러나 코드량이 많아진다.
- 비동기는 보통 3단계(요청, 성공, 실패)로 이루어진다.
- 데이터 다루는 것은 컴포넌트의 역할은 아니다. 컴포넌트에서는 데이터 요청을 안하는 것이 좋다.
  데이터 요청은 별도의 라이브러리나 모듈에서 하는 것이 좋다.
- HYDRATE: getInitialProps -> getStaticProps, getServerSideProps로 바뀜. SSR이 기존과 완전 달라져서 생김.

### thunkMiddleware 사용 예제
```JavaScript (/reducers/user.js)
export const loginAction = (data) => {
  return (dispatch, getState) => {
    const state = getState();
    setTimeout(() => {
      dispatch(loginRequestAction());
    }, 2000);
    axios.post('/api/login')
      .then((res) => {
        dispatch(loginSuccessAction(res.data));
      })
      .catch((err) => {
        dispatch(loginFailureAction(err));
      })
  }
}

const loginSuccessAction = (data) => {
  return {
    type: 'LOG_IN_SUCCESS',
    data,
  }
}
```

### saga 이펙트

- all: 동시에 실행
- fork: 제너레이터 함수를 실행(비동기 함수) - 논블록킹
- call: 제너레이터 함수를 실행(동기 함수)
- put: 객체를 dispatch

※ 여러번 요청을 보낼 경우
- takeEvery: 여러번 누른 것에 대해서 전부 실행
- takeLatest: 마지막에 누른 것만 실행(응답을 취소하고, 요청은 취소를 못한다. 서버에는 데이터가 두번 저장된다.)
- takeLeading: 처음에 누른 것만 실행(응답을 취소, 요청은 취소 못함)
- throttle: 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것(스크롤링)
- debounce: 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출되도록 하는 것(검색창 타이핑)

- 서버에서 검사를 해서 첫번째 요청은 데이터 제대로 등록해도, 두번째 요청은 중복임을 알려주고 등록을 막는 것이 좋다.(서버 검증) 프론트에서는 takeLatest로 해결.

```JavaScript
function logInAPI(data, a) {
  return axios.post('/api/login', data); // 2. data가 매개변수를 통해 전달
}
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data, 'a'); // 1. action에서 데이터 꺼냄
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data // 3. 데이터를 활용하여 dispatch
    });
  } catch (err) {}
}
```
- yield가 await와 비슷
- saga는 테스트할 때 엄청 편하다.(아래와 같이 테스트)
```JavaScript
const l = logIn({ type: 'LOG_IN_REQUEST', data: { id: 'heroyooi@naver.com' } })

l.next(); // yield call(logInAPI, action.data, 'a', 'b', 'c')
l.next(); // yield put({ type: 'LOG_IN_SUCCESS', data: result.data });
```

## 문법

- 옵셔널 체이닝(optional chaning)
```JavaScript
const id = me && me.id;
const id = me?.id; // me.id 가 있으면 그 값이 들어가고, 없으면 undefined로 바꿔준다.

const { me } = useSelector((state) => state.user.me && state.user.me.id);
const { me } = useSelector((state) => state.user.me?.id);
```

- 태그드 템플릿 리터럴(Tagged Template Literal)
```JavaScript
// 함수 호출
func()
func`` // es6

styled.div`` // styled.div가 함수
```

- 제네레이터(generator, 중단점이 있는 함수)
```JavaScript
const gen = function*() {
  console.log(1);
  yield;
  console.log(2);
  yield;
  console.log(3);
  yield 4;
}

const g = gen();

g.next(); // 1, {value: undefined, done: false}
g.next(); // 2, {value: undefined, done: false}
g.next(); // 3, {value: 4, done: false}
g.next(); // {value: undefined, done: true}
```

- 자바스크립트 함수는 쭉 실행됨.
  그러나 제네레이터는 yield에서 멈춘다.
  이 성질을 이용하는 것이 redux-saga

```JavaScript
let i = 0;
const gen = function*() {
  while (true) {
    yield i++;
  }
}

const g = gen();

g.next(); // {value: 0, done: false}
g.next(); // {value: 1, done: false}
g.next(); // {value: 2, done: false}
```

## 기능 구현 (리덕스사가 + 리듀서)

### 댓글 작성하기 구현 (더미 데이터)

1. 댓글 버튼 클릭 시, dispatch 발생, 데이터(content, postId, userId) 전달
   (/components/CommentForm)
```JavaScript
const onSubmitComment = useCallback(() => {
  dispatch({
    type: ADD_COMMENT_REQUEST,
    data: { content: commentText, postId: post.id, userId: id },
  });
}, [commentText, id]);
```

2. 사가에서 ADD_COMMENT_REQUEST 감지 및 addComment 함수 실행 (/sagas/post)
```JavaScript
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* addComment(action) { // action = { type, data }
  try {
    yield delay(1000);
    yield put({ // dispatch
      type: ADD_COMMENT_SUCCESS,
      data: action.data, // 데이터가 리듀서로 전달된다.
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}
```

3. 리듀서에서 불변성 유지하면서 다음 상태로 변화 (/reducers/user)
```JavaScript
const initialState = {
  mainPosts: [{
    id: 1,
    User: { id: 1, nickname: '히어로' },
    content: '첫 번째 게시글',
    Comments: [{/*...*/}, {/*...*/}]
  }],
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: { id: 1, nickname: '히어로' }
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
  }
}
```

4. 리듀서 immer로 가독성 해결 (/reducers/user)
```JavaScript
import produce from 'immer';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
    }
  })  
}
```

### 게시글 추가 및 삭제

1. 짹짹 버튼 클릭 시 게시글 추가 (/components/PostForm)
```JavaScript
const onSubmit = useCallback(() => {
  dispatch({
    type: ADD_POST_REQUEST,
    data: text,
  })
}, [text]);
```

2. 사가에서 ADD_COMMENT_REQUEST 감지 및 addPost 함수 실행 (/sagas/post)
```JavaScript
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* addPost(action) {
  try {
    yield delay(1000);
    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (err) { /**/ }
}
```

3. 리듀서에서 immer로 가독성을 높이며 다음 상태로 변화 (/reducers/post, /reducers/user)
```JavaScript
const initialState = {
  // post
  mainPosts: [{
    id: 1,
    User: { id: 1, nickname: '히어로' },
    content: '첫 번째 게시글',
    Comments: [{/*...*/}, {/*...*/}]
  }],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  // user
  me: {
    email: 'heroyooi@naver.com',
    password: 'qwer1234',
    nickname: '히어로',
    id: 1,
    Posts: [{ id: 1 }],
    Followings: [],
    Followers: [],
  }
};

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: { id: 1, nickname: '히어로', },
  Images: [],
  Comments: [],
});

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // post
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(dummyPost(action.data));
        break;

      // user
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
    }
  })
}
```

4. 내 게시글 삭제 (/components/PostCard)
```JavaScript
const onRemovePost = useCallback(() => {
  dispatch({
    type: REMOVE_POST_REQUEST,
    data: post.id, // post는 PostCard 컴포넌트의 props
  });
}, []);
```

5. 사가에서 REMOVE_POST_REQUEST 감지 및 removePost 함수 실행 (/sagas/post)
```JavaScript
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* removePost(action) {
  try {
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) { /**/ }
}
```

6. 리듀서에서 immer로 가독성을 높이며 다음 상태로 변화 (/reducers/post, /reducers/user)
```JavaScript
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // post reducer
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        break;

      // user reducer
      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
        break;
    }
  })
}
```

### 게시글 불러오기 및 인피니티 스크롤링

1. 페이지 로드 시 게시글 불러오기 (/pages/index)
```JavaScript
useEffect(() => {
  dispatch({
    type: LOAD_POSTS_REQUEST,
  });
}, []);
```

2. 사가에서 LOAD_POSTS_REQUEST 감시 및 loadPosts 함수 실행 (/sagas/post)
```JavaScript
function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* loadPosts(action) {
  try {
    yield delay(1000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10), // generateDummyPost: 리듀서에서 정의해논 함수
    });
  } catch (err) { /**/ }
}
```

3. 리듀서에서 immer로 가독성을 높이며 다음 상태로 변화 (/reducers/post)
```JavaScript
const initialState = {
  mainPosts: [],
  hasMorePost: true,
  loadPostsLoading: false,
  loadPostsDone: false,
};

export const generateDummyPost = (number) => Array(number).fill().map(() => ({
  id: shortId.generate(),
  User: { id: shortId.generate(), nickname: faker.name.findName() },
  content: faker.lorem.paragraph(),
  Images: [{ src: faker.image.image() }],
  Comments: [{
    User: { id: shortId.generate(), nickname: faker.name.findName() },
    content: faker.lorem.sentence(),
  }],
}));

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePost = draft.mainPosts.length < 50; // 게시글 50개 이하로 제한
    }
  })
}
```

4. 인피니티 스크롤링 구현 (/pages/index)
```JavaScript
useEffect(() => {
  function onScroll() {
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      if (hasMorePost && !loadPostsLoading) {
        dispatch({
          type: LOAD_POSTS_REQUEST,
        });
      }
    }
  }
  window.addEventListener('scroll', onScroll);
  return () => {
    window.removeEventListener('scroll', onScroll);
  };
}, [hasMorePost, loadPostsLoading]);
```

## 세팅 및 주요 내용 (Backend)

### 프로그램 인스톨

[MySQL 커뮤니티 다운로드](https://dev.mysql.com/downloads)
[DataGrip | ERD](https://www.jetbrains.com/ko-kr/datagrip)

### ch5

- Backend Server 구성
```command
npm init
npm i express
npm i sequelize sequelize-cli mysql2
npm i bcrypt cors
npm i passport passport-local
npm i express-session cookie-parser
npm i dotenv
npm i morgan
npm i multer
npm i -D nodemon
nodemon app
```
- mysql2: 노드와 MySQL을 연결해주는 드라이버
- sequelize: 자바스크립트로 SQL을 조작할 수 있게 해주는 라이브러리(ORM)

```command
npx sequelize init
```
- 시퀄라이즈 세팅

```command
npx sequelize db:create
```

### ch6

## 개념

### 익스프레스 라우팅

app.get     : 가져오다
app.post    : 생성하다
app.put     : 전체 수정
app.delete  : 제거
app.patch   : 부분 수정(닉네임, 게시글)
app.options : 찔러보기(서버야, 내가 요청 보내면 받아줄래?)
app.head    : 헤더만 가져오기(헤더/바디)

브라우저(3060) - 프론트 서버(Next)(3060) - 백엔드 서버(express)(3065) - MySQL(3306)

### 응답 - 상태코드(HTTP STATUS CODE)

- 요청/응답은 헤더(상태, 용량, 시간, 쿠키)와 바디(데이터)로 구성되어 있다.
```JavaScript
res.status(200).send('ok');
res.status(403).send('이미 사용중인 아이디입니다.');
res.status(403).send('존재하지 않는 게시글입니다.');
```
- 200 : 성공 (201 - 잘 생성됨)
- 300 : 리다이렉트
- 400 : 클라이언트 에러
- 500 : 서버 에러

[HTTP 상태 코드](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)

### CORS

- 브라우저에서 서버로 요청을 보냈을 때는 CORS 문제가 생길 수 있다.
- 서버에서 서버로 요청을 보냈을 때는 CORS 문제가 생기지 않는다.
- 브라우저에서 프론트 서버로, 프론트 서버에서 백엔드 서버로 보냈다가,
  백엔드 서버에서 프론트 서버로, 프론트 서버에서 브라우저로 보내는 방식(proxy 방식)

### 쿠키와 섹션

- 백엔드 서버에서 프론트 서버로 유저정보를 쿠키(cxlhy)로 보내준다.
- 백엔드 서버에서는 섹션(cxlhy)으로 저장한다.

### 서버사이드렌더링

- 넥스트를 사용하는 주된 이유가 SSR이다. 넥스트는 SSR를 편하게 해준다.
- SSR를 사용하지 않을 거라면 순수 리액트로 개발해도 된다.
- 넥스트 8버전과 9버전이 SSR 방법이 많이 달라졌다.
- getServerSideProps, getStaticProps 차이점<br />
  언제 접속해도 데이터가 바뀔 일이 없으면 getStaticProps<br />
  접속할 때마다 접속한 상황에 따라서 화면이 바뀌어야 하면 getServerSideProps<br />
  getStaticProps는 쓰기가 까다롭고, 왠만하면 getServerSideProps를 많이 사용하게 된다.<br />
  getStaticProps는 서버에 무리가 가지 않도록 하면서 html로 화면을 제공하는 서비스,
  막상 getStaticProps를 사용할 수 있는 서비스가 많지 않다.
```JavaScript
import withReduxSaga from 'next-redux-saga'; // 사라짐
Home.getInitialProps; // 조만간 없어질 예정
```
- CSR은 요청을 두번 보내야하는데, SSR은 요청을 한번만 보낸다.

## 문법

- 구조 분해하면서 변수명 바꾸는 법
```JavaScript
const { Strategy: LocalStrategy } = require('passport-local');
import Strategy as LocalStrategy from 'passport-local';
```
- Strategy를 LocalStrategy로 바꿈

## AWS 배포

### 회원 가입 (해외 카드 인증절차 포함)

- AWS ID: heroyooi1018@gmail.com
- 미국 동부 선택
- KB 국민체크 카드 VISA로 인증함 (결제되지 않도록 조심)

### EC2 설정

- 전체 서비스 > 컴퓨팅 > EC2 > 인스턴스 시작
- Ubuntu Server 18.04 LTS(HVM), SSD Volume Type 선택
  프리 티어 사용 가능(공짜라는 의미): 실무에서는 제한적
- 6. 보안 그룹 구성 > 규칙 추가 (HTTP, HTTPS) > 검토 및 시작 > 시작하기
  팝업 뜨면 새 키 페어 생성 선택, 키 페어 이름: react-nodebird > 키 페어 다운로드 > react-nodebird.pem 파일 다운로드 되는데 잘 갖고 있어야 한다. 루트 폴더로 이 파일을 옮겨준다.
  인스턴스 시작

- 다시 EC2로 가기 > 인스턴스 상태가 pending에서 running되면 실행할 수 있다. Name을 front로 만들어주기
  상단 작업 셀렉트 박스에서 기존 인스턴스를 기반으로 시작 > 시작하기 > 기존 키 페어 선택 > 체크박스 체크 후 인스턴스 시작

*** 유료 결제 위험이 있기 때문에 인스턴스 front, back을 실습할 때만 사용하다가, 인스턴스 상태를 중지로 해놓아야한다. 종료해서 아예 없애도 된다.

### gitignore 항목 추가

- react-nodebird.pem
- node_modules
- .env
- .next

### github 저장소 생성 및 세팅

- 프로젝트 폴더에서 다음 코드 실행
```command
git init
git remote add origin https://github.com/heroyooi/react-nodebird.git
git add .
git commit -m "prepare for aws"
git push origin master
```

### aws 서버에 저장소 소스 업로드 및 설치

#### aws 서버 에다가 소스코드를 보내는 방법
1. aws에서 제공하는 툴로 코드를 서버로 ftp 방식으로 보냄.
2. 깃헙을 사용하여 소스 코드를 다운 받을 수 있음.
2번 방법으로 실행!

- EC2 대쉬보드에서 front만 체크하고 연결 클릭
- 4. 퍼블릭 DNS을(를) 사용하여 인스턴스에 연결 아래 주소 복사

- 프로젝트 루트 폴더에서 bash로 터미널 열고 아래 명령어 실행
```bash
ssh -i "react-nodebird.pem" ubuntu@ec2-54-242-186-91.compute-1.amazonaws.com
yes
```

- 연결되면 git clone 깃헙 주소 실행 및 프론트 폴더로 접근
```bash
git clone https://github.com/heroyooi/react-nodebird
ls
cd react-nodebird
cd front
```
- 변경사항이 있다면 주기적으로 받아와야한다.
```bash
git pull
```

- 우분투 명령어
  · ls: 현재 폴더, 파일 검색 // react-nodebird<br />
  · ls -al: 더 자세하게 검색<br />
  · pwd: 현재 위치 확인 // /home/ubuntu

  [ubuntu 노드 설치](https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions)

```bash
sudo apt-get update
sudo apt-get install -y build-essential
sudo apt-get install curl // curl이 설치되어 있으면 생략해도됨
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash --
sudo apt-get install -y nodejs
```

- 설치 후 제대로 깔렸는지 확인 후 npm 설치
```bash
node -v
npm -v
npm i
npm run build
```
- aws 임대하는 서버의 메모리가 모자르면 빌드가 안될 수도 있다. 프로젝트 규모가 커지면 인스턴스에서 메모리가 큰 걸 골라줘야한다.

- 동일한 방법으로 back 서버도 설치
- 프로젝트 루트 폴더에서 bash로 터미널 열고 아래 명령어 실행
```bash
ssh -i "react-nodebird.pem" ubuntu@ec2-52-3-246-13.compute-1.amazonaws.com
yes

git clone https://github.com/heroyooi/react-nodebird
ls
cd react-nodebird
cd back
sudo apt-get update
sudo apt-get install -y build-essential
sudo apt-get install curl // curl이 설치되어 있으면 생략해도됨
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash --
sudo apt-get install -y nodejs
node -v
npm -v
npm i
```

```bash
wget -c https://repo.mysql.com//mysql-apt-config_0.8.13-1_all.deb
sudo dpkg -i mysql-apt-config_0.8.13-1_all.deb
sudo apt update
sudo apt-get install mysql-server // 1번
```

[ubuntu mysql 설치](https://www.tecmint.com/install-mysql-8-in-ubuntu/)

```bash
sudo su
passwd root
// 비밀번호 설정 (두번 입력)
exit

sudo su
mysql_secure_installation
y
0 or 2
// 비밀번호 설정
Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) : y
Remove anonymous users? (Press y|Y for Yes, any other key for No) : y
Disallow root login remotely? (Press y|Y for Yes, any other key for No) : y
Remove test database and access to it? (Press y|Y for Yes, any other key for No) : y
Reload privilege tables now? (Press y|Y for Yes, any other key for No) : y
```

- 원격으로 .env 생성 및 내용 입력, 저장
```bash
vim .env
a // -- INSERT -- 로 바뀌면 글짜 입력

COOKIE_SECRET=nodebirdsecret
DB_PASSWORD=설정한비밀번호

ESC
:wq
```
- .env 파일 확인
```
ls -a
cat .env
npm start
```

- DB 생성
```bash
mysql -uroot -p
설정한비밀번호입력
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '설정한비밀번호';
exit;

npx sequelize db:create
```

- 포트번호 변경
```
vim app.js

a // --- INSERT -- 로 바뀌면 포트번호 80으로 수정
:wq

npm start
```
- 서버가 돌아가는 것을 확인할 수 있다. npm start를 했을 경우 shell 을 끄면 서버가 멈춘다.

```bash
npm i pm2
```
```Json
{
  "script": {
    "start": "pm2 start app.js"
  }
}
```
```bash
sudo npm start && sudo npx pm2 monit
```
- 이렇게 바꾸고 하면 shell를 꺼도 서버가 멈추지 않는다.
- 원리: 노드가 백그라운드 프로세스로 돌아가기 때문에


```bash
sudo npx pm2 kill
```
```bash
sudo npx pm2 list
```
```bash
sudo npx pm2 reload all
```

## 강좌 | aws 배포하기1 | 1:13:00
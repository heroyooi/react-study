# React 기본 강좌

리액트로 웹게임을 만드는 강좌입니다.

## 세팅

```command
npm init
npm i react react-dom
npm i -D webpack webpack-cli
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader
npm i -D @babel/plugin-proposal-class-properties
npm i -D react-hot-loader webpack-dev-server
```
- babel-loader: 바벨이랑 웹팩은 연결해준다.

## 요약

- 예전 state로 새로운 state를 만드는 경우 아래와 같이 한다.
```JavaScript
// 숫자야구 class
this.setState((prevState) => {
  return {
    result: '홈런!',
    tries: [...prevState.tries, { try: value, result: '홈런!' }]
  }
});

// 숫자야구 hooks
setTries((prevTries) => {
  return [...prevTries, { try: value, result: '홈런!' }]
});
```

- 비동기인 state에서 따라서 뭔가를 처리하려면 useEffect를 써줘야한다.

### 리렌더링

- state나 props가 바뀌면 리렌더링 된다.
- setState를 호출해도 리렌더링 된다. 그래서 shouldComponentUpdate를 사용해서 렌더링 조건을 설정해줘야한다. 혹은 PureComponent로 extends 해주면 된다.
- 하지만, PureComponent를 사용할 경우 배열이나 객체 참조 관계의 변화를 잘 감지하지 못하여 리렌더링 된다.
```JavaScript
shouldComponentUpdate(nextProps, nextState, nextContext) {
  if (this.state.counter !== nextState.counter) {
    return true;
  }
  return false;
}
```

- 자식 컴포넌트는 props를 직접 바꾸지 않는다. 바꾸고 싶으면 props를 state로 받아서 setState로 바꿔줘야한다.

### 라이프사이클

- 클래스형
constructor -> render -> ref -> componentDidMount<br />
(setState/props 바뀔때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate<br />
부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸


### 메모리 누수를 막기 위한 비동기 처리

- 클래스형
```JavaScript
componentDidMount() { // 컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청을 많이 해요
  this.interval = setInterval(this.changeHand, 100);
}

componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 해요
  clearInterval(this.interval);
}
```

- 훅스형
```JavaScript
useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
  interval.current = setInterval(changeHand, 100);
  return () => { // componentWillUnmount 역할
    clearInterval(interval.current);
  }
}, [imgCoord]);
```

### componentDidUpdate만, componentDidMount X

```JavaScript
const mounted = useRef(false);
useEffect(() => {
  if (!mounted.current) {
    mounted.current = true;
  } else {
    // ajax
  }
}, [바뀌는값]);
```

### 기타 Hooks

- useMemo: 함수 결과값을 기억
- useCallback: 함수 자체를 기억
- useRef: 일반 값을 기억

### 자바스크립트 문법 및 개념

#### 숫자 객체

- Math.random() : 0 이상 1 미만의 난수
- Math.ceil(n) : 올림
- Math.floor(n) : 내림

#### 배열 객체

```JavaScript
[1, 2, 3, 4].splice(2, 1);
// [3], 배열 객체에 지정 데이터를 삭제

[0, 1, 2].reduce((a, c) => a + c);
// 3, 숫자 배열 오소들 더하기

[1, 2, 3, 4, 5].slice(3, 4);
// [4], 원하는 인덱스 구간만큼 잘라서 배열 객체로 가져옴

[1, 5, 7, 9].join('');
// "1579", 배열 객체에 데이터를 연결 문자 기준으로 1개의 문자형 데이터로 반환

this.timeouts.forEach((v) => clearTimeout(v));
// 배열 전체를 돌며 해당 배열의 요소에 직접 어떤 작업을 수행하고 싶을 때 사용

Array(rowData.length).fill().map((td, i) => <Td rowIndex={rowIndex} cellIndex={i}>{''}</Td>)
// Array(rowData.length).fill(): rowData.length 갯수만큼 채운 배열 생성 이후,
// .map((td, i) => <Td rowIndex={rowIndex} cellIndex={i}>{''}</Td>): 배열 전체를 돌며 배열값을 사용해서 Td 컴포넌트를 만들어낸다.
```

### 리액트 라우터

#### 추가 설치

```command
npm i react-router react-router-dom
```

#### 개념

- 리액트 라우터는 눈속임이다. 실제로 페이지가 바뀌는 것이 아니라 바뀌는 척을 하는 것이다.
- Link는 a태그이긴 하지만, Route를 불러주는 역할을 한다.
- 해쉬(#)라우터인 경우 주소를 브라우저는 알지만, 서버는 알지 못한다.<br />
  검색 엔진이 페이지를 인식하지 못한다. 그래서 실무에선 해쉬라우터를 쓰지 않는다.<br />
  차라리 쿼리스트링을 사용하는 것이 좋다.
- 브라우저 라우터를 사용해도 SEO를 위해 따로 세팅이 필요하다.<br />
  브라우저 라우터를 사용하면 새로고침 시 페이지가 안뜬다. 서버쪽의 세팅이 필요하다.
- 리액트 라우터에서 history.pushState()를 사용한다.
```JavaScript
history.pushState('', '', '/hello'); // 브라우저에서 지원
```
- 쿼리스트링은 서버도 알아챈다. 리액트 라우터에서는 쿼리스트링 해석하는 것을 제공하지 않아서 아래와 같이 URLSearchParams를 사용하는 것이 좋다.
```JavaScript
let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
console.log(urlSearchParams.get('hello'));
```
- exact를 붙이면 path와 정확하게 일치하는 경우만 보여준다.
```JavaScript
<Switch>
  <Route exact path="/game/number-baseball" render={(props) => <GameMatcher {...props} />} />
</Switch>
```

### 강좌

[리액트 기본 강좌, 8-4. 지뢰찾기](https://www.youtube.com/watch?v=ShPSG3UmzkY&list=PLcqDmjxt30RtqbStQqk-eYMK8N-1SYIFn&index=59)
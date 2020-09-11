const myLogger = store => next => action => {
  console.log(action); // 먼저 액션을 출력
  const result = next(action); // 다음 미들웨어 (또는 리듀서)에게 액션을 전달

  console.log('\t', store.getState()); // 업데이트 이후의 상태를 조회

  return result; // 여기서 반환하는 값은 dispatch(action)의 결과물이 된다. 기본: undefined
};

export default myLogger;
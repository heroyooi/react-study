import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers';

const loggerMiddleware = (store) => (next) => (action) => {
  console.log('로깅', action);
  next(action);
};

const enhancer = process.env.NODE_ENV === 'production'
  ? compose(
    applyMiddleware(
      loggerMiddleware,
    ),
  )
  : composeWithDevTools(
    applyMiddleware(
      loggerMiddleware,
    ),
  );

const store = createStore(reducer, enhancer);

export default store;
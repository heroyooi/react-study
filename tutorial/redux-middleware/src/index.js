import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import myLogger from './middlewares/myLogger';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const isDev = process.env.NODE_ENV === 'development';
const customHistory = createBrowserHistory();
const middlewares = [ReduxThunk.withExtraArgument({ history: customHistory }), logger]; // logger 를 사용하는 경우, logger 가 가장 마지막에 와야한다.
const enhancer = isDev
  ? composeWithDevTools(applyMiddleware(...middlewares))
  : compose(applyMiddleware(...middlewares))
const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <BrowserRouter>
    <Router history={customHistory}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();

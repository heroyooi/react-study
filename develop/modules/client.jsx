import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import App from './App';

const Hot = hot(App);

ReactDOM.render(
  <Provider store={store}>
    <Hot />
  </Provider>,
  document.querySelector('#root')
);
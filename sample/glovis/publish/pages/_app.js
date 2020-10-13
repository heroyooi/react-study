import React, { useState, createContext } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import withReduxStore from '@src/store/with-redux-store';
import 'react-app-polyfill/stable';

const AutobellApp = ({Component, pageProps, reduxStore}) => {
  return (
    <Provider store={reduxStore}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </Provider>
  );
}

export default withReduxStore(AutobellApp);

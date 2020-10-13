import React from 'react';
import { ieBrowserCheck } from '../utils/CommonUtil';
import { initializeStore } from '.';

const UAParser = require('ua-parser-js/dist/ua-parser.min');
const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default (App) => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      let headers = {};
      let deviceType = 'desktop';

      if (isServer) {
        headers = appContext.ctx.req.headers;
        const UA = new UAParser(headers['user-agent']);
        deviceType = UA.getDevice().type || 'desktop';
      }

      const initialState = {
        common: {
          deviceType: deviceType,
          hasMobile: deviceType !== 'desktop',
          isIE: ieBrowserCheck(headers['user-agent']),
          isSection: null,
          mHeaderType: '',
          mHeaderTitle: '',
          mHeaderOptions: [],
          mPdBottom: 0,
          mBgColor: '#ffffff',
          hasHyundai: true,
          mFullpagePopup: false,
          mFullpagePopupTitle: '',
          mFullpagePopupOptions: [],
          mFullpageCPopup: false,
          mFullpageCPopupTitle: '',
          mFullpageCPopupOptions: [],
          mFooterExist: null,
          mQuickExist: null,
          mQuickBottom: 0
        }
      };

      const reduxStore = getOrCreateStore(initialState);

      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      };
    }

    constructor(props) {
      super(props);
      // eslint-disable-next-line react/prop-types
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};

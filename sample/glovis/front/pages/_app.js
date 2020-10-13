import App from 'next/app';
import React from 'react';
import Router from 'next/router';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { isEmpty } from 'lodash';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import withReduxStore from '@src/store/with-redux-store';
import RenderHelper from '@lib/share/render/helper';
import SystemProvider from '@src/provider/SystemProvider';
import { axiosPost } from '@src/utils/HttpUtils';
import { excludeUrl } from '@src/utils/PageAuthInfoUtil';
import { accessTokenValidMinute, refreshTokenValidMinute, setCookieExpireTime } from '@src/utils/LoginUtils';
import Error from './404.js';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

class AutobellApp extends App {
  componentDidMount() {
    // 헤드에 스크립트 삽입
    const w = globalThis?.window;
    const d = globalThis?.window?.document;
    const s = 'script';
    const l = 'dataLayer';
    const i = 'GTM-MXRQWBL';

    w[l] = w[l] || [];
    w[l].push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    const j = d.createElement(s);
    const dl = l !== 'dataLayer' ? '&l=' + l : '';

    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    d.head.appendChild(j);

    // datalayer 스크립트 삽입
    w.dataLayer = w.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-163217058-4');

    Router.events.on('routeChangeComplete', () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });

    this.refreshToken();
  }

  static async getInitialProps(appContext) {
    const { Component, ctx } = appContext;
    const helper = new RenderHelper(ctx);
    const { reduxStore, pathname: pathName, res } = helper;
    const { hasMobile } = reduxStore.getState().common;

    let isError = false;
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // 모든 에러코드 200으로 설정
    // eslint-disable-next-line no-unused-expressions
    res?.status(200);

    const menuAuthruleCd = ctx?.req?.cookies?.menuAuthruleCd ?? Cookies.get('menuAuthruleCd') ?? null;

    if (excludeUrl.includes(pathName) === false && pathName.includes('/_next/') === false && pathName.includes('/picture/') === false) {
      let authRuleCdString = '';
      let tokenflag = false;
      const isLoginState = isEmpty(menuAuthruleCd) ? false : true;

      if (isEmpty(menuAuthruleCd)) {
        //비로그인
        if (hasMobile) authRuleCdString = 'MA1';
        //모바일 비로그인 권한
        else authRuleCdString = 'A1'; //PC 비로그인 권한
      } else {
        tokenflag = true;
        if (hasMobile) authRuleCdString = 'M' + menuAuthruleCd;
        else authRuleCdString = menuAuthruleCd;
      }

      const param = { siteDivCd: '0010', authRuleCd: authRuleCdString, tranSrc: pathName };
      const loginStateUrl = '/api/dashboard/selectPageAuthCheck.do';
      const noneLoginStateUrl = '/api/front/selectPageAuthCheck.do';
      isError = await axiosPost(isLoginState ? loginStateUrl : noneLoginStateUrl, param, tokenflag).then((res) => {
        if (res.data.statusinfo.returncd !== 'SUCCESS') {
          return true;
        }
        return false;
      });
    }

    return {
      pageProps,
      isError
    };
  }

  componentDidUpdate() {
    this.refreshToken();
  }

  refreshToken = () => {
    const refreshToken = Cookies?.get('refreshToken');
    console.log('refreshToken>refreshToken=%o', refreshToken);

    if (!isEmpty(refreshToken)) {
      axiosPost('/api/auth/tokenRefresh.do', {}, true, refreshToken).then((res) => {
        if (res.data.statusinfo.returncd === 'SUCCESS') {
          const decodeJWT = jwt.decode(res.data.accessToken);
          console.log('refreshToken>decodeJWT=%o', decodeJWT);
          Cookies.set('accessToken', res.data.accessToken, setCookieExpireTime(accessTokenValidMinute));
          Cookies.set('refreshToken', res.data.refreshToken, setCookieExpireTime(refreshTokenValidMinute));
          Cookies.set('type', 'member', setCookieExpireTime(accessTokenValidMinute));
          Cookies.set('membertype', decodeJWT.type, setCookieExpireTime(accessTokenValidMinute));
          Cookies.set('id', decodeJWT.id, setCookieExpireTime(accessTokenValidMinute));
          Cookies.set('mbAuthCd', res.data.mbAuthCd, setCookieExpireTime(accessTokenValidMinute));
          Cookies.set('mbLiveshotYn', res.data.mbLiveshotYn, setCookieExpireTime(accessTokenValidMinute));
          Cookies.set('menuAuthruleCd', res.data.menuAuthruleCd, setCookieExpireTime(accessTokenValidMinute));
        }
      });
    }
  };

  render() {
    const { Component, pageProps, reduxStore, isError } = this.props;
    const persistor = persistStore(reduxStore);

    if (isError) {
      return (
        <Provider store={reduxStore}>
          <CookiesProvider>
            <SystemProvider>
              <Error {...pageProps} />
            </SystemProvider>
          </CookiesProvider>
        </Provider>
      );
    }

    return (
      <Provider store={reduxStore}>
        <CookiesProvider>
          <SystemProvider>
            <PersistGate loading={<Component {...pageProps} />} persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </SystemProvider>
        </CookiesProvider>
      </Provider>
    );
  }
}

export default withReduxStore(AutobellApp);

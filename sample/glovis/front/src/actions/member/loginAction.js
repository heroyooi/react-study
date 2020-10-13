import { isEmpty } from 'lodash';
import { useCookies } from 'react-cookie';
import { axiosPost, axiosGet } from '@src/utils/HttpUtils';
import * as types from './loginTypes';

const postNonMemberLoginURI = '/api/auth/nonmembertoken.do';
const postLoginURI = '/api/auth/token.do';
const postTokenRefreshURI = '/api/auth/tokenRefresh.do';
const postTokenCheckURI = '/api/member/selectEnEprInfo.do';
const getCaptchaKeyURI = '/api/member/selectCaptchaImage.do';

export const postLogin = (data) => (dispatch) => {
  // const res = await axiosGetAsync(`/myBoardList/${userId}`, cancelToken);
  console.log('loginAction> param data=' + JSON.stringify(data));
  // let token = '';
  axiosPost(postLoginURI, data, false)
    .then(({ data }) => {
      console.log('=========================================');
      console.log('loginAction>data=' + JSON.stringify(data));
      dispatch({
        type: types.POST_LOGIN,
        payload: data
      });
    })
    .catch((err) => {
      console.log(err);
    });

  console.log('[POST_LOGIN] token:', data);
};

export const postNonMemberLogin = (data) => (dispatch) => {
  // const res = await axiosGetAsync(`/myBoardList/${userId}`, cancelToken);
  console.log('loginAction> param data=' + JSON.stringify(data));
  // let token = '';
  axiosPost(postNonMemberLoginURI, data, false)
    .then(({ data }) => {
      console.log('=========================================');
      console.log('loginAction>data=' + JSON.stringify(data));
      dispatch({
        type: types.POST_NONMEMBER_LOGIN,
        payload: data
      });
    })
    .catch((err) => {
      console.log(err);
    });

  console.log('[NONMEMBER_POST_LOGIN] token:', data);
};

export const postLogout = () => (dispatch) => {
  const logOutUrl = `/api/auth/front/logout.do`;
  // axiosPost(logOutUrl)
  //   .then(({ data }) => {
  //     dispatch({
  //       type: types.POST_LOGOUT,
  //       payload: data
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  dispatch({
    type: types.POST_LOGOUT,
    payload: ''
  });
};

export const postTokenRefresh = (data, refreshToken) => (dispatch) => {
  // const res = await axiosGetAsync(`/myBoardList/${userId}`, cancelToken);
  console.log('loginAction>postTokenRefresh> param data=' + JSON.stringify(data));
  // let token = '';
  axiosPost(postTokenRefreshURI, data, true, refreshToken)
    .then(({ data }) => {
      console.log('loginAction>data=' + JSON.stringify(data));
      dispatch({
        type: types.POST_TOKEN_REFRESH,
        payload: data
      });
    })
    .catch((err) => {
      console.log(err);
    });

  console.log('[POST_TOKEN_REFRESH] token:', data);
};

export const postTokenCheck = (data, accessToken) => (dispatch) => {
  // const res = await axiosGetAsync(`/myBoardList/${userId}`, cancelToken);
  console.log('loginAction>postTokenRefresh> param data=' + JSON.stringify(data));
  // let token = '';
  axiosPost(postTokenCheckURI, data, accessToken)
    .then(({ data }) => {
      console.log('postTokenCheck>data=' + JSON.stringify(data));
      dispatch({
        type: types.POST_TOKEN_CHECK,
        payload: data
      });
    })
    .catch((err) => {
      console.log(err);
    });

  console.log('[POST_TOKEN_CHECK] token:', data);
};

export const getCaptchaKey = (data) => (dispatch) => {
  // const res = await axiosGetAsync(`/myBoardList/${userId}`, cancelToken);
  console.log('loginAction> param data=' + JSON.stringify(data));
  // let token = '';
  axiosGet(getCaptchaKeyURI)
    .then(({ data }) => {
      console.log('=========================================');
      console.log('loginAction>data=' + JSON.stringify(data));
      dispatch({
        type: types.GET_CAPTCHA_KEY,
        payload: data
      });
    })
    .catch((err) => {
      console.log(err);
    });

  console.log('[POST_LOGIN] token:', data);
};

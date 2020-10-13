import { isEmpty } from 'lodash';
import { useCookies } from 'react-cookie';
import { axiosPost, axiosPostTokenRefresh } from '@src/utils/HttpUtils';
import * as types from './loginTypes';

const postLoginURI = 'http://localhost:8080/autobell_api/auth/token.do';
const postTokenRefreshURI = 'http://localhost:8080/autobell_api/auth/tokenRefresh.do';
const postTokenCheckURI = 'http://localhost:8080/autobell_api/member/selectEnEprInfo.do';

export const postLogin = (data) => (dispatch) => {
  // const res = await axiosGetAsync(`/myBoardList/${userId}`, cancelToken);
  console.log('loginAction> param data=' + JSON.stringify(data));
  // let token = '';
  axiosPost(postLoginURI, JSON.stringify(data))
    .then(({ data }) => {
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

export const postLogout = () => (dispatch) => {
  // const res = await axiosPost(url, data);

  console.log('[POST_OUT] res:');
  dispatch({
    type: types.POST_LOGOUT,
    payload: ''
  });
};

export const postTokenRefresh = (data, refreshToken) => (dispatch) => {
  // const res = await axiosGetAsync(`/myBoardList/${userId}`, cancelToken);
  console.log('loginAction>postTokenRefresh> param data=' + JSON.stringify(data));
  // let token = '';
  axiosPost(postTokenRefreshURI, JSON.stringify(data), refreshToken)
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
  axiosPost(postTokenCheckURI, JSON.stringify(data), accessToken)
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

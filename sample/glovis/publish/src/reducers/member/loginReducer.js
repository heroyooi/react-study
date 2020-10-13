import { produce } from 'immer';
import jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';
import * as types from '@src/actions/member/loginTypes';

const initialState = {
  isLogin: false,
  loginReturnCd: '',
  id: '',
  name: '',
  accessToken: '',
  userInfo: {
    userName: '더미...'
  }
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case types.POST_LOGIN: {
      console.log('loginReducer 16> POST_LOGIN', action);

      return produce(state, (draft) => {
        if (action.payload.statusinfo.returncd === 'SUCCESS') {
          console.log('loginReducer > jwt.decode', jwt.decode(action.payload.accessToken));
          const decodeJWT = jwt.decode(action.payload.accessToken);
          draft.userInfo = action.payload;
          draft.isLogin = true;
          draft.loginReturnCd = action.payload.statusinfo.returncd;
          draft.id = decodeJWT.id;
          draft.name = decodeJWT.name;
          draft.accessToken = action.payload.accessToken;
          draft.refreshToken = action.payload.refreshToken;
          // console.log('loginReducer > decodeJWT.id', decodeJWT.id);
          // console.log('loginReducer > decodeJWT.name', decodeJWT.name);
        } else {
          draft.isLogin = false;
          draft.loginReturnCd = action.payload.statusinfo.returncd;
        }

        // console.log('loginReducer > draft', draft);
        // console.log('loginReducer > state', state);
      });
    }
    case types.POST_LOGOUT: {
      console.log('loginReducer > POST_LOGOUT', action);

      return produce(state, (draft) => {
        draft.isLogin = false;
        draft.id = '';
        draft.name = '';
        draft.accessToken = '';
        draft.refreshToken = '';
        draft.loginReturnCd = '';
      });
    }
    case types.POST_TOKEN_REFRESH: {
      console.log('loginReducer 50> POST_TOKEN_REFRESH', action);

      return produce(state, (draft) => {
        if (action.payload.statusinfo.returncd === 'SUCCESS') {
          console.log('loginReducer > jwt.decode', jwt.decode(action.payload.accessToken));
          const decodeJWT = jwt.decode(action.payload.accessToken);

          draft.userInfo = action.payload;
          draft.isLogin = true;
          draft.loginReturnCd = action.payload.statusinfo.returncd;

          draft.id = decodeJWT.id;
          draft.name = decodeJWT.name;
          draft.accessToken = action.payload.accessToken;
          draft.refreshToken = action.payload.refreshToken;
          // console.log('loginReducer > decodeJWT.id', decodeJWT.id);
          // console.log('loginReducer > decodeJWT.name', decodeJWT.name);
        } else {
          draft.isLogin = false;
          draft.loginReturnCd = action.payload.statusinfo.returncd;
        }
      });
    }
    case types.POST_TOKEN_CHECK: {
      console.log('loginReducer > POST_TOKEN_CHECK', action);

      return produce(state, (draft) => {
        if (action.payload.statusinfo.returncd === '000') {
          draft.userInfo = action.payload;
          draft.isLogin = true;
          draft.loginReturnCd = action.payload.statusinfo.returncd;
        } else {
          draft.isLogin = false;
          draft.loginReturnCd = action.payload.statusinfo.returncd;
        }
      });
    }
    default:
      return state;
  }
}

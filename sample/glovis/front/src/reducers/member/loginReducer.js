import { produce } from 'immer';
import jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';
import * as types from '@src/actions/member/loginTypes';

const initialState = {
  isLogin: false,
  loginReturnCd: '',
  loginReturnMsg: '',
  id: '',
  name: '',
  type: '',
  membertype: '',
  auctPrstlsMbCustno: '',
  auctPrstlsNrmlMbCustno: '',
  accessToken: '',
  menuauthrulecd: '',
  mbLiveshotYn: '',
  mbAuthCd: '',
  wthdHMap: {}
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case types.POST_LOGIN: {
      //console.log('loginReducer 16> POST_LOGIN', action);

      return produce(state, (draft) => {
        if (
          action.payload.statusinfo.returncd === 'SUCCESS' ||
          action.payload.statusinfo.returncd === 'MBR5001' ||
          action.payload.statusinfo.returncd === 'MBR5002' ||
          action.payload.statusinfo.returncd === 'MBR5003' ||
          action.payload.statusinfo.returncd === 'MBR5005'
        ) {
          // 로그인 후 process
          console.log('===========================================================================1');
          console.log('loginReducer > jwt.decode', jwt.decode(action.payload.accessToken));
          const decodeJWT = jwt.decode(action.payload.accessToken);
          draft.userInfo = action.payload;
          draft.isLogin = true;
          draft.loginReturnCd = action.payload.statusinfo.returncd;
          draft.id = decodeJWT.id;
          draft.name = decodeJWT.name;
          draft.type = 'member';
          draft.auctPrstlsMbCustno = decodeJWT.auctPrstlsMbCustno;
          draft.auctPrstlsNrmlMbCustno = decodeJWT.auctPrstlsNrmlMbCustno;
          draft.membertype = action.payload.statusinfo.membertype; //MbTpcd
          draft.accessToken = action.payload.accessToken;
          draft.refreshToken = action.payload.refreshToken;
          draft.menuAuthruleCd = action.payload.menuAuthruleCd;
          draft.mbLiveshotYn = action.payload.mbLiveshotYn;
          draft.mbAuthCd = action.payload.mbAuthCd;
          // console.log('loginReducer > decodeJWT.id', decodeJWT.id);
          // console.log('loginReducer > decodeJWT.name', decodeJWT.name);
        } else {
          console.log('===========================================================================2');
          draft.isLogin = false;
          draft.membertype = action.payload.statusinfo.membertype;
          draft.loginReturnCd = action.payload.statusinfo.returncd;
          draft.loginReturnMsg = action.payload.statusinfo.returnmsg;
          draft.wthdHMap = action.payload.statusinfo.wthdHMap;
        }

        //console.log('loginReducer > draft', draft);
        // console.log('loginReducer > state', state);
      });
    }
    case types.POST_NONMEMBER_LOGIN: {
      console.log('loginReducer 16> POST_NONMEMBER_LOGIN', action);

      return produce(state, (draft) => {
        if (action.payload.statusinfo.returncd === 'SUCCESS') {
          console.log('loginReducer > jwt.decode', jwt.decode(action.payload.accessToken));
          const decodeJWT = jwt.decode(action.payload.accessToken);
          draft.userInfo = action.payload;
          draft.isLogin = true;
          draft.loginReturnCd = action.payload.statusinfo.returncd;
          draft.id = decodeJWT.id;
          draft.name = decodeJWT.name;
          draft.type = 'nonmember';
          draft.auctPrstlsMbCustno = '';
          draft.auctPrstlsNrmlMbCustno = '';
          draft.accessToken = action.payload.accessToken;
          draft.refreshToken = action.payload.refreshToken;
          draft.menuAuthruleCd = action.payload.menuAuthruleCd;
          draft.mbLiveshotYn = action.payload.mbLiveshotYn;
          draft.mbAuthCd = action.payload.mbAuthCd;
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

      //return state;

      return produce(state, (draft) => {
        draft.isLogin = false;
        draft.id = '';
        draft.name = '';
        draft.auctPrstlsMbCustno = '';
        draft.auctPrstlsNrmlMbCustno = '';
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
          draft.auctPrstlsMbCustno = decodeJWT.auctPrstlsMbCustno;
          draft.auctPrstlsNrmlMbCustno = decodeJWT.auctPrstlsNrmlMbCustno;
          draft.accessToken = action.payload.accessToken;
          draft.refreshToken = action.payload.refreshToken;
          draft.menuAuthruleCd = action.payload.menuAuthruleCd;
          draft.mbLiveshotYn = action.payload.mbLiveshotYn;
          draft.mbAuthCd = action.payload.mbAuthCd;
          console.log('loginReducer > action.payload.menuAuthruleCd', action.payload.menuAuthruleCd);
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
    case types.GET_CAPTCHA_KEY: {
      console.log('loginReducer > GET_CAPTCHA_KEY', action);

      return produce(state, (draft) => {
        if (action.payload) {
          console.log(action.payload);
          //draft.userInfo = action.payload;
          //draft.isLogin = true;
          //draft.loginReturnCd = action.payload.statusinfo.returncd;
        } else {
          console.log('error');
          //draft.isLogin = false;
          //draft.loginReturnCd = action.payload.statusinfo.returncd;
        }
      });
    }
    case types.INIT_LOGIN: {
    }
    default:
      return state;
  }
}

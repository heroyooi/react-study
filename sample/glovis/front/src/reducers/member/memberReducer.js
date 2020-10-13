/**
 * 설명 : 일반 & 딜러 회원가입
 * @fileoverview
 * @requires
 * @author D191364
 */
import { produce } from 'immer';
import * as types from '@src/actions/member/memberTypes';

const initialState = {
  myMbInfoData: {},
  schList: [],
  tmsList: [],
  tmsChkList: [],
  rtnVal: 0,
  saveVal: '',
  mbTpcd: '',
  rtnEmlVal: {},
  snsData: {},
  mbEnEprDday: 100,
  agrList: [], //약관
  agrNList: [], //약관
  mbJoinPathKncd: '0010' //추후 브라우저 체크 필요시 변경
};

export default function memberReducer(state = initialState, action) {
  switch (action.type) {
    //기본 결과
    case types.SCH_MEMBER: {
      console.log('SCH_MEMBER', action);

      return produce(state, (draft) => {
        draft.schList = action.payload;
      });
    }
    //회원가입
    case types.SAVE_MEMBER: {
      console.log('SAVE_MEMBER', action);

      return produce(state, (draft) => {
        draft.saveVal = action.payload;
      });
    }
    //ID 중복체크
    case types.GET_ID_DUP: {
      console.log('GET_ID_DUP', action);

      return produce(state, (draft) => {
        console.log('action.payload.data:', action.payload.data);
        draft.rtnVal = action.payload.data;
      });
    }
    //PWD변경
    case types.UPDATE_PWD: {
      console.log('UPDATE_PWD', action);

      return produce(state, (draft) => {
        draft.mbEnEprDday = action.payload;
      });
    }
    //회원조회
    case types.GET_MEMBER: {
      console.log('[GET_MEMBER] GET_MEMBER action:', action);
      return produce(state, (draft) => {
        draft.myMbInfoData = action.payload;
      });
    }
    //Email 중복체크
    case types.GET_EML_DUP: {
      console.log('GET_EML_DUP', action);

      return produce(state, (draft) => {
        console.log('action.payload.data:', action.payload.data);
        draft.rtnEmlVal = action.payload.data;
      });
    }
    //회원 타입선택
    case types.SET_MEMBERTYPE: {
      //  console.log('SET_MEMBERTYPE', action)
      return produce(state, (draft) => {
        draft.mbTpcd = action.payload;
      });
    }
    //회원 본인인증데이터
    case types.SET_MEMBER_CERTIFY: {
      console.log('SET_MEMBER_CERTIFY', action);
      return produce(state, (draft) => {
        draft.myMbInfoData = action.payload;
      });
    }
    //약관조회
    case types.GET_TMSLIST: { 
      console.log('[GET_TMSLIST] GET_MEMBER action:', action);
      return produce(state, (draft) => {
        const tmsList = action.payload;
        const auctionCheckTerm = [];
        const signupCheckList = [];

        tmsList.forEach((element, i) => {
          const tmpObj = { id: `chk-signup-agree-${i}`, 
                          title: element.cdNm + element.indYn === 'Y' ? ' (필수)' :  element.cdNm,
                          checked: false,
                          essential: element.indYn === 'Y' ? true :false
                      }
          signupCheckList.push(tmpObj);
          auctionCheckTerm.push(element.tmsCntn);
        });

        draft.tmsList = auctionCheckTerm;
        draft.tmsChkList = signupCheckList;
      });
    }
    //회원 약관 SET
    case types.SET_MY_TMS: {
      console.log('SET_MY_TMS', action);

      return produce(state, (draft) => {
        draft.agrList = action.payload.agrObj;
        draft.agrNList = action.payload.agrNObj;
      });
    }
    //회원 SNS SET
    case types.SET_MEMBER_SNS: {
      return produce(state, (draft) => {
        draft.snsData = action.payload;
      });
    }

    default:
      return state;
  }
}

/**
 * 설명 : 내차사기 > 인증몰 > 메인 화면 리듀서
 * @fileoverview 내차사기.인증몰.메인 리듀서
 * @requires [certiMallMainAction]
 * @author 한관영
 */

import { produce } from 'immer';
import { types } from '@src/actions/buycar/certificationmall/certiMallMainAction';

const initialState = {
  impCertiMallList: [],
  finCertiMallList: [],
  frchCertiMallList: []
};

/**
 * 설명 : 내차사기 > 인증몰 > 메인
 * @author 한관영
 * @param {String} action.type
 * @returns {map} 인증몰 브랜드 목록, 최대페이지 수
 */
export default function certiMallMainReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_IMPORT_CERTI_MALL: {
      return produce(state, (draft) => {
        draft.impCertiMallList = action.payload;
      });
    }
    case types.GET_FINANCE_CERTI_MALL: {
      return produce(state, (draft) => {
        draft.finCertiMallList = action.payload;
      });
    }
    case types.GET_FRANCHISE_CERTI_MALL: {
      return produce(state, (draft) => {
        draft.frchCertiMallList = action.payload;
      });
    }
    default:
      return state;
  }
}

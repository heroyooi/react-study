/**
 * 설명 : 마이페이지(일반) 나의 문의내역
 * @author 박진하
 */
import { produce } from 'immer';
import * as types from '@src/actions/mypage/personal/info/inquireTypes';

const initialState = {
  inquireList: [],
  totalCnt : 0,
  pagingInfo : {},
};

/**
 * 설명 : 나의 문의내역 조회
 * @author 박진하
 * @param {String} action.type
 * @returns {map} state 나의 문의내역 정보를 state에 보관
 */
export default function inquireReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_INQUIRE_LIST: {
      console.log('GET_INQUIRE_LIST:', action);

      return produce(state, (draft) => {
        draft.inquireList = action.payload.data;
        draft.pagingInfo = action.payload.pagingInfo     
        draft.totalCnt = action.payload.totalCnt     
      });
    }
    default:
      return state;
  }
}

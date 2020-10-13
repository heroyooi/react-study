/**
 * 설명 : 홈서비스 예약/판매 현황
 * @author 박진하
 */
import { produce } from 'immer';
import * as types from '@src/actions/mypage/dealer/mypageDealerTypes';

const initialState = {
  pageNo: 1,
  recordCount: 0,
  recordSize: 12,
  homeServiceList: []
};

/**
 * 설명 : 홈서비스 예약/판매 현황
 * @author 박진하
 * @param {String} action.type
 * @returns {map} state 홈서비스 예약/판매 현황을 state에 보관
 */
export default function homeServiceReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_MY_HOMESERVICE_LIST: {
      console.log('GET_MY_HOMESERVICE_LIST', action);

      return produce(state, (draft) => {
        draft.homeServiceList = action.payload.data.data || [];
        if (action.payload.data.statusinfo.returncd === '000') {
          draft.recordCount = action.payload.data.pagingInfo.totalRecordCount;
        } else {
          draft.recordCount = 0;
        }
      });
    }
    default:
      return state;
  }
}

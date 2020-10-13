/**
 * 보증차량 판매현황 관련 정보
 * @author 왕태식
 */
import { produce } from 'immer';
import { types } from '@src/actions/mypage/dealer/guarantCarAction';

const initialState = {
  pageNo: 1,
  recordSize: 15,
  recordCount: 0,
  guarantCarList: [] // 보증차량 판매현황 리스트
};

/**
 * 보증차량 판매현황 관련 정보
 * @param {Object} state
 * @param {Object} action
 * @param {Object} action.type
 */
export default function guarantCarReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_GUARANT_CAR_LIST: {
      console.log('GET_GUARANT_CAR_LIST ==>> ', action.payload);
      return produce(state, (draft) => {
        draft.guarantCarList = action.payload.data.data;
        if (action.payload.data.statusinfo.returncd === '000') {
          draft.recordCount = action.payload.data.pagingInfo.totalRecordCount;
        } else {
          draft.recordCount = 0;
        }
      });
    }
    default: {
      return state;
    }
  }
}

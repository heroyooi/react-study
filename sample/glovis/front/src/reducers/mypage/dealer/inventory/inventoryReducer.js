/**
 * 설명 : 재고 * @author 왕태식
 */
import { produce } from 'immer';
import * as types from '@src/actions/mypage/dealer/inventory/inventoryTypes';

const initialState = {
  pageNo: 1,
  recordCount: 0,
  recordSize: 15,
  inventoryList: []
};

/**
 * 설명 : 재고관리
 * @author 왕태식
 * @param {String} action.type
 * @returns {map} state 재고관리 정보를 state에 보관
 */
export default function inventroyReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_INVENTORY_LIST: {
      console.log('GET_MY_COMMENT_LIST', action);

      return produce(state, (draft) => {
        draft.inventoryList = action.payload.data.data;
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

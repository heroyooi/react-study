/**
 * 설명 : 옥션 리스트 리듀서
 * @author 최승희
 */
import { produce } from 'immer';
import { types } from '@src/actions/mypage/dealer/auction/currentListAction';

const initialState = {
  list: [],
  totalCnt: 0,
  succBidList: [],
  bidInfoList: [],
  sellCarList: []
};

export default function currentListReducer(state = initialState, action) {
  switch (action.type) {
    case types.INIT_OBJECT_TO_STORE: {
      return produce(state, draft => {
        console.log('action.payload ::::::::::::: ', action.payload)
        const { payload } = action
        const keys = Object.keys(payload).filter(key => payload[key] !== null && payload[key] !== undefined)

        keys.forEach(key => {
          console.log("currentListReducer -> key", key)
          draft[key] = payload[key]
        })
      });
    }
   
    default:
      return state;
  }
}

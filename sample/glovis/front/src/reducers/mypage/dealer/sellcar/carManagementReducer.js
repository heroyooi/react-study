/**
 * 설명 : 등록차량 및 광고관리 메인
 * @author 추호진
 */

import { produce } from 'immer';
import _ from 'lodash';
import * as types from '@src/actions/mypage/dealer/sellcar/types';

const initialState = {
  managementCarList: [],
  myTime2: {}
};

export default function carManagementReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_MANAGEMENTCAR_LIST: {
      //debugger;
      console.log('GET_MANAGEMENTCAR_LIST:', action);

      return produce(state, (draft) => {
        draft.managementCarList = action.payload.data.data;
      });
    }
    case types.GET_MY_TIME: {
      //debugger;
      console.log('GET_MY_TIME:', action);

      return produce(state, (draft) => {
        console.log(action.payload.data.data);
        draft.myTime2 = action.payload.data.data;
      });
    }
    default:
      return state;
  }
}

import { produce } from 'immer';
import _ from 'lodash';
import * as types from '@src/actions/homeservice/homeServiceInfoTypes';

const initialState = {
  FaqDataList: []
};

/**
 * 설명 : 자동차DB관리
 * @author 왕태식
 * @param {String} action.type
 * @returns {map} state 자동차DB관리를 state에 보관
 */
export default function carDBReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_FAQ_LIST: {
      console.log('GET_FAQ_LIST', action.payload.data.data);

      return produce(state, (draft) => {
        draft.FaqDataList = action.payload.data.data;
      });
    }
    default:
      return state;
  }
}

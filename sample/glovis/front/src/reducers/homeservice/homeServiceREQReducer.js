/**
 * 설명 : 홈서비스 FAQ 리스트 조회
 * @requires [homeserviceTypes]
 * @author 김지훈
 */

import { produce } from 'immer';
import * as types from '@src/actions/homeservice/homeserviceTypes';

const initialState = {
  reqData: []
};
/**
 * 설명 : 홈서비스 FAQ 리스트 조회
 * @author 김지훈
 * @returns {map} 홈서비스 FAQ 리스트 조회 state에 보관
 */
export default function homeServiceREQReducer(state = initialState, action) {
  switch (action.type) {
    case types.HOME_REQ_DATA: {
      console.log('store HOME_REQ_DATA' + action, action);

      return produce(state, (draft) => {
        draft.reqData = action.payload;
      });
    }

    default:
      return state;
  }
}

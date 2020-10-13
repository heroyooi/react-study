import { produce } from 'immer';
import types from '@src/actions/sellcar/sellCarTypes';

const initialState = {
  locationList: [], // 시,도 단위 지역 목록
  detailLocationList: [] // 시,군,구 단위 지역 목록
};

/**
 * 시도, 시구군 단위 지역 목록 정보 조회
 * @param {Object} state 거주지역 정보 초기화정보
 * @param {Object} action
 * @param {String} action.type
 * @author 김민철
 */
export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_LOCATION_LIST: {
      //console.log('LOCATION REDUCER :: GET_LOCAL_LIST', action);
      return produce(state, (draft) => {
        draft.locationList = action.payload;
      });
    }
    case types.GET_DETAIL_LOCATION_LIST: {
      //onsole.log('LOCATION REDUCER :: GET DETAIL LOCAL LIST');
      return produce(state, (draft) => {
        draft.detailLocationList = action.payload;
      });
    }
    default: {
      return state;
    }
  }
}

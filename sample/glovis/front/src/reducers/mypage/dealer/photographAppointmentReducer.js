/**
 * 설명 : 라이브스튜디오 예약 목록 현황
 * @author 박진하
 */
import { produce } from 'immer';
import * as types from '@src/actions/mypage/dealer/mypageDealerTypes';

const initialState = {
  liveRsvtList: [],
  pageinfo: {}
};

/**
 * 설명 : 라이브스튜디오 예약 목록 현황
 * @author 박진하
 * @param {String} action.type
 * @returns {map} state 라이브스튜디오 예약 목록 현황을 state에 보관
 */
export default function photographAppointmentReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_LIVE_STUDIO_LIST: {
      console.log('GET_LIVE_STUDIO_LIST', action);

      return produce(state, (draft) => {
        draft.liveRsvtList = action.payload.data;
        draft.pageinfo = action.payload.pagingInfo;
      });
    }
    default:
      return state;
  }
}

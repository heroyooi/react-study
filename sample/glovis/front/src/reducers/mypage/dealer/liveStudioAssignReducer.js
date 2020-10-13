/**
 * 설명 : Live shot 배정 리스트 * @author 왕태식
 */
import { produce } from 'immer';
import * as types from '@src/actions/mypage/dealer/liveStudioAssignTypes';

const initialState = {
  pageNo: 1,
  recordCount: 15,
  recordSize: 15,
  todayCnt: 0,
  weekCnt: 0,
  liveAssignList: [],
  liveAssignData: {}
};

/**
 * 설명 : Live shot 배정 리스트관리
 * @author 왕태식
 * @param {String} action.type
 * @returns {map} state Live shot 배정 리스트관리 정보를 state에 보관
 */
export default function inventroyReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_LIVE_STUDIO_ASSIGN_LIST: {
      console.log('GET_LIVE_STUDIO_ASSIGN_LIST', action);

      return produce(state, (draft) => {
        draft.liveAssignList = action.payload.data.data;
      });
    }
    case types.GET_LIVE_ASSIGN_DETAIL: {
      console.log('GET_LIVE_ASSIGN_DETAIL', action);

      return produce(state, (draft) => {
        // draft.liveAssignData = action.payload.data.data;
      });
    }
    case types.GET_TODAY_CNT: {
      console.log('GET_TODAY_CNT', action);

      return produce(state, (draft) => {
        console.log('get_today_cnt reducer ==>> ', action.payload);
        if (action.payload.data.statusinfo.returncd === '009') {
          draft.todayCnt = 0;
        }
        // else {
        //   draft.todayCnt = action.payload.data.data;
        // }
      });
    }
    case types.GET_WEEK_CNT: {
      console.log('GET_WEEK_CNT', action);
      return produce(state, (draft) => {
        console.log('get_week_cnt reducer ==>> ', action.payload);
        if (action.payload.data.statusinfo.returncd === '009') {
          draft.weekCnt = 0;
        }
        //  else {
        //   draft.todayCnt = action.payload.data.data;
        // }
      });
    }
    default:
      return state;
  }
}

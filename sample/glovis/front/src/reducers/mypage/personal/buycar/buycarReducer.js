/**
 * 설명 : 마이페이지 일반 내차사기 리듀서
 * @author 김지훈
 */
import { produce } from 'immer';
import * as types from '@src/actions/mypage/personal/buycar/buycarTypes';

const initialState = {
  interCount: 0,
  lastViewList: [],
  quickViewList: [],
  interList: [],
  quickInterList: [],
  currentPage: 1, //  관심차량 / 최근본차량 페이지용 현재 페이지
  qCurrentPage: 1, // quickMenu 최근본차량 현재 페이지
  icurrentPage: 1, // quickMenu 관심차량 현재 페이지
  lcurrentPage: 1, //모바일용,
  nowCount: 0, //  관심차량 / 최근본차량 페이지용 현재 카운트
  qNowCount: 0, //quickMenu 최근본차량 현재 카운트
  recentNowCount: 0,
  totalCount: 0,
  recentTotalCount: 0,
  qTotalCount: 0,
  messageCarList: []
};

/**
 * 설명 : 마이페이지 일반 내차사기 리듀서
 * @author 김지훈
 * @param {String} action.type
 * @returns {map} state 나의 문의내역 정보를 state에 보관
 */
export default function inquireReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_INTEREST_LIST: {
      console.log('GET_INTEREST_LIST:', action);

      return produce(state, (draft) => {
        draft.interList = action.payload.data || [];
        draft.icurrentPage = action.payload.currentPage;
        draft.totalCount = action.payload.totalCount;
        draft.nowCount = action.payload.nowCount;
      });
    }

    case types.GET_SEARCH_INTEREST_LIST: {
      console.log('GET_SEARCH_INTEREST_LIST:', action);
      return produce(state, (draft) => {
        draft.interList = draft.interList.concat(action.payload.data);
        draft.icurrentPage = action.payload.currentPage;
        draft.nowCount = action.payload.nowCount;
      });
    }

    case types.GET_LASTVIEW_LIST: {
      console.log('GET_LASTVIEW_LIST:', action);
      return produce(state, (draft) => {
        console.log(action.payload.data);
        draft.lastViewList = action.payload.data || [];
        draft.recentTotalCount = action.payload.totalCount;
        draft.recentNowCount = action.payload.nowCount;
        draft.lcurrentPage = action.payload.nowCount;
      });
    }

    case types.GET_LAST_QUICK_VIEW_LIST: {
      console.log('GET_LAST_QUIK_VIEW_LIST:', action);
      return produce(state, (draft) => {
        draft.quickViewList = action.payload.data;
        draft.qCurrentPage = action.payload.currentPage;
        draft.qNowCount = action.payload.nowCount;
        draft.qTotalCount = action.payload.totalCount;
      });
    }

    case types.GET_MESSAGECAR_LIST: {
      console.log('GET_LASTVIEW_LIST:', action);

      return produce(state, (draft) => {
        draft.messageCarList = action.payload;
      });
    }
    default:
      return state;
  }
}

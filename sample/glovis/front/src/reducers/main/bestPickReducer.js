import * as types from '@src/actions/main/bestPickTypes';
import { produce } from 'immer';

const initialState = {
  currentPage: 1,
  recordCount: 0,
  recordSize: 10,
  carSearchList: [],
  bestLargeList: [],
  bestSmallList: [],
  bestLargeMainList: [],
  bestSmallMainList: []
};

/**
 * 설명 : Best Pick 관리
 * @author 박진하
 * @param {String} action.type
 * @returns {map} state Best Pick 관리 내용을 state에 보관
 */
export default function bestPickReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_BEST_PICK_LIST: {
      console.log('GET_BEST_PICK_LIST', action);

      return produce(state, (draft) => {
        draft.bestLargeList = action.payload.data.data?.bestLargeList;
        draft.bestSmallList = action.payload.data.data?.bestSmallList;
      });
    }
    case types.GET_BEST_PICK_MAIN_LIST: {
      console.log('GET_BEST_PICK_MAIN_LIST=%o', action);

      return produce(state, (draft) => {
        draft.bestLargeMainList = action.payload.data.data?.bestLargeList;
        draft.bestSmallMainList = action.payload.data.data?.bestSmallList;
      });
    }

    case types.GET_CAR_SEARCH_LIST: {
      console.log('GET_CAR_SEARCH_LIST', action);

      return produce(state, (draft) => {
        draft.carSearchList = action.payload.data.data.data;
        draft.recordCount = action.payload.data.data.recordCount;
        draft.recordSize = action.payload.data.data.recordSize;
        draft.currentPage = action.payload.data.data.currentPage;
      });
    }

    default:
      return state;
  }
}

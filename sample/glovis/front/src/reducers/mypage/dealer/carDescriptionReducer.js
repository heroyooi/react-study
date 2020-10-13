/**
 * 설명 : 나의 설명글
 * @author 왕태식
 */
import { produce } from 'immer';
import * as types from '@src/actions/mypage/dealer/mypageDealerTypes';

const initialState = {
  pageNo: 1,
  recordCount: 0,
  recordSize: 15,
  myCommentList: [],
  myCommentSelList: [],
  myComment: {}
};

/**
 * 설명 : 나의 설명글 관리
 * @author 왕태식
 * @param {String} action.type
 * @returns {map} state 나의 설명글 정보를 state에 보관
 */
export default function carDescriptionReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_MY_COMMENT_LIST: {
      console.log('GET_MY_COMMENT_LIST', action);

      return produce(state, (draft) => {
        draft.myCommentList = action.payload.data.data;
        if (action.payload.data.pagingInfo !== undefined) {
          draft.recordCount = action.payload.data.pagingInfo.totalRecordCount;
        }
        draft.recordCount = 0;
      });
    }
    case types.GET_MY_COMMENT_SEL_LST: {
      console.log('GET_MY_COMMENT_SEL_LST', action);

      return produce(state, (draft) => {
        const SelList = [];
        if (action.payload.data.data !== undefined) {
          action.payload.data.data.map((sel) => {
            SelList.push({ value: sel.prdCmntSno, label: sel.ttlCntn });
          });
        }
        draft.myCommentSelList = SelList;
      });
    }
    case types.GET_MY_COMMENT: {
      console.log('GET_MY_COMMENT', action);

      return produce(state, (draft) => {
        draft.myComment = action.payload;
      });
    }
    default:
      return state;
  }
}

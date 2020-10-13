/**
 * 설명 : 쪽지 상담 내역
 * @author 추호진
 */

import { produce } from 'immer';
import _ from 'lodash';
import * as types from '@src/actions/mypage/dealer/mypageDealerTypes';

const initialState = {
  counselCarList: [],
  counselCarListMember: [],
  counselPageNo: 0,
  counselPageNoMember: 0,
  counselTotalPageNo: 0,
  counselTotalPageNoMember: 0,
  isLoadingImage: false,
  isListLoading: false
};

export default function counselCarReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_MESSAGECAR_LIST: {
      console.log('GET_LASTVIEW_LIST:', action);

      return produce(state, (draft) => {
        draft.messageCarList = action.payload.data.data;
      });
    }
    case types.GET_COUNSEL_CAR_LIST: {
      console.log('GET_COUNSEL_CAR_LIST', action);
      return produce(state, (draft) => {
        if (action.isMore) {
          draft.counselCarList = action.payload?.data ? draft.counselCarList.concat(action.payload.data) : draft.counselCarList;
        } else {
          draft.counselCarList = action.payload?.data;
        }
        draft.counselPageNo = action.payload?.pagingInfo?.currentPageNo;
        draft.counselTotalPageNo = action.payload?.pagingInfo?.totalPageCount;
        draft.counselTotalRecordCount = action.payload?.pagingInfo?.totalRecordCount;
        draft.isLoadingImage = false;
      });
    }
    case types.GET_COUNSEL_CAR_LIST_MEMBER: {
      console.log('GET_COUNSEL_CAR_LIST_MEMBER', action);
      return produce(state, (draft) => {
        draft.counselCarListMember = action.payload?.data;
        draft.counselPageMember = action.payload?.pagingInfo?.currentPageNo;
        draft.counselTotalPageNoMember = action.payload?.pagingInfo?.totalRecordCount;
        draft.isLoadingImage = false;
        draft.isListLoading = true;
      });
    }

    case types.SET_NOTE: {
      console.log('SET_NOTE', action);

      return produce(state, (draft) => {
        const tempObj = _.cloneDeep(state.counselCarList);
        const index = _.findIndex(tempObj, { counselId: action.payload.counselId });

        tempObj[index].replyState = '답변완료';
        tempObj[index].updtId = action.payload.senderId;
        tempObj[index].updDt = action.payload.sentDt;

        action.payload.noteNo = _.maxBy(tempObj[index].noteList, 'noteNo').noteNo + 1;
        tempObj[index].noteList = _.concat(tempObj[index].noteList, {
          noteNo: action.payload.noteNo,
          senderId: action.payload.senderId,
          noteCntn: action.payload.noteCntn,
          recipientId: action.payload.recipientId,
          sentDt: action.payload.sentDt
        });

        draft.counselCarList = tempObj;
      });
    }

    case types.SET_LIST_LOADING_MOBILE: {
      return produce(state, (draft) => {
        draft.isListLoading = action.payload;
      });
    }
    case types.SET_LOADING_IMAGE_MOBILE: {
      return produce(state, (draft) => {
        draft.isLoadingImage = action.payload;
      });
    }

    default:
      return state;
  }
}

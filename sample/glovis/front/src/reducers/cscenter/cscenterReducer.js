import { produce } from 'immer';
import { remove } from 'lodash';
import * as type from '@src/actions/cscenter/cscenterTypes';
import { console } from 'globalthis/implementation';

const initialState = {
  noticeData: [],
  currentPage: 1,
  fixedBBsCount: 0,
  faqCurrentPage: 1,
  faqTotalPage: 0,
  totalPage: 0,
  pageSize: 20,
  noticeViewData: {},
  optList: [],
  faqData: []
};

export default function basicInfoReducer(state = initialState, action) {
  switch (action.type) {
    case type.GET_NOTICE_DATA:

      return produce(state, (draft) => {
        console.log('action' , action);
        console.log('action.payload' , action.payload);
        if (action.isMore) {
          draft.noticeData = draft.noticeData.concat(
            remove(action.payload.data, function(v) {
              return v.bbsNo !== '0';
            })
          );
        } else {
          draft.noticeData = action.payload.data;
        }
        draft.currentPage = action.payload?.pagingInfo?.currentPageNo || 0;
        draft.totalPage = action.payload?.inqRsltCnt || 0;
        draft.fixedBBsCount = action.payload.fixedBBsCount;
      });
    case type.GET_NOTICE_VIEW:
      return produce(state, (draft) => {
        console.log('action.payload' , action.payload);
        draft.noticeViewData = action.payload.data;
      });
    case type.GET_FAQ_DATA:
      return produce(state, (draft) => {
        if (action.isMore && action.page > 1) {
          draft.faqData = draft.faqData.concat(action.payload.data);
          draft.currentPage = action.page;
        } else {
          draft.faqData = action.payload.data;
        }
        draft.faqCurrentPage = action.payload?.pagingInfo?.currentPageNo || 0;
        draft.faqTotalPage = action.payload?.inqRsltCnt || 0;
      });
    case type.GET_COUNSEL_OPT:
      return produce(state, (draft) => {
        draft.optList = action.payload.data;
      });
    default:
      return state;
  }
}

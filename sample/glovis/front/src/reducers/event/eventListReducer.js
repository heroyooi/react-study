import { produce } from 'immer';
import * as types from '@src/actions/event/eventTypes';

const initialState = {
  eventList: [],
  eventLists: [],
  eventListBanner: [],
  eventEndLists: [],
  pagingInfo: {},
  endpagingInfo: {}
};

export default function eventListReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_EVENT_LIST: {
      return produce(state, (draft) => {
        draft.eventList = action.payload || [];
      });
    }
    case types.GET_EVENT_LISTS: {
      return produce(state, (draft) => {
        draft.eventLists = action.payload.data.data || [];
        draft.pagingInfo = action.payload.data.pagingInfo || {};
      });
    }

    case types.GET_EVENT_LIST_BANNER: {
      return produce(state, (draft) => {
        draft.eventListBanner = action.payload.data.data || [];
        draft.pagingInfo = action.payload.data.pagingInfo || {};
      });
    }

    case types.GET_EVENT_END_LISTS: {
      return produce(state, (draft) => {
        draft.eventEndLists = action.payload.data.data || [];
        draft.endpagingInfo = action.payload.data.pagingInfo || {};
      });
    }
    default:
      return state;
  }
}

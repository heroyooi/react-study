import { produce } from 'immer';
import * as types from '@src/actions/event/eventTypes';

const initialState = {
  eventDetail: {}
};

export default function eventDetailReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_EVENT_DETAIL: {
      return produce(state, (draft) => {
        draft.eventDetail = action.payload.data.data;
      });
    }
    default:
      return state;
  }
}

import { produce } from 'immer';
import dealerAdverTypes from '@src/actions/mypage/dealer/dealerAdverTypes';

const initialState = {
  usingTicketList: {},
  free: [],
  update: [],
  pricing: [],
  paymentList: [],
  depositWaitingList: [],
  cancelList: [],
  totalCount: 0
};

export default function dealerAdverReducer(store = initialState, action) {
  switch (action.type) {
    case dealerAdverTypes.INIT_STATE:
      return produce(store, (draft) => {
        const { name, value } = action.payload;

        draft[name] = value;
      });
    case dealerAdverTypes.OBJECT_TO_STORE_PROPS:
      return produce(store, (draft) => {
        const { payload } = action;

        Object.keys(payload).forEach((key) => {
          if (payload[key]) {
            draft[key] = payload[key];
          }
        });
        draft.totalCount = payload.totalCount;
      });
    case dealerAdverTypes.APPEND_REQ_LIST:
      console.log('append reducer :: ', action.payload);
      return produce(store, (draft) => {
        const { payload } = action;
        Object.keys(payload).forEach((key) => {
          if (payload[key]) {
            if (key.includes('paymentList') || key.includes('depositWaitingList') || key.includes('cancelList')) {
              draft[key] = draft[key].concat(payload[key]);
            } else {
              draft[key] = payload[key];
            }
          }
        });
      });
    case dealerAdverTypes.REMOVE_ITEM_IN_LIST:
      return produce(store, (draft) => {
        const { list, key, value } = action.payload;

        if (![list, key, value].some((item) => item === undefined)) {
          console.log('draft[list] : ', draft[list]);

          draft[list] = draft[list].filter((item) => item[key] !== value);
        }
      });
    default:
      return store;
  }
}

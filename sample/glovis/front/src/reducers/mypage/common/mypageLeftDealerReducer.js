import { produce } from 'immer';
import * as types from '@src/actions/mypage/common/mypageLeftDealerType';
const initialState = {
  dealerInfo: {},
  lnbMenuList: []
};

export default function mypageLeftDealerReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_DEALER_SERVICE_INFO: {
      // console.log('GET_DEALER_SERVICE_INFO', action);

      return produce(state, (draft) => {
        draft.dealerInfo = action.payload;
      });
    }
    case types.GET_LNB_MENU_LIST: {
      // console.log('GET_LNB_MENU_LIST', action);

      return produce(state, (draft) => {
        draft.lnbMenuList = action.payload;
      });
    }
    default:
      return state;
  }
}

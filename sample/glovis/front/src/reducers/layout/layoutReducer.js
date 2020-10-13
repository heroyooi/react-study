import { produce } from 'immer';
import * as types from '@src/actions/layout/layoutTypes';

const initialState = {
  gnbMenuList: [],
  dealerMypageInfo: {}
};

export default function layoutReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_GNB_MENU_LIST: {
      console.log('layoutReducer>GET_GNB_MENU_LIST=%o', action);

      return produce(state, (draft) => {
        if (action.payload.data.statusinfo.returncd === 'SUCCESS') {
          draft.gnbMenuList = action.payload.data.menuList;
        } else draft.gnbMenuList = [];
      });
    }
    case types.GET_DEALER_MYPAGE_INFO: {
      console.log('layoutReducer>GET_DEALER_MYPAGE_INFO=%o', action);

      return produce(state, (draft) => {
        if (action.payload.data.statusinfo.returncd === 'SUCCESS') {
          draft.dealerMypageInfo = action.payload.data.data;
        } else draft.dealerMypageInfo = '';
      });
    }
    default:
      return state;
  }
}

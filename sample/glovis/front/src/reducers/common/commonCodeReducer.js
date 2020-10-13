import { produce } from 'immer';
import * as types from '@src/actions/common/commonCodeTypes';

const initialState = {
  commonCodeList: {}, // 매매시스템 공통 코드 AM098: []
  strgMgmtBranchList: [], // 거점 분류 코드
  autoauctionCmCd: {} // 업무시스템 공통 코드
};

/**
 * 매매시스템 공통코드 or 업무시스템 공통코드 조회
 * @param {Object} state selectbox, radio, checkbox에 사용되는 공통코드 조회
 * @param {Object} action
 * @param {String} action.type
 * @author 윤병원
 */
export default function commonCodeReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_COMMON_CODE_LIST: {
      /*  
      const AM016dList = useSelector((state) => state.commonCode.commonCodeList.AM016); //은행코드
      dispatch(getCommonCodeList('AM016')); //은행코드
      */
      console.log('commonCodeReducer>GET_COMMON_CODE_LIST>action=%o', action);

      return produce(state, (draft) => {
        console.log('commonCodeReducer>GET_COMMON_CODE_LIST>action=%o', action);
        const name = action.payload.cmCdTpId;
        if (action.payload.statusinfo.returncd === 'SUCCESS') {
          console.log('commonCodeReducer>GET_COMMON_CODE_LIST>name=%o', name);
          if (!state.commonCodeList.hasOwnProperty(name)) draft.commonCodeList[name] = action.payload.data; // = action.payload.data;
        } else draft.commonCodeList[name] = {};
      });
    }

    case types.GET_AUTOAUCTION_COMMON_CODE_LIST: {
      return produce(state, (draft) => {
        /*  
      const jtDvcdList = useSelector((state) => state.commonCode.autoauctionCmCd.UR); //직위
      dispatch(getAutoAuctionCommonCodeList('UR')); //직위
      */

        console.log('commonCodeReducer>GET_AUTOAUCTION_COMMON_CODE_LIST>action=%o', action);
        const name = action.payload.bigcd;
        if (action.payload.statusinfo.returncd === 'SUCCESS') {
          console.log('commonCodeReducer>GET_AUTOAUCTION_COMMON_CODE_LIST>name=%o', name);
          draft.autoauctionCmCd[name] = action.payload.data;
        } else draft.autoauctionCmCd[name] = [];
      });
    }

    default: {
      return state;
    }
  }
}

/**
 * 설명 : 회원정보 조회  , 회원정보 수정
 * @fileoverview  회원정보
 * @requires
 * @author D191364
 */
import { produce } from 'immer';
import * as types from '@src/actions/mypage/member/memberMngTypes';

const initialState = {
  memberInfoPwd: {},
  mrktList: [],
  detailLocationList: [], // 시,군,구 단위 지역 목록
  auctIdList: [{ value: '', label: '연결가능 계정없음' }], // 옥션 ID 리스트
  rtn: '',
  saveRtn: -1
};

export default function memberMngReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_MEMBERINFO: {
      console.log("GET_MEMBERINFO memberMngReducer -> action", action)

      return produce(state, (draft) => {
        draft.memberInfoPwd = action.payload;
      });
    }
    case types.SAVE_MY_MEMBER_INFO: {
      console.log('[SAVE_MY_MEMBER_INFO] action:', action);
      return produce(state, (draft) => {
        draft.rtn = action.payload;
        draft.saveRtn = action.payload?.data;
        draft.memberInfoPwd = {};
      });
    }
    case types.GET_MRKT_LIST: {
      return produce(state, (draft) => {
        draft.mrktList = action.payload;
      });
    }
    case types.GET_DETAIL_LOCATION_LIST: {
      return produce(state, (draft) => {
        draft.detailLocationList = action.payload;
        //  draft.mrktList = [{ value: '', label: '매매단지 선택' }];
      });
    }
    case types.GET_AUCT_ID_LIST: {
      return produce(state, (draft) => {
        draft.auctIdList = action.payload.length > 0 ? action.payload : draft.auctIdList;
      });
    }
    default:
      return state;
  }
}

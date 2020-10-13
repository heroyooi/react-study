/**
 * 설명 : 회원정보 조회 , 주력정보 수정, 자기소개 수정 , 회원정보 수정
 * @fileoverview  회원정보
 * @requires 
 * @author D191364
 */
import * as types from '@src/actions/mypage/dealer/dealerTypes'
import { produce } from 'immer'

const initialState = {
  myMbInfoData: {}
}

export default function myMbInfoReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_MEMBERINFO: {
      console.log("GET_MEMBERINFO memberMngReducer -> action", action)

      return produce(state, (draft) => {
        draft.myMbInfoData = action.payload
        
      })
    }
    case types.GET_CHKPWD: {
      console.log('GET_CHKPWD', action)

      return produce(state, (draft) => {
        draft.mychkPwdData = action.payload
      })
    }
    case types.SAVE_MEMBERINFO: {
      console.log('[SAVE_MEMBERINFO] SAVE_MEMBERINFO action:', action);    
      return produce(state, (draft) => {
        if(action.payload.powerInfo) {
          draft.myMbInfoData.selfData.powerInfo = action.payload.powerInfo
        }
        if(action.payload.myIntroduceInfo) {
          draft.myMbInfoData.selfData.myIntroduceInfo = action.payload.myIntroduceInfo
        }
        draft.myMbInfoData =  draft.myMbInfoData
      });
    }
    default:
      return state
  }
}

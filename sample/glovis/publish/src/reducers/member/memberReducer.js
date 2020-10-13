/**
 * 설명 : 일반 & 딜러 회원가입 
 * @fileoverview 
 * @requires 
 * @author 강윤경
 */


import * as types from '@src/actions/member/memberTypes'
import { produce } from 'immer'

const initialState = {
  myMbInfoData: {},
  schList: [],
  rtnVal:"",
  memberType:"",
  mbEnEprDday:100
}

export default function memberReducer(state = initialState, action) {
  switch (action.type) {
    case types.SCH_MEMBER: {  //기본 결과
      console.log('SCH_MEMBER', action)

      return produce(state, (draft) => {
        draft.schList = action.payload
        
      })
    }
    case types.SAVE_MEMBER: { //회원가입
      console.log('SAVE_MEMBER', action)

      return produce(state, (draft) => {
        draft.myMbInfoData = action.payload
        
      })
    }
    case types.GET_ID_DUP: {  //ID 중복체크
      console.log('GET_ID_DUP', action)

      return produce(state, (draft) => {
        draft.rtnVal = action.payload
      })
    }
    case types.UPDATE_PWD: {  //PWD변경
      console.log('UPDATE_PWD', action)

      return produce(state, (draft) => {
        draft.mbEnEprDday = action.payload
      })
    }
    
    case types.GET_MEMBER: {
      console.log('[GET_MEMBER] GET_MEMBER action:', action);    
      return produce(state, (draft) => {
        
        draft.myMbInfoData =   action.payload
      });
    }
    default:
      return state
  }
}

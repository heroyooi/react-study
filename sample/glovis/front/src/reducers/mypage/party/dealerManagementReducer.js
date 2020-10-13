import * as types from '@src/actions/mypage/party/partyTypes'
import { produce } from 'immer'

const initialState = {
  dealerList: [],
  dealerRepList: [],
  assignDataList : [],
  rtnSave : {}
}

export default function getDealerList(state = initialState, action) {
  switch (action.type) {
    case types.GET_DEALER_LIST: {
      console.log('GET_DEALER_LIST', action)

      return produce(state, (draft) => {
        draft.dealerList = action.payload.data        
      })
    }
    case types.GET_REPRE_DEALER_LIST: {
      console.log('GET_REPRE_DEALER_LIST', action)

      return produce(state, (draft) => {
        draft.dealerRepList = action.payload.data 
        draft.assignDataList= action.payload.assigndata        
      })
    }
    case types.SAVE_DEALER: {
      console.log('[SAVE_DEALER] SAVE_MEMBERINFO action:', action);    
      return produce(state, (draft) => {
        draft.rtnSave =  action.payload
      });
    }
    case types.APPROVE_DEALER: {
      return produce(state, (draft) => {
        draft.rtnSave = action.payload
        
      })
    }
    case types.DELETE_DEALER: {
      return produce(state, (draft) => {
        draft.rtnSave = action.payload
        
      })
    }
    default:
      return state
  }
  
  
}

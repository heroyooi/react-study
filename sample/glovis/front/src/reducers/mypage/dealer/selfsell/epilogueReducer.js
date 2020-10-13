import * as types from '@src/actions/mypage/dealer/sellcarEpilogueType'
import { produce } from 'immer'

const initialState = {
  epilogueList: [],
  epilogueInfo : {},
  result : {}
}

/**
 * 설명 : 차량 판매 후기 관리 목록 조회 및 등록, 수정, 삭제
 * @author 김지현
 * @param {String} action.type 
 * @returns {map} state 차량 판매 후기 관리 상태를 state에 보관
 */
export default function epilogueReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_EPILOGUE_LIST: {
            console.log('GET_EPILOGUE_LIST', action)
      
            return produce(state, (draft) => {
              draft.epilogueList = action.payload.data
            })
        }
        case types.GET_EPILOGUE_INFO : {
            return produce(state, (draft) => {
              draft.epilogueInfo = action.payload.data
            })
        }
        case types.SAVE_EPILOGUE_INFO : {
          console.log('SAVE_EPILOGUE_INFO action:', action);
      
          return produce(state, (draft) => {
            draft.result = action.payload
          });
        }
        case types.EDIT_EPILOGUE_INFO : {
          console.log('EDIT_EPILOGUE_INFO action:', action);

          return produce(state, (draft) => {
            draft.result = action.payload
          });
        }
        case types.DEL_EPILOGUE_INFO : {
          console.log('DEL_EPILOGUE_INFO', action)

          return produce(state, (draft) => {
            draft.result = action.payload
          })
        }
        default:
            return state
    }
}
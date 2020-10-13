import * as types from '@src/actions/types'
import { produce } from 'immer'

const initialState = {
  myBoardList2: []
}

export default function myPageReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_MY_BOARD_LIST: {
      console.log('GET_MY_BOARD_LIST', action)

      return produce(state, (draft) => {
        draft.myBoardList2 = action.payload
      })
    }
    case types.DEL_MY_BOARD: {
      console.log('DEL_MY_BOARD', action)

      return produce(state, (draft) => {
        const tempObj = _.cloneDeep(state.myBoardList2)
        tempObj[_.findIndex(tempObj, { boardId: action.boardId })].delYn = 'Y'
        draft.myBoardList2 = tempObj
      })
    }
    case types.SET_MY_BOARD: {
      console.log('[myPageReducer] SET_MY_BOARD action:', action);
      
      return produce(state, (draft) => {
        const myBoardList2 = _.filter(state.myBoardList2, ['delYn', 'N']);
        
        if (action.payload.boardId) {
          const tempObj = _.cloneDeep(state.myBoardList2)
          tempObj[_.findIndex(tempObj, { boardId: action.payload.boardId })] = action.payload
          draft.myBoardList2 = tempObj
        } else {
          action.payload.boardId = _.maxBy(myBoardList2, 'boardId').boardId + 1;
          draft.myBoardList2 = _.concat(state.myBoardList2, action.payload);
        }
      });
    }
    default:
      return state
  }
}

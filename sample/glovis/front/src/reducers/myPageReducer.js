import * as types from '@src/actions/types';
import { produce } from 'immer';

const initialState = {
  myBoardList: []
};

export default function myPageReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_MY_BOARD_LIST: {
      console.log('GET_MY_BOARD_LIST', action);

      return produce(state, (draft) => {
        draft.myBoardList = action.payload;
      });
    }
    case types.DEL_MY_BOARD: {
      console.log('DEL_MY_BOARD', action);

      return produce(state, (draft) => {
        const tempObj = _.cloneDeep(state.myBoardList);
        tempObj[_.findIndex(tempObj, { boardId: action.boardId })].delYn = 'Y';
        draft.myBoardList = tempObj;
      });
    }
    case types.SET_MY_BOARD: {
      console.log('[myPageReducer] SET_MY_BOARD action:', action);

      return produce(state, (draft) => {
        const myBoardList = _.filter(state.myBoardList, ['delYn', 'N']);

        if (action.payload.boardId) {
          const tempObj = _.cloneDeep(state.myBoardList);
          tempObj[_.findIndex(tempObj, { boardId: action.payload.boardId })] = action.payload;
          draft.myBoardList = tempObj;
        } else {
          action.payload.boardId = _.maxBy(myBoardList, 'boardId').boardId + 1;
          draft.myBoardList = _.concat(state.myBoardList, action.payload);
        }
      });
    }
    default:
      return state;
  }
}

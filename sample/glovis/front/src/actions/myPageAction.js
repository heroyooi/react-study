import * as types from './types'
import { axiosGetAsync } from '@src/utils/HttpUtils'
import { isEmpty, isNil, orderBy, filter } from 'lodash'

export const getMyBoardList = (userId, cancelToken = null) => async (dispatch) => {
  if (isEmpty(userId)) {
    return
  }

  // const res = await axiosGetAsync(`/myBoardList/${userId}`, cancelToken);
  let res = [
    { boardId: 1, title: '그랜저1 설명글', scratch: '', hitstory: '', comment: '', etcDesc: '', registDt: '2019-09-16', modifyDt: '2019-09-17', delYn: 'N' },
    { boardId: 2, title: '그랜저2 설명글', scratch: '', hitstory: '', comment: '', etcDesc: '', registDt: '2019-09-17', modifyDt: '2019-09-18', delYn: 'N' },
    { boardId: 3, title: '그랜저3 설명글', scratch: '', hitstory: '', comment: '', etcDesc: '', registDt: '2019-09-18', modifyDt: '2019-09-19', delYn: 'N' },
    { boardId: 4, title: '그랜저4 설명글', scratch: '', hitstory: '', comment: '', etcDesc: '', registDt: '2019-09-19', modifyDt: '2019-10-01', delYn: 'N' },
    { boardId: 5, title: '그랜저5 설명글', scratch: '', hitstory: '', comment: '', etcDesc: '', registDt: '2019-09-20', modifyDt: '2019-10-02', delYn: 'N' },
    { boardId: 6, title: '그랜저6 설명글', scratch: '', hitstory: '', comment: '', etcDesc: '', registDt: '2019-09-21', modifyDt: '2019-10-03', delYn: 'N' },
    { boardId: 7, title: '그랜저7 설명글', scratch: '', hitstory: '', comment: '', etcDesc: '', registDt: '2019-09-22', modifyDt: '2019-10-04', delYn: 'N' },
    { boardId: 8, title: '그랜저8 설명글', scratch: '', hitstory: '', comment: '', etcDesc: '', registDt: '2019-09-23', modifyDt: '2019-10-05', delYn: 'N' },
    { boardId: 9, title: '그랜저9 설명글', scratch: '', hitstory: '', comment: '', etcDesc: '', registDt: '2019-09-24', modifyDt: '2019-10-06', delYn: 'N' },
    { boardId: 10, title: '그랜저10 설명글', scratch: '', hitstory: '', comment: '', etcDesc: '', registDt: '2019-10-01', modifyDt: '2019-11-01', delYn: 'N' },
    { boardId: 11, title: '그랜저11 설명글', scratch: '', hitstory: '', comment: '', etcDesc: '', registDt: '2019-10-02', modifyDt: '2019-11-02', delYn: 'N' },
    { boardId: 12, title: '그랜저12 설명글', scratch: '', hitstory: '', comment: '', etcDesc: '', registDt: '2019-10-03', modifyDt: '2019-11-03', delYn: 'N' },
    { boardId: 13, title: '그랜저13 설명글', scratch: '', hitstory: '', comment: '', etcDesc: '', registDt: '2019-10-04', modifyDt: '2019-11-04', delYn: 'N' },
    { boardId: 14, title: '그랜저14 설명글', scratch: '', hitstory: '', comment: '', etcDesc: '', registDt: '2019-10-05', modifyDt: '2019-11-05', delYn: 'N' },
    { boardId: 15, title: '그랜저15 설명글', scratch: '', hitstory: '', comment: '', etcDesc: '', registDt: '2019-10-06', modifyDt: '2019-11-06', delYn: 'N' }
  ]

  dispatch({
    type: types.GET_MY_BOARD_LIST,
    payload: res
  })
}

export const setMyBoard = (data) => async (dispatch) => {
  console.log('[myPageAction] data:', data);
  // const res = await axiosPost(url, data);
  const res = data;

  dispatch({
    type: types.SET_MY_BOARD,
    payload: res
  });
}

export const delMyBoard = (boardId) => (dispatch) => {
  if (isNil(boardId)) {
    return
  }
  console.log('myPageAction boardId', boardId)

  dispatch({
    type: types.DEL_MY_BOARD,
    boardId: boardId
  })
}

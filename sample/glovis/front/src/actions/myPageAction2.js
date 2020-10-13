import * as types from './types'
import { axiosGetAsync } from '@src/utils/HttpUtils'
import { isEmpty, isNil, orderBy, filter } from 'lodash'

export const getMyBoardList = (userId, cancelToken = null) => async (dispatch) => {
  if (isEmpty(userId)) {
    return
  }

  //const res = await axiosGetAsync(`http://10.25.44.131:8080/api/api/homeservice/searchHsvcWrntPrdInfo.do?userId=${userId}`, cancelToken);
  let res = [
    { title: '90일',  registDt: '5,000km', modifyDt: '265,000원' },
    { title: '180일',  registDt: '10,000km', modifyDt: '465,000원' },
    { title: '270일',  registDt: '15,000km', modifyDt: '665,000원' }
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

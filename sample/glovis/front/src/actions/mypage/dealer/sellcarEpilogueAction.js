/**
 * 설명 : 차량 판매 후기 관리
 * @author 김지현
 */

import * as types from './sellcarEpilogueType'
import { axiosGet, axiosPost } from '@src/utils/HttpUtils'
import { isEmpty, isNil, orderBy, filter } from 'lodash'

/**
 * 설명 : 차량 판매 후기 관리 목록 조회
 * @param {map} userId, currentPage, recordSize
 * @returns {map} getEpilogueList 차량 판매 후기 관리 목록
 */
export const getEpilogueList = (data, cancelToken = null) => async (dispatch) => {
  if(typeof data === undefined){
    return;
  }

   const res = await axiosPost('/api/mypage/dealer/selectCarSellCommentList.do', data)
    .then(({ data }) => {
      dispatch({
        type: types.GET_EPILOGUE_LIST,
        payload: data
      })
    })
    .catch((err) => {
      console.log(err);
    });
    
  }

  export const getEpilogueInfo = (data, cancelToken = null) => async (dispatch) => {
    const res = await axiosPost('/api/mypage/dealer/selectCarSellCommentInfo.do', data)
     .then(({ data }) => {
       dispatch({
         type: types.GET_EPILOGUE_INFO,
         payload: data
       })
     })
     .catch((err) => {
       console.log(err);
     });
     
   }
 

/**
 * 설명 : 차량 판매 후기 관리 등록
 * @param {map} data 차량 판매 후기
 * @returns {code} 등록완료상태코드
 */
export const saveEpilogueInfo = (data) => async (dispatch) => {
  console.log('[saveEpilogueInfo] data:', data);
  // const res = await axiosPost(url, data);

  const res = await axiosPost('/api/mypage/dealer/insertCarSellComment.do', data)
    .then(({ data }) => {
      dispatch({
        type: types.SAVE_EPILOGUE_INFO,
        payload: data
      })
    })
    .catch((err) => {
      console.log(err);
    });
}


export const editEpilogueInfo = (data) => async (dispatch) => {
  console.log('[editEpilogueInfo] data:', data);
  // const res = await axiosPost(url, data);

  const res = await axiosPost('/api/mypage/dealer/updateCarSellComment.do', data)
    .then(({ data }) => {
      dispatch({
        type: types.EDIT_EPILOGUE_INFO,
        payload: data
      })
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * 설명 : 차량 판매 후기 관리 삭제
 * @param {map} data 차량 판매 후기
 * @returns {code} 등록완료상태코드
 */
export const deleteEpilogueInfo = (data) => async (dispatch) => {
  console.log('[deleteEpilogueInfo] data:', data);
  // const res = await axiosPost(url, data);
  const res = await axiosPost('/api/mypage/dealer/deleteCarSellComment.do', data)
    .then(({ data }) => {
      dispatch({
        type: types.DEL_EPILOGUE_INFO,
        payload: data
      })
    })
    .catch((err) => {
      console.log(err);
    });
}
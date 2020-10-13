/**
 * 설명 : 딜러정보관리(단체), 딜러등록 /수정, 배정차량 확인/수정 
 * @fileoverview 딜러정보관리
 * @requires 
 * @author 강윤경
 */
import * as types from './partyTypes'
import { axiosGetAsync, axiosPost } from '@src/utils/HttpUtils'
import { isEmpty } from 'lodash'

/**
 * 설명 : 딜러정보 목록
 * @param {data} 
 * @returns {getDealerList} 목록
 */
export const getDealerList = (data, cancelToken = null) => async (dispatch) => {

 const res = await axiosPost('/api/mypage/dealer/selectDealerInfoList.do', data)
 .then(({ data }) => {
   dispatch({
     type: types.GET_DEALER_LIST,
     payload: data
   })
 })
 .catch((err) => {
   console.log(err);
 });
}


/**
 * 설명 : 딜러정보 등록
 * @param { data : mbNm, phone1, phone2, phone3, mbEn, mbEnEprYmd  } 
 * @returns {saveDealer} 결과
 */
export const saveDealer = (data) => async (dispatch) => {
  const res = await axiosPost('/api/mypage/dealer/saveContactDealerInfo.do', data)
   .then(({ data }) => {
     dispatch({
       type: types.SAVE_DEALER,
       payload: data
     })
   })
   .catch((err) => {
     console.log(err);
   });

}

export const getRepresentativeDealerList = (data, cancelToken = null) => async (dispatch) => {

   const res = await axiosPost('/api/mypage/dealer/selectRepresentativeDealerInfoList.do', data)
   .then(({ data }) => {
     dispatch({
       type: types.GET_REPRE_DEALER_LIST,
       payload: data
     })
   })
   .catch((err) => {
     console.log(err);
   });
}


export const approveDealer = (data) => async (dispatch) => {
  const res = await axiosPost('/api/mypage/dealer/saveApproveDealerInfo.do', data)
   .then(({ data }) => {
     dispatch({
       type: types.APPROVE_DEALER,
       payload: data
     })
   })
   .catch((err) => {
     console.log(err);
   });

}


export const deleteDealer = (data) => async (dispatch) => {
  const res = await axiosPost('/api/mypage/dealer/saveDealerInfo.do', data)
   .then(({ data }) => {
     dispatch({
       type: types.DELETE_DEALER,
       payload: data
     })
   })
   .catch((err) => {
     console.log(err);
   });

}




 
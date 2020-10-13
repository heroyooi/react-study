/**
 * 설명 : 회원정보 조회 , 주력정보 수정, 자기소개 수정 , 회원정보 수정
 * @fileoverview 일반회원 , 비회원 
 * @requires 
 * @author D191364
 */
import { isEmpty } from 'lodash';
import qs from 'qs';
import { axiosGetAsync, axiosPost } from '@src/utils/HttpUtils';
import * as types from './dealerTypes';

/**
 * 설명 : 회원정보 조회 
 * @param { } 
 * @returns {getMyMbInfo} 조회
 */
export const getMyMbInfo = (mbId=null, cancelToken = null) => async (dispatch) => {
  console.log("mbId======"+mbId);

  axiosGetAsync('/api/member/selectMbInfo.do?'+ qs.stringify({mbId}), null)
    .then(({ data }) => {
      console.log("GET_MEMBERINFO getMyMbInfo -> data", data)
      if (data.statusinfo.returncd === '000') {
        dispatch({
          type: types.GET_MEMBERINFO,
          payload: data
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * 설명 : 비밀번호 체크 
 * @param {mbPwdEnc } 비밀번호
 * @returns {getChkPwd} 결과
 */
export const getMemberInfoPwd = (data) => async (dispatch) => {
  console.log('[getChkPwd] data:', data);

  // const res = await axiosPost(url, data);
  let res ={
    "data": 1,
    "statusinfo": {
        "returncd": "000",
        "returnmsg": "정상"
    }
  }

  if(res.data == 1) {

    dispatch({
      type: types.GET_CHKPWD,
      payload: res
    });
  } else {
    dispatch({
      type: types.GET_CHKPWD,
      payload: res
    });
  }
}

/**
 * 설명 : 회원정보 수정
 * @param { inputs, files } 회원정보 수정 값들
 * @returns {getMyMbInfo} 회원정보 조회
 */
export const saveMyData = (data) => async (dispatch) => {
  console.log('[saveMyData] data:', data);
  // const res = await axiosPost(url, data);
  const res = data;

  dispatch({
    type: types.SAVE_MEMBERINFO,
    payload: res
  });
}


/**
 * 설명 : 주력정보 수정, 자기소개 수정 
 * @param {powerInfo, myIntroduceInfo } 주력정보, 자기소개
 * @returns {getMyMbInfo} 회원정보 조회
 */
export const saveInfo = (data) => async (dispatch) => {
  console.log('[saveInfo] data:', data);
  // const res = await axiosPost(url, data);

  axiosPost('/api/member/updateSelfInfo.do', data)
    .then(({ data }) => {
      //if(data.result.returncd === "000") {
      dispatch({
        type: types.SAVE_MEMBERINFO,
        payload: data.result
      });
      //}
    })
    .catch((err) => {
      console.log(err);
    });
}


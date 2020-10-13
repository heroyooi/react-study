/**
 * 설명 : 일반 & 딜러 회원가입 
 * @fileoverview 
 * @requires 
 * @author 강윤경
 */
import * as types from './memberTypes'
import { axiosGetAsync } from '@src/utils/HttpUtils'
import { isEmpty } from 'lodash'


/**
 * 설명 : 아이디 찾기
 * @param { mbCi } Ci
 * @returns {schList} 결과
 */
export const getSchIdList = (data) => async (dispatch) => {
  console.log('[getSchIdList] data:', data);
  // const res = await axiosPost(url, data);
  let res ={
    "data": [
      {
        "mbId" :"polarium",
        "mbTpcd" :"01",
        "mbNm" :"사장님",
      },
      {
        "mbId" :"polarium2",
        "mbTpcd" :"02",
        "mbNm" :"사장님",
      }
    ],
    "statusinfo": {
        "returncd": "000",
        "returnmsg": "정상"
    }
  }

  dispatch({
    type: types.SCH_MEMBER,
    payload: res.data
  });
}


/**
 * 설명 : 아이디 찾기(PW 찾기위한)
 * @param { mbCi } Ci
 * @returns {schList} 결과
 */
export const getSchId = (data) => async (dispatch) => {
  console.log('[getSchId] data:', data);
  // const res = await axiosPost(url, data);
  let res ={
    "data": [
      {
        "mbId" :"polarium",
        "mbTpcd" :"01",
        "mbNm" :"금요일",
      }
    ],
    "statusinfo": {
        "returncd": "000",
        "returnmsg": "정상"
    }
  }

  dispatch({
    type: types.SCH_MEMBER,
    payload: res.data
  });
}


/**
 * 설명 : 비로그인 비밀번호 변경
 * @param {data } 등록 항목
 * @returns {savePwd} 결과
 */
export const savePwd = (data) => async (dispatch) => {
  console.log('[savePwd] data:', data);
  // const res = await axiosPost(url, data);
  // const res = await axiosPost(url, data);
  let res ={
    "data": 1,
    "statusinfo": {
        "returncd": "000",
        "returnmsg": "정상"
    }
  }

  dispatch({
    type: types.SAVE_MEMBER,
    payload: res.data
  });
}

/**
 * 설명 : 로그인 비밀번호 다음에 변경하기
 * @param {data } 등록 항목
 * @returns {savePwd} 결과
 */
export const updatePwdNext = (data) => async (dispatch) => {
  console.log('[updatePwdNext] data:', data);
  // const res = await axiosPost(url, data);
  // const res = await axiosPost(url, data);
  let res ={
    "data": 1,
    "statusinfo": {
        "returncd": "000",
        "returnmsg": "정상"
    }
  }

  dispatch({
    type: types.UPDATE_PWD,
    payload: res.data
  });
}

/**
 * 설명 : 로그인 비밀번호  변경하기
 * @param {data } 등록 항목
 * @returns {savePwd} 결과
 */
export const updatePwd = (data) => async (dispatch) => {
  console.log('[updatePwd] data:', data);
  // const res = await axiosPost(url, data);
  // const res = await axiosPost(url, data);
  let res ={
    "data": 1,
    "statusinfo": {
        "returncd": "000",
        "returnmsg": "정상"
    }
  }

  dispatch({
    type: types.SAVE_MEMBER,
    payload: res.data
  });
}


/**
 * 설명 : 로그인 휴면 해제 처리
 * @param {data } 등록 항목
 * @returns {savePwd} 결과
 */
export const updateQscnClear = (data) => async (dispatch) => {
  console.log('[updateQscnClear] data:', data);
  // const res = await axiosPost(url, data);
  // const res = await axiosPost(url, data);
  let res ={
    "data": 1,
    "statusinfo": {
        "returncd": "000",
        "returnmsg": "정상"
    }
  }

  dispatch({
    type: types.SAVE_MEMBER,
    payload: res.data
  });
}



/**
 * 설명 : 종사원증 유효기간 만료 조회
 * @param {data } 등록 항목
 * @returns {savePwd} 결과
 */
export const getEnEprInfo = (data) => async (dispatch) => {
  console.log('[getEnEprInfo] data:', data);
  // const res = await axiosPost(url, data);
  // const res = await axiosPost(url, data);
  let res ={
    "data": {
      "mbId" : "polarium",
      "mbNm" : "김철수",
      "mbEn" : "1245789521",
      "mbEnEprYmd" : "20201112",
      "mbEnEprStYmd" : "20191113",
      "mbEnEprDday" : -10
    },
    "statusinfo": {
        "returncd": "000",
        "returnmsg": "정상"
    }
  }

  dispatch({
    type: types.GET_MEMBER,
    payload: res.data
  });
}

/**
 * 설명 : 비회원 로그인
 * @param {data } 등록 항목
 * @returns {savePwd} 결과
 */
export const nonLogin = (data) => async (dispatch) => {
  console.log('[nonLogin] data:', data);
  // const res = await axiosPost(url, data);
  // const res = await axiosPost(url, data);
  let res ={
    "data": [
      {
      "slReqId" : "RS5464563454"
      }
    ],
    "statusinfo": {
        "returncd": "000",
        "returnmsg": "정상"
    }
  }

  dispatch({
    type: types.SCH_MEMBER,
    payload: res.data
  });
}


/**
 * 설명 : 로그인
 * @param {data } 등록 항목
 * @returns {savePwd} 결과
 */
export const login = (data) => async (dispatch) => {
  console.log('[login] data:', data);
  // const res = await axiosPost(url, data);
  // const res = await axiosPost(url, data);
  let res ={
    "data": [
      {
      "slReqId" : "RS5464563454"
      }
    ],
    "statusinfo": {
        "returncd": "000",
        "returnmsg": "정상"
    }
  }

  dispatch({
    type: types.SCH_MEMBER,
    payload: res.data
  });
}


/**
 * 설명 : 일반회원 & 딜러회원 가입 처리
 * @param {data } 등록 항목
 * @returns {saveMember} 결과
 */
export const saveMember = (data) => async (dispatch) => {
  console.log('[saveMember] data:', data);
  // const res = await axiosPost(url, data);
  // const res = await axiosPost(url, data);
  let res ={
    "data": 1,
    "statusinfo": {
        "returncd": "000",
        "returnmsg": "정상"
    }
  }

  dispatch({
    type: types.SAVE_MEMBER,
    payload: res.data
  });
}

/**
 * 설명 : 일반회원 & 딜러회원 ID 중복체크
 * @param {data } 검색 항목
 * @returns {getIdDup} 결과
 */
export const getIdDup = (data) => async (dispatch) => {
  console.log('[getIdDup] data:', data);

  // const res = await axiosPost(url, data);
  let res ={
    "data": 1,
    "statusinfo": {
        "returncd": "000",
        "returnmsg": "정상"
    }
  }

    dispatch({
      type: types.GET_ID_DUP,
      payload: res.data
    });
  
}

 
/**
 * 설명 : 일반 & 딜러 회원가입
 * @fileoverview
 * @requires
 * @author D191364
 */
import { axiosGetAsync, axiosPost, axiosGet } from '@src/utils/HttpUtils';
import * as types from './memberTypes';

/**
 * 설명 : 아이디 찾기
 * @param { mbCi } Ci
 * @returns {schList} 결과
 */
export const getSchIdList = (data) => async (dispatch) => {
  console.log('[getSchIdList] data:', data);
  axiosPost('/api/member/selectMbIdList.do', data)
    .then(({ data }) => {
      if(data.statusinfo.returncd === "000") {
        dispatch({
          type: types.SCH_MEMBER,
          payload: data.data
        });
      }
      
    })
    .catch((err) => {
      console.log(err);
    });
}


/**
 * 설명 : 아이디 찾기(PW 찾기위한)
 * @param { mbCi } Ci
 * @returns {schList} 결과
 */
export const getSchId = (data) => async (dispatch) => {
  console.log('[getSchId] data:', data);

  axiosPost('/api/member/selectIdBySrchPwd.do', data)
  .then(({ data }) => {
    console.log("=========================================");
    console.log('memberAction>data=' + JSON.stringify(data));
    dispatch({
      type: types.SCH_MEMBER,
      payload: data.data
    });
  })
  .catch((err) => {
    console.log(err);
  });
}


/**
 * 설명 : 비로그인 비밀번호 변경
 * @param {data } 등록 항목
 * @returns {savePwd} 결과
 */
export const savePwd = (data) => async (dispatch) => {
  axiosPost('/api/member/updatePwdByNoLgn.do', data)
  .then(({ data }) => {
    console.log("=========================================");
    console.log('memberAction>data=' + JSON.stringify(data));
    dispatch({
      type: types.SAVE_MEMBER,
      payload: data.data
    });
  })
  .catch((err) => {
    console.log(err);
  });

  
}

/**
 * 설명 : 로그인 비밀번호 다음에 변경하기
 * @param {data } 등록 항목
 * @returns {savePwd} 결과
 */
export const updatePwdNext = (data) => async (dispatch) => {
  console.log('[updatePwdNext] data:', data);
  axiosPost('/api/member/updatePwdNext.do', data)
  .then(({ data }) => {
    console.log("=========================================");
    console.log('memberAction>data=' + data);
    //if(data.result.returncd === "000") {
      dispatch({
        type: types.UPDATE_PWD,
        payload: data.result
      });
    //}
  })
  .catch((err) => {
    console.log(err);
  });
  
}

/**
 * 설명 : 로그인 비밀번호  변경하기
 * @param {data } 등록 항목
 * @returns {savePwd} 결과
 */
export const updatePwd = (data) => async (dispatch) => {
  console.log('[updatePwd] data:', data);
  axiosPost('/api/member/updatePwd.do', data)
  .then(({ data }) => {
    console.log("=========================================");
    console.log('memberAction>data=' + JSON.stringify(data));
    //if(data.result.returncd === "000") {
      dispatch({
        type: types.UPDATE_PWD,
        payload: data.result
      });
    //}
  })
  .catch((err) => {
    console.log(err);
  });

}


/**
 * 설명 : 로그인 휴면 해제 처리
 * @param {data } 등록 항목
 * @returns {savePwd} 결과
 */
export const updateQscnClear = (data) => async (dispatch) => {
  console.log('[updateQscnClear] data:', data);

  axiosPost('/api/member/updateQscnClear.do', data)
  .then(({ data }) => {
    console.log("=========================================");
    console.log('memberAction>data=' + JSON.stringify(data));
    //if(data.result.returncd === "000") {
      dispatch({
        type: types.SAVE_MEMBER,
        payload: data.result
      });
    //}
  })
  .catch((err) => {
    console.log(err);
  });

}



/**
 * 설명 : 종사원증 유효기간 만료 조회
 * @param {data } 등록 항목
 * @returns {savePwd} 결과
 */
export const getEnEprInfo = (data) => async (dispatch) => {
  axiosGetAsync('/api/member/selectEnEprInfo.do')
    .then(({ data }) => {
      console.log("=========================================");
      console.log('memberAction>data=' + data);
      if(data.statusinfo.returncd === "000") {
        dispatch({
          type: types.GET_MEMBER,
          payload: data.data
        });
      } 
      
    })
    .catch((err) => {
      console.log(err);
    });
}


/**
 * 설명 : 일반회원 & 딜러회원 가입 처리 -회원가입
 * @param {data } 등록 항목
 * @returns {saveMember} 결과
 */
export const saveMember = (data) => async (dispatch) => {
  console.log('[saveMember] data:', data);
  const url = `/api/member/insertMember.do`;
  const res = await axiosPost(url, data);
  dispatch({
    type: types.SAVE_MEMBER,
    payload: res.data
  });
};

/**
 * 설명 : 일반회원 & 딜러회원 ID 중복체크-회원가입
 * @param {param } 검색 항목
 * @returns {getIdDup} 결과
 */
export const getIdDup = (param) => async (dispatch) => {
  console.log('[getIdDup] data:', param);
  //encodeURIComponent
  const url = `/api/member/selectIdDup.do?mbId=${param}`;
  const res = await axiosGet(url, null);

  dispatch({
    type: types.GET_ID_DUP,
    payload: res.data
  });
};

/**
 * 설명 : Email 중복체크 -회원가입
 * @param {param } 검색 항목
 * @returns {getEmlDup} 결과
 */
export const getEmlDup = (param) => async (dispatch) => {
  console.log('[getEmlDup] data:', param);
  const url = `/api/member/selectEmlDup.do?mbEml=${param}`;
  const res = await axiosGet(url, null);

  dispatch({
    type: types.GET_EML_DUP,
    payload: res.data
  });
};

/**
 * 설명 : 멤버타입 선택 SET -회원가입
 * @param {data }  항목
 * @returns {savePwd} 결과
 */
export const setMemberType = (data) => async (dispatch) => {
  console.log('[setMemberType] data:', data);
  dispatch({
    type: types.SET_MEMBERTYPE,
    payload: data
  });
};

/**
 * 설명 : 본인인증 값 SET -회원가입
 * @param {data }  항목
 * @returns {setMemberCertify} 결과
 */
export const setMemberCertify = (data) => async (dispatch) => {
  console.log('[setMemberCertify] data:', data);
  dispatch({
    type: types.SET_MEMBER_CERTIFY,
    payload: data
  });
};

/**
 * 설명 : 대표회원
 * @param {data }  항목
 * @returns {getRepresentativeId} 결과
 */
export const getRepresentativeId = (data) => async (dispatch) => {
  console.log('[getRepresentativeId] data:', data);
  const url = `/api/member/selectRepresentativeId.do?userId=${data.userId}&userTpcd=${data.userTpcd}`;
  const res = await axiosGetAsync(url, null);
  console.log('return:', res.data);
  dispatch({
    type: types.GET_MEMBER,
    payload: res.data.data
  });
};

/**
 * 설명 : 약관조회
 * @param {data }  항목
 * @returns {getTmsList} 결과
 */
export const getTmsList = (data) => async (dispatch) => {
  console.log('[getTmsList] data:', data);
  const param = data ? `tmsTp=${data}` : '';

  const res = await axiosGet(`/api/member/selectTmsList.do?${param}`, null);
  dispatch({
    type: types.GET_TMSLIST,
    payload: res.data.data
  });
};

/**
 * 설명 : 약관 -회원가입
 * @param {data }  항목
 * @returns {savePwd} 결과
 */
export const setMyTms = (agrObj, agrNObj) => async (dispatch) => {
  console.log('[setMyTms] data:', agrObj);
  dispatch({
    type: types.SET_MY_TMS,
    payload: { agrObj, agrNObj }
  });
};

/**
 * 설명 : SNS 정보 선택 SET -회원가입
 * @param {data }  항목
 * @returns {savePwd} 결과
 */
export const setMemberSns = (data) => async (dispatch) => {
  dispatch({
    type: types.SET_MEMBER_SNS,
    payload: data
  });
};

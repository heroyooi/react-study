/**
 * 설명 : 나의설명글 관리
 * @author 박진하
 */
import { isEmpty, isNil } from 'lodash';
import Router, { withRouter } from 'next/router';
import { axiosGet, axiosPost, axiosPut } from '@src/utils/HttpUtils';
import * as types from './mypageDealerTypes';

/**
 * 설명 : 나의 설명글 목록 조회
 * @param {String} userId 사용자ID
 * @returns {map} commentList 설명글 목록
 */
export const getMyCommentList = (param) => async (dispatch) => {
  const data = await axiosPost(`/api/autobell/mypage/dealer/selectMyCarCommentList.do`, param);

  dispatch({
    type: types.GET_MY_COMMENT_LIST,
    payload: data
  });
};

// 나의설명글 등록 나의설명글 사용 셀렉트박스
export const getMyCommentSelList = (param) => async (dispatch) => {
  const data = await axiosPost(`/api/autobell/mypage/dealer/selectMyCarCommentList.do`, param);

  dispatch({
    type: types.GET_MY_COMMENT_SEL_LST,
    payload: data
  });
};

/**
 * 설명 : 나의 설명글 목록 조회
 * @param {String} prdCmntSno
 * @returns {map} commentList 설명글 목록
 */
export const getMyComment = (prdCmntSno) => async (dispatch) => {
  const commentList = await axiosPost(`/api/autobell/mypage/dealer/selectMyCarComment.do`, {
    PRD_CMNT_SNO: prdCmntSno
  });

  const dataList = commentList.data.data;

  dispatch({
    type: types.GET_MY_COMMENT,
    payload: dataList
  });
};

/**
 * 설명 : 나의 설명글 등록
 * @param {map} data 설명글
 * @returns {code} 등록완료상태코드
 */
export const setMyComment = (data) => async (dispatch) => {
  const res = await axiosPost('/api/autobell/mypage/dealer/insertMyCarComment.do', data)
    .then(({ data }) => {
      console.log(data);
      const returncd = data.statusinfo.returncd;
      console.log(returncd);
      if (returncd === '000') {
        // 신청 성공시 처리
        const slReqId = data.data.slReqId;
      } else {
        // 신청 실패시 처리
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * 설명 : 나의 설명글 수정
 * @param {map} data 설명글
 * @returns {code} 등록완료상태코드
 */
export const updateMyComment = (data) => async (dispatch) => {
  const res = await axiosPost('/api/autobell/mypage/dealer/updateMyCarComment.do', data)
    .then(({ data }) => {
      console.log(data);
      const returncd = data.statusinfo.returncd;
      console.log(returncd);
      if (returncd === '000') {
        // 신청 성공시 처리

        const slReqId = data.data.slReqId;
      } else {
        // 신청 실패시 처리
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * 설명 : 회원정보 수정
 * @fileoverview 회원
 * @requires
 * @author D191364
 */
import { axiosPost, axiosGet } from '@src/utils/HttpUtils';
import * as types from './memberMngTypes';

/**
 * 설명 : 개인정보 조회를 위한 비밀번호 체크
 * @param {mbPwdEnc } 비밀번호
 * @returns {getMemberInfoPwd} 결과
 */
export const getMemberInfoPwd = (data) => async (dispatch) => {
  console.log('GET_MEMBERINFO [getMemberInfoPwd] data:', data);

  const res = await axiosPost(`/api/member/selectChkPwd.do`, data);

  dispatch({
    type: types.GET_MEMBERINFO,
    payload: res.data.data
  });
};

/**
 * 설명 : 회원 정보 수정
 * @param {data } 등록 항목
 * @returns {saveMember} 결과
 */
export const saveMyMemberInfo = (data) => async (dispatch) => {
  console.log('[saveMyMemberInfo] data:', data);

  const res = await axiosPost(`/api/member/updateMember.do`, data);

  dispatch({
    type: types.SAVE_MY_MEMBER_INFO,
    payload: res.data
  });
};

/**
 * 설명 : 매매단지 조회
 * @param {data } 등록 항목
 * @returns {saveMember} 결과
 */
export const getMrktCmplxList = (data) => async (dispatch) => {
  console.log('[getMrktCmplxList] data:', data);

  const res = await axiosPost(`/api/homeservice/mrktCmplxList.do`, data);

  const mrktList = [{ value: '', label: '매매단지 선택' }];
  if (res?.data?.statusinfo?.returncd === '000') {
    if (res.data.data !== null) {
      res.data.data.map((mrkt) => {
        mrktList.push({ value: mrkt.value, label: mrkt.label });
      });
    }
  }
  dispatch({
    type: types.GET_MRKT_LIST,
    payload: mrktList
  });
};

/**
 * 시,군,구 단위 지역 정보 목록 가져오기
 * @param {String} rgstRsdcAddrNmm 시,도 코드
 */
export const getDetailLocationList = (rgstRsdcAddrNmm) => async (dispatch) => {
  const { data } = await axiosGet(`/api/common/selectLocationInfoList.do?locCd=${rgstRsdcAddrNmm}`, null);

  if (data?.statusinfo?.returncd === '000') {
    const detailLocationList = [{ value: '', label: '시군구 선택' }];
    if (data.data !== null) {
      data.data.map((location) => {
        detailLocationList.push({ value: location.ctyCd, label: location.ctyNm });
      });
    }
    dispatch({
      type: types.GET_DETAIL_LOCATION_LIST,
      payload: detailLocationList
    });
  }
};

/**
 * 사업자등록번호로 경매회원 ID 갖고 오기
 * @param {String} busimanno
 */
export const getAuctIdByBusimanno = (busimanno) => async (dispatch) => {
  const res = await axiosGet(`/api/member/selectAuctIdByBusimanno.do?busimanno=${busimanno}`, null);

console.log("res.data:", res.data)
  dispatch({
    type: types.GET_AUCT_ID_LIST,
    payload: res.data.data
  });
};

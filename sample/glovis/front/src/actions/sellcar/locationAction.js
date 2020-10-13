/**
 * 시도, 시군구 단위 지역 정보 목록으로 가져오기
 * @fileOverview 시도, 시군구 목록 정보 가져오기
 * @requires HttpUtils
 * @author 김민철
 */
import { axiosGet } from '@src/utils/HttpUtils';
import types from './sellCarTypes';

/**
 * 시도 단위 지역 정보 목록 가져오기
 */
export const getLocationList = () => async (dispatch) => {
  const { data } = await axiosGet(`/api/common/selectLocationInfoList.do`, null);
  // 패치 성공
  if (data?.statusinfo?.returncd === '000') {
    let locationList = [];
    if (data.data !== null) {
      locationList = data.data.map((location) => {
        return {
          value: location.locCd,
          label: location.locNm
        };
      });
    }
    dispatch({
      type: types.GET_LOCATION_LIST,
      payload: locationList
    });
  }
};

/**
 * 시,군,구 단위 지역 정보 목록 가져오기
 * @param {String} rgstRsdcAddrNmm 시,도 코드
 */
export const getDetailLocationList = (rgstRsdcAddrNmm) => async (dispatch) => {
  const { data } = await axiosGet(`/api/common/selectLocationInfoList.do?locCd=${rgstRsdcAddrNmm}`, null);
  // 패치 성공
  if (data?.statusinfo?.returncd === '000') {
    let detailLocationList = [];
    if (data.data !== null) {
      detailLocationList = data.data.map((location) => {
        return {
          value: location.ctyCd,
          label: location.ctyNm
        };
      });
    }
    dispatch({
      type: types.GET_DETAIL_LOCATION_LIST,
      payload: detailLocationList
    });
  }
  else if (data?.statusinfo?.returncd === '009') {
    dispatch({
      type: types.GET_DETAIL_LOCATION_LIST,
      payload: []
    });
  }
};

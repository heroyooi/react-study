/**
 * 설명 : 포인트/쿠폰 현황
 * @author 박진하
 */
import { isEmpty } from 'lodash';
import moment from 'moment';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';
import * as types from './mypageDealerTypes';

/**
 * 설명 : 포인트 내역 조회
 * @param {String} userId 사용자ID
 * @param {map} searchInfo 내역 검색 조건 정보
 * @returns {map} pointList 포인트 내역 목록
 */
export const getPointHistoryList = (searchInfo) => async (dispatch) => {
  console.log('[getPointHistoryList] data:', searchInfo);

  const res = await axiosPost('/api/autobell/mypage/dealer/getPointList.do', searchInfo)
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: types.GET_POINT_HISTORY_LIST,
        payload: data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * 설명 : 쿠폰 내역 조회
 * @param {String} userId 사용자ID
 * @returns {map} couponList 쿠폰 내역 목록
 */
export const getCouponHistoryList = (param) => async (dispatch) => {
  console.log('[getCouponHistoryList] data:', param);
  // const res = await axiosPost(url, data);

  const res = await axiosPost('/api/mypage/dealer/getCouponList.do', param)
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: types.GET_COUPON_HISTORY_LIST,
        payload: data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * 설명 : 쿠폰 내역 등록
 * @param {map} data 쿠폰 사용/만료 정보
 * @returns {code} 쿠폰 내역 등록 완료 상태 코드
 */
export const setCouponHistory = (data) => async (dispatch) => {
  //console.log(data);

  dispatch({
    type: types.SET_COUPON_HISTORY,
    payload: data
  });
};

/**
 * 설명 : 쿠폰 정보 조회
 * @param {String} couponNo 쿠폰 번호
 * @returns {couponData} 쿠폰 정보
 */
export const getCoupon = (couponNo) => async (dispatch) => {
  console.log('[getCoupon] data:', couponNo);

  const res = await axiosPost('/api/mypage/dealer/couponData.do', { coupId: couponNo })
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: types.GET_COUPON,
        payload: data.data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * 설명 : 쿠폰 정보 등록
 * @param {map} coupInfo 쿠폰 정보
 * @returns {code} 쿠폰 등록 완료 상태 코드
 */
export const setCoupon = (coupInfo) => async (dispatch) => {
  console.log('[getCoupon] data:', coupInfo);

  const res = await axiosPost('/api/mypage/dealer/insertCoupon.do', coupInfo)
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: types.SET_COUPON,
        payload: data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

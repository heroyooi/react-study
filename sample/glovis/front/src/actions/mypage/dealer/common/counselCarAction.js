/**
 * 설명 : 쪽지 상담 내역
 * @author 박진하
 */
import { isEmpty } from 'lodash';
import { axiosGet } from '@src/utils/HttpUtils';
import * as types from '../mypageDealerTypes';

export const ITEMS_PER_PAGE = 10;

/**
 * 설명 : 쪽지 상담 내역 조회
 * @param {String} pageNo 페이지 번호
 * @returns {map} counselCarList 쪽지 상담 목록
 */
export const getCounselCarList = (pageNo = 0, isMore = false) => async (dispatch) => {
  const counselCarList = await axiosGet(`/api/mypage/dealer/selectMyCounselCar.do?pageNo=${pageNo}`);

  dispatch({
    type: types.GET_COUNSEL_CAR_LIST,
    payload: counselCarList.data,
    isMore: isMore
  });
};

/**
 * 설명 : 쪽지 상담 내역 조회
 * @param {String} pageNo 페이지 번호
 * @returns {map} counselCarList 쪽지 상담 목록
 */
export const getCounselCarListMember = (pageNo = 0) => async (dispatch) => {
  const counselCarList = await axiosGet(`/api/mypage/dealer/selectMyCounselCarMember.do?pageNo=${pageNo}`);

  dispatch({
    type: types.GET_COUNSEL_CAR_LIST_MEMBER,
    payload: counselCarList.data
  });
  return counselCarList;
};

/**
 * 설명 : 쪽지 상담 상세 조회
 * @param {String} pageNo 페이지 번호
 * @returns {map} counselCarList 쪽지 상담 목록
 */
export const getCounselCarDeatailList = (dlrPrdId, mbId) => async (dispatch) => {
  const counselCarDeatailList = await axiosGet(`/mock/mypage/dealer/common/noteSentbox.json?dlrPrdId=${dlrPrdId}&mbId=${mbId}}`);

  dispatch({
    type: types.GET_COUNSEL_DETAIL_CAR_LIST,
    payload: counselCarDeatailList.data.data
  });
};

/**
 * 설명 : 쪽지 상담 내역 등록
 * @param {map} payload
 * @returns {map} counselCarList 쪽지 상담 목록
 */
export const setNote = (payload) => async (dispatch) => {
  dispatch({
    type: types.SET_NOTE,
    payload
  });
};

export const setLoadingImageMobile = (loading) => async (dispatch) => {
  dispatch({
    type: types.SET_LOADING_IMAGE_MOBILE,
    payload: loading
  });
};

export const setListLoadingMobile = (loading) => async (dispatch) => {
  dispatch({
    type: types.SET_LIST_LOADING_MOBILE,
    payload: loading
  });
};

/**
 * 설명 : Best Pick 관리
 * @author 박진하
 */
import { axiosPut, axiosPost, axiosGet } from '@src/utils/HttpUtils';
import { isEmpty } from 'lodash';
import * as types from './bestPickTypes';

/**
 * 설명 : Best Pick 목록 조회
 * @returns {carSearchList} Best Pick 목록
 */
export const getBestPickList = () => async (dispatch) => {
  const bestPickList = await axiosGet('/api/sitemanagement/bestPick/selectBestPickList.do');

  dispatch({
    type: types.GET_BEST_PICK_LIST,
    payload: bestPickList
  });
};

/**
 * 설명 : Best Pick 목록 조회
 * @returns {carSearchList} Best Pick 목록
 */
export const getBestPickMainList = () => async (dispatch) => {
  const bestPickList = await axiosGet('/api/sitemanagement/bestPick/selectBestPickMainList.do');

  dispatch({
    type: types.GET_BEST_PICK_MAIN_LIST,
    payload: bestPickList
  });
};

/**
 * 설명 : Best Pick 차량 검색
 * @param {map} payload 검색 조건
 * @returns {carSearchList} 딜러상품 목록 (정상 판매중 차량)
 */
export const getCarSearchList = (payload) => async (dispatch) => {
  const carSearchList = await axiosPost('/api/sitemanagement/bestPick/selectBestPickCarSearch.do', JSON.stringify(payload));

  dispatch({
    type: types.GET_CAR_SEARCH_LIST,
    payload: carSearchList
  });
};

/**
 * 설명 : 보증차량판매 현황
 * @author 왕태식
 */
import { axiosGet, axiosPost, axiosGetTemp } from '@src/utils/HttpUtils';
import { isEmpty } from 'lodash';

export const types = {
  GET_GUARANT_CAR_LIST: 'mypage/dealer/GET_GUARANT_CAR_LIST'
};

/**
 * 설명 :  보증차량판매 현황 목록 조회
 * @param {map} param 검색조건 파라미터
 * @returns {map} guarantCarList  보증차량판매 현황 목록
 */
export const getGuarantCarList = (param) => async (dispatch) => {
  console.log('param => ', param);
  const data = await axiosPost('/api/selectWrntCarSaleList.do', param);
  console.log('api data => ', data);
  dispatch({
    type: types.GET_GUARANT_CAR_LIST,
    payload: data
  });
};

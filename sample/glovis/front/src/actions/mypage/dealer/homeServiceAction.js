/**
 * 설명 : 홈서비스 예약/판매 현황
 * @author 박진하
 */
import { isEmpty } from 'lodash';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';
import * as types from './mypageDealerTypes';

/**
 * 설명 : 홈서비스 예약/판매 목록 조회
 * @param {map} payload 사용자ID + 검색조건 파라미터
 * @returns {map} homeServiceList 홈서비스 예약/판매 목록
 */
export const getMyHomeServiceList = (param) => async (dispatch) => {
  console.log('payload => ', param);
  const data = await axiosPost(`/api/autobell/mypage/dealer/selectHomeServiceList.do`, param);
  console.log('api data => ', data);
  dispatch({
    type: types.GET_MY_HOMESERVICE_LIST,
    payload: data
  });
};

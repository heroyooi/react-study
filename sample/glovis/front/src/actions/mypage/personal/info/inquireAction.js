/**
 * 설명 : 마이페이지(일반) 나의 문의내역
 * @author 박진하
 */
import { axiosPost } from '@src/utils/HttpUtils';
import * as types from './inquireTypes';

/**
 * 설명 : 나의 문의내역 조회
 * @param {map} 조건 검색 파라미터
 * @returns {map} inquireList 문의 목록
 */
export const getInquireList = (data) => async (dispatch) => {
  //console.log('getInquireList: ', data);

  const url = '/api/member/selectMyQuesList.do';
  const res = await axiosPost(url, data);
  /*
  inquireList = inquireList.data.map((inquire) => {
    return {
      ...inquire
    };
  });
*/

  dispatch({
    type: types.GET_INQUIRE_LIST,
    payload: res.data
  });
};

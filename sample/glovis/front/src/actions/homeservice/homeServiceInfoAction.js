/**
 * 설명 : 홈서비스 안내
 * @author 왕태식
 */
import * as http from '@src/utils/HttpUtils';
import { isEmpty } from 'lodash';
import * as types from './homeServiceInfoTypes';

/**
 * 설명 : 홈서비스 안내 자주찾는질문 조회
 * @param {map} searchInfo 검색 조건
 * @returns {map} FaqList 자주찾는질문 목록
 */
export const getFaqList = () => async (dispatch) => {
  const data = await http.axiosGet(`http://localhost:8080/autobell_api/faqMgnt/selectFaqMgntList.do?inqQuesTpcd=0070&inqPageNo=1&pageSize=10`);
  console.log('getFaqList => ', data);
  dispatch({
    type: types.GET_FAQ_LIST,
    payload: data
  });
};

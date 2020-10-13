/**
 * 오토벨진단 정보 가져오기
 * @author 김민철
 */
import { axiosGet } from '@src/utils/HttpUtils';

export const types = {
  FETCH_DIAGNOSIS: 'fetchDiagnosis'
};

/**
 * 오토벨진단 정보 가져오기
 * @param {String} dlrPrdId 딜러 상품아이디
 */
export const fetchDiagnosis = (dlrPrdId) => async (dispatch) => {
  // URL :: /buycar/selectProductDetailCarInfo.do
  await axiosGet(`/mock/buycar/autobellDetailDiagnosis.json?dlrPrdId=${dlrPrdId}`, null).then((res) => {
    console.log(res.data);
    dispatch({
      type: types.FETCH_DIAGNOSIS,
      payload: res.data.data || {}
    });
  });
};

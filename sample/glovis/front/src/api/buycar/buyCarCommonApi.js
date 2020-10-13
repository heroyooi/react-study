import qs from 'qs';
import { isLoginLiveCheck } from '@src/utils/LoginUtils';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';

/**
 * 내차사기 > 관심 차량 여부 토글
 * @param {String} dlrPrdId 딜러 상품아이디
 */
export const toggleInterestAPI = async (dlrPrdId) => {
  const url = `/api/buycar/toggleInterestCar.do`;
  const data = JSON.stringify({ dlrPrdId });
  return await axiosPost(url, data);
};
/**
 * 내차사기 > 관심 차량 여부 토글
 * @param {String} dlrPrdId 딜러 상품아이디
 */
export const toggleCompareAPI = async (dlrPrdId) => {
  const url = `/api/buycar/toggleCompareCar.do`;
  //로그인 여부는 컨트롤러에서 판단?
  const data = JSON.stringify({ dlrPrdId });
  // console.log('data = ', data);
  // console.log('COMMON API toggleInterest');
  return await axiosPost(url, data);
};

/**
 * 내차사기 > 공통코드 조회
 * @param {String} cmCdTpId 공통 코드 유형 ID
 */
export const selectCommonCode = async (cmCdTpId) => {
  const queryString = qs.stringify({ cmCdTpId });
  // console.log(queryString);
  const url = `/api/commonCode/selectCommonCodeList.do?${queryString}`;
  return await axiosGet(url).then((res) => {
    return res.data.data;
  });
};

export const selectQuickViewAPI = async (dlrPrdId) => {
  const queryString = qs.stringify({ dlrPrdId });
  // console.log(queryString);
  const url = `/api/buycar/selectProductQuickViewInfo.do?` + queryString;
  return await axiosGet(url);
};

/**
 * 내차사기 > 차량 상세 이동시 조회수 카운트(로그인상태면 최근조회상품 테이블에도 insert)
 * @param {String} dlrPrdId 딜러 상품아이디
 */
export const insertPrdCntAPI = async (dlrPrdId, isLogin = isLoginLiveCheck()) => {
  const data = JSON.stringify({ dlrPrdId });
  const url = `/api/buycar/insertPrdCnt${isLogin ? 'Jwt' : ''}.do`;
  return await axiosPost(url, data);
};

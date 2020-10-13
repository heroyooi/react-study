/**
 * 추천 차량 정보 가져오기
 * @fileOverview 추천 차량 정보 가져오기
 * @requires HttpUtils
 * @author 김민철
 */
import qs from 'qs';

import { axiosGet } from '@src/utils/HttpUtils';

export const types = {
  FETCH_RECOM_ITEMS: 'fetchRecomendItems',
  FETCH_SMART_ITEMS: 'fetchSmartItems',
  TOGGLE_INTEREST: 'toggleInterest'
};

/**
 * 추천 차량 목록 가져오기
 * @param {string} dlrPrdId 딜러상품아이디
 */
export const fetchRecommendItems = (dlrPrdId = null, pageType = 'main') => async (dispatch) => {
  const queryString = qs.stringify({ dlrPrdId, pageType });
  const data = await axiosGet(`/api/buycar/selectEquivalentRecommendedProduct.do?${queryString}`).then((res) => {
    return res?.data?.data?.prdLst || [];
  });
  dispatch({
    type: types.FETCH_RECOM_ITEMS,
    payload: data
  });
};

/**
 * 스마트 차량 목록 가져오기
 * @param {string} dlrPrdId 딜러상품아이디
 */
export const fetchSmartItems = (dlrPrdId = null, pageType = 'main') => async (dispatch) => {
  const queryString = qs.stringify({ dlrPrdId, pageType });
  const data = await axiosGet(`/api/buycar/selectSmartRecommendedProduct.do?${queryString}`).then((res) => {
    return res?.data?.data?.prdLst || [];
  });
  dispatch({
    type: types.FETCH_SMART_ITEMS,
    payload: data
  });
};

// export const toggleListItrt = (listName, carId) => async (dispatch) => {
//   // API를 통해 숫자를 증감할 것
//   // api update 이후 useRef 에 저장한 목록길이만큼 다시 조회하거나 조회생략
//   dispatch({
//     type: types.TOGGLE_INTEREST,
//     payload: { listName, carId }
//   });
// };

// /**
//  * 서버에서 전송 받은 정보를 화면에 맞는 정보로 매핑함
//  * @param {Object} p 상품정보
//  * @returns {object[]} 변환된 상품 정보
//  */
// const mapper = (p) => {
//   const data = {};
//   data.id = p.dlrPrdId;
//   data.name = p.mnfcNm + ' ' + p.mdlNm + ' ' + p.clsNm;
//   data.price = p.slAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//   data.image = p.delePhtUrl;
//   data.alt = data.name;
//   data.itrtProdYn = p.itrtProdYn;
//   data.isButton = p.hsvcYn === 'Y' ? true : false;
//   if (data.isButton) data.buttonName = '온라인구매';
//   data.infos = [p.frstRegDt, p.drvDist, p.fuelNm, p.locNm];
//   data.tags = [];
//   if (p.ewYn === 'Y') data.tags.push({ color: 'blue60', value: 'EW' });
//   if (p.hsvcYn === 'Y') data.tags.push({ color: 'purple', value: '홈서비스' });
//   if (p.impMallYn === 'Y') data.tags.push({ color: 'sky', value: '수입인증' });
//   if (p.frnchsYn === 'Y') data.tags.push({ color: 'gold', value: '프랜차이즈' });
//   if (p.capMallYn === 'Y') data.tags.push({ color: 'green', value: '금융인증' });
//   data.options = [];
//   if (p.lvstdYn === 'Y') data.options.push({ color: 'red', value: '라이브' });
//   if (p.auctSbidYn === 'Y') data.options.push({ color: 'blue60', value: '경매' });
//   return data;
// };

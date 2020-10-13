import { isEmpty } from 'lodash';
import { axiosGet, axiosPost, axiosGetJson } from '@src/utils/HttpUtils';
import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';
import { convertCarOptionToStringArray, getMarketPriceAsync, getMarketPriceParameter, getPricingCarOptions } from '@src/components/pricingSystem/pricingUtil';
const CAR_OPTIONS = getPricingCarOptions();

/**
 * 한글 옵션을 시세조회조건에 맞게 영문대문자로 치환
 * @param {Array} options1 전체 옵션 리스트 : getPricingCarOptions1()
 * @param {Array} options2 현재차량의 옵션 리스트 : ["LED", "후측방경보(BSD)", "스마트키"]
 */
function findValuesByLabels(options1, options2) {
  if (options1 && options2) {
    return options1.filter((opt) => options2.some((op) => op.crId && op.optDiv === 'D' && op.optNm === opt.label)).map((opt) => opt.value);
  }
  return [];
}

export const types = {
  FETCH_CAR_INFO: 'buycarDetailTypeAB/FETCH_CAR_INFO',
  FETCH_CAR_BASE_OPTION_INFO: 'buycarDetailTypeAB/FETCH_CAR_BASE_INFO',
  FETCH_CAR_CONTENT: 'buycarDetailTypeAB/FETCH_CAR_CONTENT',
  FETCH_MARKET_PRICE: 'buycarDetailTypeAB/FETCH_MARKET_PRICE',
  FETCH_DEALER_INFO: 'buycarDetailTypeAB/FETCH_DEALER_INFO',
  FETCH_AUCTION_INFO: 'buycarDetailTypeAB/FETCH_AUCTION_INFO',
  FETCH_CAR_ACCIDENT: 'buycarDetailTypeAB/FETCH_CAR_ACCIDENT',
  FETCH_CAR_PERFORMANCE: 'buycarDetailTypeAB/FETCH_CAR_PERFORMANCE',
  FETCH_CAR_AUTOBELL_INS: 'buycarDetailTypeAB/FETCH_CAR_AUTOBELL_INS',
  FETCH_CAR_CONTENT_IMAGE_ITEM: 'buycarDetailTypeAB/FETCH_CAR_CONTENT_IMAGE_ITEM',
  FETCH_DETAIL_BANNER_INFO: 'buycarDetailTypeAB/FETCH_DETAIL_BANNER_INFO'
};

/**
 * 내차사기 > 차량 상세 정보(상단) + 차량 사진목록 가져오기
 * @param {String} dlrPrdId 딜러 상품아이디
 */
export const fetchCarInfoAction = (dlrPrdId, isLogin = isLoginLiveCheck()) => async (dispatch) => {
  const carInfo = await axiosGet(`/api/buycar/selectProductDetailCarInfo${isLogin ? 'Jwt' : ''}.do?dlrPrdId=${dlrPrdId}`, null).then((res) => {
    return res?.data?.data || {};
  });

  if (isEmpty(carInfo)) return undefined;

  const photoList = await axiosGet(`/api/buycar/selectProductDetailCarPhoto.do?dlrPrdId=${dlrPrdId}`, null).then((res) => {
    return res?.data?.data || [];
  });

  const options = [];
  if (carInfo.lvstdYn === 'Y' || carInfo.lvshotYn === 'Y') options.push({ color: 'red', value: '라이브' });
  if (carInfo.auctSbidYn === 'Y') options.push({ color: 'blue60', value: '경매' });

  const carPhotos = photoList.map((e) => {
    return { ...e, options };
  });

  dispatch({
    type: types.FETCH_CAR_INFO,
    payload: { carInfo, carPhotos }
  });
  return carInfo;
};

/**
 * 내차사기 > 차량상세 기본정보 가져오기
 * @param {String} dlrPrdId 딜러 상품아이디
 */
export const fetchCarBaseOptionInfoAction = (dlrPrdId) => async (dispatch) => {
  const data = await axiosGet(`/api/buycar/selectProductDetailCarOption.do?dlrPrdId=${dlrPrdId}`, null).then((res) => {
    return res?.data?.data || {};
  });
  dispatch({
    type: types.FETCH_CAR_BASE_OPTION_INFO,
    payload: data
  });
  return data;
};

/**
 * 내차사기 > 차량상세 설명 [KeyPoint, History, 진단소견, 기타]
 * @param {String} dlrPrdId 딜러 상품아이디
 */
export const fetchCarContentAction = (dlrPrdId) => async (dispatch) => {
  const data = await axiosGet(`/api/buycar/selectProductDetailCarContent.do?dlrPrdId=${dlrPrdId}`, null).then((res) => {
    return res?.data || {};
  });
  const result = { ...data.data, photos: data.photos };
  dispatch({
    type: types.FETCH_CAR_CONTENT,
    payload: result
  });
  return result;
};

/**
 * 내차사기 > 차량상세 이미지목록
 * @param {String} dlrPrdId 딜러 상품아이디
 */
// export const fetchCarPhotosAction = (dlrPrdId) => async (dispatch) => {
//   const data = await axiosGet(`/api/buycar/selectProductDetailCarPhoto.do?dlrPrdId=${dlrPrdId}`, null).then((res) => {
//     return res?.data?.data || [];
//   });
//   dispatch({
//     type: types.FETCH_CAR_PHOTOS,
//     payload: data
//   });
//   return data;
// };

/**
 * 내차사기 > 차량상세 시세정보
 * @param {Object} carInfo 차량정보
 * @param {Array} carOptions 차량옵션
 */
export const fetchMarketPriceAction = (carInfo, carOptions) => async (dispatch) => {
  // console.log("fetchMarketPriceAction 1111 carInfo", carInfo);
  const carInfoCopy = {
    ...carInfo,
    crNo: carInfo.crNo || carInfo.carNo,
    crNm: carInfo.crNm || `${carInfo?.mnfcNm || ''} ${carInfo?.mdlNm || ''} ${carInfo?.clsNm || ''}`,
    noy: (carInfo?.frmYyyy || '').substr(0, 4),
    clr: carInfo.crClrCdNm,
    fuel: carInfo.fuelNm,
    mss: carInfo.mssNm,
    frstRegDt: carInfo.frstRegDt || carInfo.frstRegDt2,
    rlsPrc: carInfo.crRlsPrc ? Number(carInfo.crRlsPrc) * 10000 : Number(carInfo?.crRlsPrc || 0),
    usegubun: carInfo.crUseDvcd || carInfo.type,
    modelInfo: {
      crMnfcCd: carInfo.crMnfcCd,
      crMdlCd: carInfo.crMdlCd,
      crClsCd: carInfo.crClsCd,
      crDtlClsCd: carInfo.crDtlClsCd
    },
    historyData: carInfo.historyData
  };

  let options = null;
  if (carOptions) {
    options = findValuesByLabels(CAR_OPTIONS, carOptions);
  } else {
    options = convertCarOptionToStringArray(carInfo.optionList);
  }

  const param = getMarketPriceParameter(gInfoLive().id, carInfoCopy, options);
  // console.log("fetchMarketPriceAction -> gInfoLive().id", gInfoLive().id);
  // console.log("fetchMarketPriceAction -> carInfoCopy", carInfoCopy);
  // console.log("fetchMarketPriceAction -> options", options);
  // console.log("fetchMarketPriceAction -> param", param);
  const data = await getMarketPriceAsync(gInfoLive().id, param).then((res) => res);
  const result = {
    minPrice: data?.currentPrice?.marketMinPrice || 0,
    maxPrice: data?.currentPrice?.marketMaxPrice || 0,
    appPrice: data?.currentPrice?.price || 0,
    reportId: data?.reportId,
    uid: data?.uid
  };

  dispatch({
    type: types.FETCH_MARKET_PRICE,
    payload: result || {}
  });
  return result;
};

/**
 * 내차사기 > 딜러의 정보 가져오기
 * @param {String} dlrPrdId 딜러 상품아이디
 */
export const fetchDealerInfoAction = (dlrPrdId) => async (dispatch) => {
  const data = await axiosGet(`/api/buycar/searchSellerInformation.do?dlrPrdId=${dlrPrdId}`, null).then((res) => {
    return res?.data?.data || {};
  });
  dispatch({
    type: types.FETCH_DEALER_INFO,
    payload: data
  });
  return data;
};

/**
 * 내차사기 > 경매장 정보 가져오기
 * @param {String} dlrPrdId 딜러 상품아이디
 */
export const fetchAuctionInfoAction = (auctGoodno) => async (dispatch) => {
  const data = await axiosGet(`/api/buycar/selectProductDetailAuctionInfo.do?auctGoodno=${auctGoodno}`, null).then((res) => {
    return res?.data?.data || {};
  });
  // const data = {
  //   auctInfo: {
  //     auctNm: '경매장명',
  //     auctCorp: '경매사',
  //     auctDt: '2020-03-22',
  //     auctNo: '1920341'
  //   },
  //   auctPht: []
  // };
  dispatch({
    type: types.FETCH_AUCTION_INFO,
    payload: data || {}
  });
  return data;
};

/**
 * 내차사기 > 보험(사고)이력조회
 * @param {String} crNo 차량번호(예: 11가1577)
 */
export const fetchCarAccidentAction = (crNo) => async (dispatch) => {
  const data = await axiosPost(`/api/autobell/sitemanagement/carHistory/carHistoryView.do`, { crNo }).then((res) => {
    return res?.data?.data || {};
  });
  dispatch({
    type: types.FETCH_CAR_ACCIDENT,
    payload: data || {}
  });
  return data;
};

/**
 * 내차사기 > 성능점검조회
 * @param {String} perfInspNo 성능점검번호
 */
export const fetchCarPerformance = (perfInspNo, cancelToken = null) => async (dispatch) => {
  const data = await axiosGet(`/api/api/homeservice/selectPerfinsRecord.do?perfInspId=${perfInspNo}`, cancelToken).then((res) => res.data.data);
  // const data = await axiosGet(`/api/buycar/selectCarInspectionView.do?perfInspId=${perfInspNo}`, cancelToken).then((res) => res.data.data);

  dispatch({
    type: types.FETCH_CAR_PERFORMANCE,
    payload: data
  });
  return data;
};

/**
 * 내차사기 > 오토벨 상세 진단서 조회
 * @param {String} atbInspNo 오토벨검사번호
 * @returns {map} 차량 오토벨 상세 진단서
 */
export const fetchAtbInsp = (atbInspNo, cancelToken = null) => async (dispatch) => {
  const data = await axiosGet(`/api/api/homeservice/selectAutobellPerfinsRecord.do?atbInspNo=${atbInspNo}`, cancelToken).then((res) => res.data.data);
  dispatch({
    type: types.FETCH_CAR_AUTOBELL_INS,
    payload: data
  });
  return data;
};

/* banGrpCd AM052 배너그룹,  0010:메인,0020:메인하위,0030:상세,0040:이벤트*/
/* banGbnCd AM054 배너구분 0210:스프레드, 0220:띠배너, 0230:동영상*/
/* banExpRangeList AM053 노출범위 0010:전체, 0020:PC, 0030:MOBILE*/
// const banExpRangeParam = hasMobile ? '0010,0030' : '0010,0020'; // (전체, MOBILE) or (전체, PC)
/**
 * 내차사기 > 차량상세
 * @param {object} param { banGrpCd: '0020', banGbnCd: '0230', banExpRange: banExpRangeParam }
 * @returns {map} 차량 오토벨 상세 진단서
 */
export const fetchDetailBannerInfo = (param) => async (dispatch) => {
  const res = await axiosGetJson('/api/main/selectMainBannerInfo.do', param);
  console.log('[FETCH_DETAIL_BANNER_INFO] res:', res);
  console.log('FETCH_DETAIL_BANNER_INFO> [data]=%o', res.data);

  dispatch({
    type: types.FETCH_DETAIL_BANNER_INFO,
    payload: res.data.data
  });
};

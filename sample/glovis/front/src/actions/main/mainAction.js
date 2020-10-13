import { getMarketPriceParameter, getMarketPriceAsync, getPricingCarOptions } from '@src/components/pricingSystem/pricingUtil';
import { axiosGetJson, axiosPost } from '@src/utils/HttpUtils';
import * as types from './mainTypes';
const CAR_OPTIONS = getPricingCarOptions();
export const getTodayPopCarInfo = () => async (dispatch) => {
  const res = await axiosGetJson('/api/buycar/selectTodayPopCarInfo.do', {});

  console.log('오늘의 인기차량 [GET_TODAY_POP_CAR_INFO] res:', res);
  dispatch({
    type: types.GET_TODAY_POP_CAR_INFO,
    payload: res
  });
};

export const getPopularByCategoryList = () => async (dispatch) => {
  // const res = await axiosGetAsync(`/myBoardList/${userId}`, cancelToken);

  // 목록 및 슬라이드(slick)
  const res = await axiosPost('/api/buycar/selectCertifiedMallPopularProductList.do', {});
  console.log('[GET_POPULAR_BY_CATEGORY_LIST] res:', res);

  dispatch({
    type: types.GET_POPULAR_BY_CATEGORY_LIST,
    payload: res
  });
};

export const getPopularCarPrice = () => async (dispatch) => {
  // const res = await axiosPost(url, data);
  const res = await axiosPost('/api/sitemanagement/bestPick/selectBestPickCarSearch.do', {});

  console.log('[GET_POPULAR_CAR_PRICE] res:', res);
  dispatch({
    type: types.GET_POPULAR_CAR_PRICE,
    payload: res
  });
};

/**
 * 설명 : 프로그램 정보 저장 prgrSttCd
 * @returns
 */
export const insertPartnerQuest = (inputs) => async (dispatch) => {
  // const uri = `/api/main/insertPartnerQuest.do`;
  const res = await axiosPost('/api/main/insertPartnerQuest.do', inputs);
  console.log('[POST_PARTNER_QUEST] inputs:', inputs);
  console.log('[POST_PARTNER_QUEST] res:', res);
  dispatch({
    type: types.POST_PARTNER_QUEST,
    payload: res
  });
};

/**
 * 설명 : 차량비교함 추가
 * @returns
 */
export const insertCarCompareBox = (inputs) => async (dispatch) => {
  const uri = '/api/main/insertCarCompareBox.do';
  axiosPost(uri, inputs)
    .then(({ data }) => {
      console.log('mainAction > insertCarCompareBox>inputs=%o', inputs);
      dispatch({
        type: types.POST_INSERT_CAR_COMPARE_BOX,
        payload: data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectMainBannerInfo = (param) => async (dispatch) => {
  // const res = await axiosPost(url, data);
  const res = await axiosGetJson('/api/main/selectMainBannerInfo.do', param);

  console.log('[GET_MAINBANNER_INFO] res:', res);
  dispatch({
    type: types.GET_MAINBANNER_INFO,
    payload: res
  });
};

export const fetchMarketPriceAction = (carInfo, carOptions) => async (dispatch) => {
  const carInfoCopy = {
    crNo: carInfo.carNo,
    crNm: `${carInfo?.crNm || ''}`,
    noy: (carInfo?.frmYyyy || '').substr(0, 4),
    clr: carInfo.crClrNm,
    mss: carInfo.mssNm,
    frstRegDt: carInfo.frstRegDt2,
    // rlsPrc : carInfo.price, // 출고가
    // usegubun = carInfo.type, // 자가, 렌트
    // carInfo.seriesNo = carInfo.
    // carInfo.succYmd = carInfo.
    modelInfo: {
      crMnfcCd: carInfo.crMnfcCd,
      crMdlCd: carInfo.crMdlCd,
      crClsCd: carInfo.crClsCd,
      crDtlClsCd: carInfo.crDtlClsCd
    }
  };

  const param = getMarketPriceParameter('guest', carInfoCopy, findValuesByLabels(CAR_OPTIONS, carOptions));
  const data = await getMarketPriceAsync('guest', param).then((res) => res);
  const result = {
    rangeMin: data?.currentPrice.price,
    rangeMax: data?.currentPrice.price,
    minPrice: data?.currentPrice.marketMinPrice,
    maxPrice: data?.currentPrice.marketMaxPrice,
    appropriatePrice: data?.currentPrice.price
  };

  dispatch({
    type: types.FETCH_MARKET_PRICE,
    payload: result || {}
  });
  return result;
};

/** buyCarDetailAction.js
 * 한글 옵션을 시세조회조건에 맞게 영문대문자로 치환
 * @param {Array} options1 전체 옵션 리스트 : getPricingCarOptions1()
 * @param {Array} options2 현재차량의 옵션 리스트 : ["LED", "후측방경보(BSD)", "스마트키"]
 */
function findValuesByLabels(options1, options2) {
  if (options1 && options2) {
    return options1.filter((opt) => options2.some((op) => op.crId && op.optNm === opt.label)).map((opt) => opt.value);
  }
  return [];
}


//차량비교함 조회 
export const getCompareList = (param) => async (dispatch) => {
  const res = await axiosGetJson('/api/main/selectCarCompareBoxList.do', param);

  console.log('[GET_CAR_COMPAREBOX_LIST] res:', res);
  dispatch({
    type: types.GET_CAR_COMPAREBOX_LIST,
    payload: res
  });
};

//관심차량 조회
export const getInterestList = (param) => async (dispatch) => {
  const res = await axiosPost('/api/mypage/user/interest/selectInterestQuickViewCar.do', param);

  console.log('[GET_INTEREST_CAR_LIST] res:', res);
  dispatch({
    type: types.GET_INTEREST_CAR_LIST,
    payload: res
  });
};


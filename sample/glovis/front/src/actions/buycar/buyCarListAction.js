import { axiosGet, axiosPost, frontUrl } from '@src/utils/HttpUtils';
import { isLoginLiveCheck } from '@src/utils/LoginUtils';
import { async } from 'globalthis/implementation';

export const types = {
  GET_SUGGEST_WORD: 'buycar/buyCarList/GET_SUGGEST_WORD',
  GET_RECOMMAND_WORD: 'buycar/buyCarList/GET_RECOMMAND_WORD',
  GET_CARS_STUDIO: 'buycar/buyCarList/GET_CARS_STUDIO',
  GET_CARS_PREFER: 'buycar/buyCarList/GET_CARS_PREFER',
  GET_CARS_AUCTION: 'buycar/buyCarList/GET_CARS_AUCTION',
  GET_CARS_GENERAL: 'buycar/buyCarList/GET_CARS_GENERAL',
  GET_CARS_SMART: 'buycar/buyCarList/GET_CARS_SMART',
  GET_CARS_EQUIVALENT: 'buycar/buyCarList/GET_CARS_EQUIVALENT',
  TOGGLE_INTEREST: 'buycar/buyCarList/TOGGLE_INTEREST',
  SET_LOADING_IMAGE_MOBILE: 'buycar/buyCarList/SET_LOADING_IMAGE_MOBILE',
  SET_LIST_LOADING_MOBILE: 'buycar/buyCarList/SET_LIST_LOADING_MOBILE',
  SET_SUGGEST_WORD: 'buycar/buyCarList/SET_SUGGEST_WORD',
  SET_SEARCH_CR_NO: 'buycar/buyCarList/SET_SEARCH_CR_NO',
  SET_SEARCH_OPTIONS: 'buycar/buyCarList/SET_SEARCH_OPTIONS'
};

export const getSuggestWordList = () => async (dispatch) => {
  await axiosGet(`/api/buycar/selectSuggestWord.do`).then((res) => {
    dispatch({
      type: types.GET_SUGGEST_WORD,
      payload: res?.data?.data?.words || null
    });
  });
};
export const getRecomendWordList = () => async (dispatch) => {
  await axiosGet(`/api/buycar/selectRecomandWord.do`).then((res) => {
    dispatch({
      type: types.GET_RECOMMAND_WORD,
      payload: res?.data?.data?.words || null
    });
  });
};
export const getCarListStudio = (filter = {}) => async (dispatch) => {
  const config = { ...filter };
  let url = '';
  if (!isLoginLiveCheck()) {
    url = '/api/buycar/selectProductListItemList.do';
  } else {
    url = '/api/buycar/selectProductListItemListLogin.do';
  }
  await axiosPost(url, config).then((res) => {
    dispatch({
      type: types.GET_CARS_STUDIO,
      payload: res?.data?.data?.prdLst || null
    });
  });
};
export const getCarListGeneral = (filter = {}, currentPage = 1, countPerPage = 10, countPerMore = 6, order = 'upd_dt') => async (dispatch) => {
  const config = { ...filter, currentPage, countPerPage, countPerMore, order };
  let url = '';
  if (!isLoginLiveCheck()) {
    url = '/api/buycar/selectGeneralList.do';
  } else {
    url = '/api/buycar/selectGeneralListLogin.do';
  }
  console.log('loader loading...')

  await axiosPost(url, config).then((res) => {
    dispatch({
      type: types.GET_CARS_GENERAL,
      isMore: currentPage > 1 ? true : false,
      payload: res?.data?.data || []
    });
  });
};

export const getCarListSmart = (itemMaxPerPage = 3) => async (dispatch) => {
  // const { data } = await axiosGet(`/mock/buycar/carListAuction.json`);
  const data = await axiosGet(`${frontUrl}/mock/buycar/carListAuction.json`).then((res) => {
    return res?.data?.data?.prdLst || [];
  });

  // mapper : BannerItem 컴포넌트에 맞게 데이터 매핑 작업
  // const convertedDataList = res.data.data.prdLst.map((p) => mapper(p));
  dispatch({
    type: types.GET_CARS_SMART,
    payload: data.filter((car, i) => i < itemMaxPerPage) || []
    // payload: convertedDataList
  });
};

export const getCarListEquivalent = (itemMaxPerPage = 3) => async (dispatch) => {
  // const { data } = await axiosGet(`/mock/buycar/carListPrefer.json`);
  const data = await axiosGet(`${frontUrl}/mock/buycar/carListPrefer.json`).then((res) => {
    return res?.data?.data?.prdLst || [];
  });

  // mapper : BannerItem 컴포넌트에 맞게 데이터 매핑 작업
  // const convertedDataList = res.data.data.prdLst.map((p) => mapper(p));
  dispatch({
    type: types.GET_CARS_EQUIVALENT,
    payload: data.filter((car, i) => i < itemMaxPerPage) || []
    // payload: convertedDataList
  });
};

export const toggleItrt = (listName, carId) => async (dispatch) => {
  // API를 통해 숫자를 증감할 것
  // api update 이후 useRef 에 저장한 목록길이만큼 다시 조회하거나 조회생략
  dispatch({
    type: types.TOGGLE_INTEREST,
    payload: { listName, carId }
  });
};

export const setLoadingImageMobile = (loading) => async (dispatch) => {
  dispatch({
    type: types.SET_LOADING_IMAGE_MOBILE,
    payload: loading
  });
};

export const setListLoadingMobile = (loading) => async (dispatch) => {
  dispatch({
    type: types.SET_LIST_LOADING_MOBILE,
    payload: loading
  });
};

export const setSuggestWord = (sug) => async (dispatch) => {
  dispatch({
    type: types.SET_SUGGEST_WORD,
    payload: sug
  });
};
export const setSearchCrNo = (crNo) => async (dispatch) => {
  dispatch({
    type: types.SET_SEARCH_CR_NO,
    payload: crNo
  });
};
export const setSearchOption = (srchOption) => async (dispatch) => {
  dispatch({
    type: types.SET_SEARCH_OPTIONS,
    payload: srchOption
  });
};

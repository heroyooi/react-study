import { isEmpty } from 'lodash';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';

export const types = {
  GET_CMLL_DETAIL: 'buycar/certificationmall/GET_CMLL_DETAIL',
  GET_AREA_LIST: 'buycar/certificationmall/GET_AREA_LIST',
  GET_MNFC_LIST: 'buycar/certificationmall/GET_MNFC_LIST',
  GET_MODEL_LIST: 'buycar/certificationmall/GET_MODEL_LIST',
  GET_FUEL_LIST: 'buycar/certificationmall/GET_FUEL_LIST',
  GET_CMLL_SHOP_LIST: 'buycar/certificationmall/GET_CMLL_SHOP_LIST',
  // GET_CMLL_SHOP_DETAIL: 'buycar/certificationmall/GET_CMLL_SHOP_DETAIL',
  GET_CARS: 'buycar/certificationmall/GET_CARS',
  SET_LOADING_IMAGE_GET_CAR: 'buycar/certificationmall/SET_LOADING_IMAGE_GET_CAR'
};

// 인증몰 상세
export const getCmllDetail = (amllId) => async (dispatch) => {
  const data = await axiosGet(`/api/buycar/selectCertifiedMall.do?amllId=${amllId}`).then((res) => res?.data?.data || {});
  dispatch({
    type: types.GET_CMLL_DETAIL,
    payload: data
  });
  return data;
};

// 인증몰이 보유한 차량의 지역 조회
export const getAreaList = (amllId) => async (dispatch) => {
  const data = await axiosGet(`/api/buycar/selectCertifiedMallLocList.do?amllId=${amllId}`).then((res) => res?.data?.data?.locLst || []);
  data.unshift({ value: '', label: '전체' });
  dispatch({
    type: types.GET_AREA_LIST,
    payload: data
  });
  return isEmpty(data) ? '' : data[0].value || ''; //locCd
};

// 인증몰이 보유한 차량의 지역, 제조사 조회
export const getMnfcList = (amllId, locCd = '') => async (dispatch) => {
  const data = await axiosPost(`/api/buycar/selectCertifiedMallMnfcList.do`, { amllId, locCd }).then((res) => res?.data?.data?.mnfcLst || []);
  data.unshift({ value: '', label: '전체' });
  dispatch({
    type: types.GET_MNFC_LIST,
    payload: data
  });
  return isEmpty(data) ? '' : data[0].value || ''; //crMnfcCd
};

// 인증몰이 보유한 차량 중 선택지역, 제조사의 모델명 조회
export const getModelList = (amllId, locCd = '', crMnfcCd = '') => async (dispatch) => {
  const data = await axiosPost(`/api/buycar/selectCertifiedMallModelList.do`, { amllId, locCd, crMnfcCd }).then((res) => res?.data?.data?.mdlLst || []);
  data.unshift({ value: '', label: '전체' });
  dispatch({
    type: types.GET_MODEL_LIST,
    payload: data
  });
  return isEmpty(data) ? '' : data[0].value || ''; // crMdlCd
};

// 인증몰이 보유한 차량 중 선택지역, 제조사, 선택모델의 연료타입 조회
export const getFuelList = (amllId, locCd = '', crMnfcCd = '', crMdlCd = '') => async (dispatch) => {
  const data = await axiosPost(`/api/buycar/selectCertifiedMallFuelList.do`, { amllId, locCd, crMnfcCd, crMdlCd }).then((res) => res?.data?.data?.fuelLst || []);
  data.unshift({ value: '', label: '전체' });
  dispatch({
    type: types.GET_FUEL_LIST,
    payload: data
  });
  return isEmpty(data) ? '' : data[0].value || ''; // fuelDvCd
};

// 인증몰 소유의 전시장 목록 조회(전시장 상세 포함)
export const getCmllShopList = (amllId) => async (dispatch) => {
  const data = await axiosGet(`/api/buycar/selectCertifiedMallShopList.do?amllId=${amllId}`).then((res) => res?.data?.data || []);
  dispatch({
    type: types.GET_CMLL_SHOP_LIST,
    payload: isEmpty(data)
      ? [
          {
            amllId: '',
            amllShopId: '',
            shopAddr: '',
            shopNm: '',
            shopOptmCntn: '',
            shopPn: '',
            value: '',
            label: '없음'
          }
        ]
      : data.map((e) => {
          return isEmpty(e) ? { value: 0, label: '없음' } : { ...e, value: e?.amllShopId || '', label: e?.shopNm || '' };
        })
  });
};

// export const getCmllShopDetail = (amllId, amllShopId) => async (dispatch) => {
//   const queryString = qs.stringify({ amllId, amllShopId });
//   const data = await axiosGet(`/api/buycar/selectCertifiedMallShop.do?${queryString}`).then((res) => res?.data?.data || []);
//   dispatch({
//     type: types.GET_CMLL_SHOP_DETAIL,
//     payload: data
//   });
// };

// 인증몰 차량 목록 조회
export const getCarList = (amllId, currentPage = 1, locCd = '', crMnfcCd = '', crMdlCd = '', fuelDvCd = '', order = '') => async (dispatch) => {
  const data = await axiosPost(`/api/buycar/selectCertifiedMallDetail.do`, { amllId, currentPage, locCd, crMnfcCd, crMdlCd, fuelDvCd, order }).then((res) => {
    return res?.data?.data || [];
  });
  dispatch({
    type: types.GET_CARS,
    payload: data
  });
};

export const setLoadingImageMobile = (loading) => async (dispatch) => {
  dispatch({
    type: types.SET_LOADING_IMAGE_GET_CAR,
    payload: loading
  });
};

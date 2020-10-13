/**
 * @author 김민철
 */
import { axiosGet, axiosPost, frontUrl } from '@src/utils/HttpUtils';
// import { API_SERVER } from '../config';

// const BASE = `${API_SERVER}/commonCarInfo`;
const BASE = `/api/commonCarInfo`;
// const SERVER = 'http://http://10.25.44.131:8080/api/commonCarInfo';
// const SELECT_CARMART = '/mock/common/car/carMart.json'; // 제조사조회
// const SELECT_CARMART = '/mock/common/car/carMartTrue.json'; // 제조사조회
// const SELECT_CARMART = 'https://glovisaa.glovis.net/CARHISTORY.jsp'; // 제조사조회
const SELECT_CARMART            = '/api/sellcar/etc/selectCarmart.do';  // 카마트 조회
const SELECT_MNFC_LIST          = BASE + '/selectManufacturerList.do';  // 제조사조회
const SELECT_MODEL_LIST         = BASE + '/selectModelList.do'; //
const SELECT_DETAIL_MODEL_LIST  = BASE + '/selectModelDetailList.do'; //
const SELECT_CLASS_LIST         = BASE + '/selectClassList.do'; // selectClassList2
const SELECT_DETAIL_CLASS_LIST  = BASE + '/selectDetailClassList.do'; //
const SELECT_COLOR_LIST         = BASE + '/selectCarColorList.do'; //
const SELECT_CAR_FUELTYPE_LIST  = BASE + '/selectFuelTypeList.do'; // 연료타입
const SELECT_ALL_CARTYPE_LIST   = BASE + '/selectAllCarTypeList.do'; //
const SELECT_ALL_OPTION_LIST    = BASE + '/selectAllOptionList.do'; //
// const SELECT_CAR_USAGES_LIST = BASE + '/selectCarUsagesList.do'; //
const SELECT_CAR_USAGES_LIST = frontUrl + '/mock/common/car/carUsages.json'; //

const selectCarMart = (params) => axiosPost(SELECT_CARMART, params);

/**
 * 제조사 조회
 * @param {} nationId : number (0:국가, 1:국내, 2:해외)
 */
const selectManufacturerList = (nationId) => {
  return axiosGet(`${SELECT_MNFC_LIST}?nationId=${nationId}`);
};

/**
 * 제조사의 대표 모델 목록 조회
 * @param {} manufactureId
 */
const selectModelList = (manufactureId) => {
  return axiosGet(`${SELECT_MODEL_LIST}?manufactureId=${manufactureId}`);
};

/**
 * 대표 모델에 대한 상세 모델 조회
 * @param {} modelId
 */
const selectDetailModelList = (modelId) => {
  return axiosGet(`${SELECT_DETAIL_MODEL_LIST}?modelId=${modelId}`);
};

/**
 * 상세 모델에 대한 클래스 목록 조회
 */
const selectClassList = (detailModelId) => {
  return axiosGet(`${SELECT_CLASS_LIST}?detailModelId=${detailModelId}`);
};

/**
 * 클래스에 대한  상세 클래스 목록 조회
 * @param {} classId
 */
const selectDetailClassList = (classId) => {
  return axiosGet(`${SELECT_DETAIL_CLASS_LIST}?classId=${classId}`);
};

/**
 * 대표 모델에 해당하는 색상 목록 조회
 * @param {}} modelId
 */
const selectCarColorList = (modelId) => {
  return axiosGet(`${SELECT_COLOR_LIST}?modelId=${modelId}`);
};

/**
 * 대표 모델에 해당하는 연료 목록 조회
 */
const selectFuelTypeList = (modelId) => {
  return axiosGet(`${SELECT_CAR_FUELTYPE_LIST}?modelId=${modelId}`);
};

/**
 * 모든 옵션 목록 조회
 */
const selectAllOptionList = () => {
  return axiosGet(SELECT_ALL_OPTION_LIST);
};

/**
 * 모든 차종 목록 조회
 */
const selectAllCarTypeList = () => {
  return axiosGet(SELECT_ALL_CARTYPE_LIST);
};

/**
 * 차량용도 조회
 */
const selectCarUsagesList = () => {
  return axiosGet(SELECT_CAR_USAGES_LIST);
};

/**
 * 차량용도 조회
 */
const selectFrmYyyyList = (dtlMdlId) => {
  return axiosGet(BASE + "/selectFrmYyyyList.do?detailModelId="+dtlMdlId);
};

export {
  selectManufacturerList,
  selectModelList,
  selectDetailModelList,
  selectClassList,
  selectDetailClassList,
  selectCarColorList,
  selectFuelTypeList,
  selectAllOptionList,
  selectAllCarTypeList,
  selectCarMart,
  selectCarUsagesList,
  selectFrmYyyyList
};

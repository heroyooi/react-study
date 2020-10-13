/**
 * @author 김민철
 */
import { axiosPost, axiosGet } from '@src/utils/HttpUtils';
import { API_SERVER } from '../config';
const BASE = `${API_SERVER}/sellcar/noneval/`;
const INSERT_SELLCAR_AND_CARINFO = BASE + 'insertSellcarAndCarInfo.do';
const UPDATE_SELLCAR_AND_CARINFO = BASE + 'updateSellcarAndCarInfo.do';
const INSERT_CARPHOTO_LIST = BASE + 'insertCarPhotoList.do';
const UPDATE_CARPHOTO_LIST = BASE + 'updateCarPhotoList.do';
const UPDATE_REQUEST_COMPLETE = BASE + 'updateRequestComplete.do';
const UPDATE_CANCEL = BASE + 'updateCancel.do';
// const UPDATE_CANCEL_MOCK = '/mock/sellcar/noneval/updateCancel.do';
const UPDATE_SALE_CANCEL = BASE + 'updateSaleCancel.do';
// const UPDATE_SALE_CANCEL_MOCK = BASE + '/mock/sellcar/noneval/updateSaleCancel.do';
const SELECT_CNSG_INFO = BASE + 'selectNonevalCnsg.do'; // 탁송 정보
const SELECT_CANCEL_CNSG_INFO = BASE + 'selectNonevalCnclCnsg.do'; // 취소탁송 정보
const INSERT_REQUEST_CONSIGN = BASE + 'insertAbleRequestConsign.do'; // 판매진행(탁송신청)

/**
 * 신청서와 차량정보 등록
 * @param {
 *  신청서 정보,
 *  car{
 *    차량 정보,
 *    optionList: [
 *    ]
 *  }
 * } params kr.co.autobell.common.sellcar.vo.CarMstVO
 *
 * @return {
 *   slReqId : 신청서 아이디
 * }
 */
const insertSellcarAndCarInfo = (params) => {
  return axiosPost(INSERT_SELLCAR_AND_CARINFO, JSON.stringify(params));
};

/**
 * 신청서와 차량정보 수정
 * @param {
 *  slReqId,          // 신청서 아이디 필수
 *  신청서 정보
 *  car{
 *    차량 정보
 *    optionList: [
 *       {옵션정보}
 *    ]
 *  }
 * } params kr.co.autobell.common.sellcar.vo.CarMstVO
 */
const updateSellcarAndCarInfo = (params) => {
  return axiosPost(UPDATE_SELLCAR_AND_CARINFO, JSON.stringify(params));
};

/**
 * 차량 이미지 등록
 * @param {
 *  slReqId,          // 신청서 아이디 필수
 *  car{
 *    photoList: [
 *       {사진정보}
 *    ]
 *  }
 * } params kr.co.autobell.common.sellcar.vo.CarMstVO
 */
const insertCarPhotoList = (params) => {
  console.log('insertCarPhotoList', params);
  return axiosPost(INSERT_CARPHOTO_LIST, JSON.stringify(params));
};

/**
 * 차량 이미지 수정
 * @param {
 *  slReqId,          // 신청서 아이디 필수
 *  car{
 *    photoList: [
 *       {사진정보}
 *    ]
 *  }
 * } params kr.co.autobell.common.sellcar.vo.CarMstVO
 */
const updateCarPhotoList = (params) => {
  return axiosPost(UPDATE_CARPHOTO_LIST, JSON.stringify(params));
};

/**
 * 신청서 완료
 * @param {
 *  slReqId,          // 신청서 아이디 필수
 * } params
 */
const updateRequestComplete = (params) => {
  return axiosPost(UPDATE_REQUEST_COMPLETE, JSON.stringify(params));
};

const updateCancel = (params) => {
  console.log('API:: noneval updateCancel', params);
  return axiosPost(UPDATE_CANCEL, JSON.stringify(params));
};

const updateSaleCancel = (params) => {
  console.log('API:: noneval updateSaleCancel', params);
  return axiosPost(UPDATE_SALE_CANCEL, JSON.stringify(params));
  // return axiosGet(UPDATE_SALE_CANCEL_MOCK);
};

const updateSaleProcDecide = (params) => {
  return axiosPost(BASE + 'updateSaleProcDecide.do', JSON.stringify(params));
};

const selectNonevalCnsg = (params) => {
  return axiosPost(SELECT_CNSG_INFO, JSON.stringify(params));
};

const selectNonevalCnclCnsg = (params) => {
  return axiosPost(SELECT_CANCEL_CNSG_INFO, JSON.stringify(params));
};

const insertAbleRequestConsign = (params) => {
  return axiosPost(INSERT_REQUEST_CONSIGN, JSON.stringify(params));
};

export {
  insertSellcarAndCarInfo,
  updateSellcarAndCarInfo,
  insertCarPhotoList,
  updateCarPhotoList,
  updateRequestComplete,
  updateCancel,
  updateSaleCancel,
  updateSaleProcDecide,
  selectNonevalCnsg,
  selectNonevalCnclCnsg,
  insertAbleRequestConsign
};

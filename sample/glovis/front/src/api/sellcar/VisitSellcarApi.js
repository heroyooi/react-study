/**
 * @author 김민철
 */
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';
import { API_SERVER } from '../config';

const BASE = `${API_SERVER}/sellcar/visit`;
const BASE2 = `${API_SERVER}/sellcar`;
const INSERT_SELLCAR = BASE + '/insertSellcar.do'; // 신청서 등록
const UPDATE_SELLCAR = BASE + '/updateSellcar.do'; // 내용수정
const UPDATE_ACCOUNT = BASE + '/updateAccount.do'; // 계좌정보 등록/수정
// const UPDATE_ACCOUNT_MOCK = '/mock/sellcar/visit/updateAccount.json'; // 계좌정보 등록/수정
const UPDATE_CANCEL = BASE + '/updateCancel.do'; // 신청서 취소
// const UPDATE_CANCEL_MOCK = '/mock/sellcar/visit/updateCancel.json'; // 신청서 취소

/**
 * 방문평가 신청서 신청
 * @param {*} params
 */
const insertSellcar = (params) => {
  return axiosPost(INSERT_SELLCAR, JSON.stringify(params));
};

/**
 * 방문평가 신청서 정보 수정
 * @param {*} params
 */
const updateSellcar = (params) => {
  return axiosPost(UPDATE_SELLCAR, JSON.stringify(params));
};

/**
 * 방문평가 계좌정보 등록/수정
 * @param {*} params
 */
const updateAccount = (params) => {
  console.log('API::visit updateAccount', params);
  return axiosPost(UPDATE_ACCOUNT, JSON.stringify(params));
  // return axiosGet(UPDATE_ACCOUNT_MOCK);
};

/**
 * 신청서 취소
 */
const updateCancel = (params) => {
  console.log('API::visit updateCancel', params);
  return axiosPost(UPDATE_CANCEL, JSON.stringify(params));
  // return axiosGet(UPDATE_CANCEL_MOCK);
};

/**
 * 방문평가 상세보기
 */
const selectVisitDetail = (params) => {
  return axiosPost(BASE2 + '/selectAbleVisitSellcarDetail.do', JSON.stringify(params));
};

/**
 * 방문평가 취소신청
 */
const updateAbleVisitSellcarAction = (params) => {
  return axiosPost(BASE2 + '/updateAbleVisitSellcar.do', JSON.stringify(params));
};

export { insertSellcar, updateSellcar, updateAccount, updateCancel, selectVisitDetail, updateAbleVisitSellcarAction };

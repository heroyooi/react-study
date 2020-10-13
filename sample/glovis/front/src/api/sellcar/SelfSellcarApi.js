/**
 * @author 김민철
 */
import { axiosPost,aixosUpFile } from '@src/utils/HttpUtils';
import { API_SERVER } from '../config';

const BASE = `${API_SERVER}/sellcar/self/`;

const INSERT_APROVE = BASE + 'insertApproveList.do'; // 비교견적 승인
const INSERT_REFUSE = BASE + 'insertRefuseList.do'; // 비교견적 거절
const INSERT_SELLCAR_AND_CARINFO = BASE + 'insertSellcarAndCarInfo.do';
const UPDATE_SELLCAR_AND_CARINFO = BASE + 'updateSellcarAndCarInfo.do';
const INSERT_CARPHOTO_LIST = BASE + 'insertCarPhotoList.do';
const UPDATE_CARPHOTO_LIST = BASE + 'updateCarPhotoList.do';
const UPDATE_SELLCAR = BASE + 'updateSellcar.do'; // 내용수정
const UPDATE_CAR_AND_OPTION = BASE + 'updateCarAndOption.do'; // 차량정보 수정
const UPDATE_REQUEST_COMPLETE = BASE + 'updateRequestComplete.do';
const UPDATE_FOR_CANCEL = BASE + 'updateCancel.do';
const UPDATE_FOR_SALE_CANCEL = BASE + 'updateSaleCancel.do';
const UPDATE_RESTART = BASE + 'updateRestart.do';
const UPDATE_REVIEW = BASE + 'updateReview.do';
const UPDATE_MEMO = BASE + 'updateMemo.do'; // 관리자의 메모 등록
const INSERT_BIDD = BASE + 'bidd/insertBidd.do';
const UPDATE_BIDD_INTEREST = BASE + 'bidd/updateBiddInterest.do';
const UPDATE_BIDD = BASE + 'bidd/updateBidd.do';
const UPDATE_BIDD_CANCEL = BASE + 'bidd/updateBiddCancel.do';
const UPDATE_BIDD_CHOICE = BASE + 'bidd/updateBiddChoice.do';
const UPDATE_SBID_VISITDATE = BASE + 'succBidd/updateVisitDate.do'; // 방문일자 등록/수정
const UPDATE_SBID_DELAYREASON = BASE + 'succBidd/updateDelayReason.do'; // 거래지연 사유 등록/수정
const UPDATE_SBID_FAILREASON = BASE + 'succBidd/updateFailReason.do'; // 거래불발 사유 등록
const UPDATE_SBID_CMFG_BS_EXPL = BASE + 'succBidd/updateCmfgBsExpl.do'; // 위장거래 사유 등록
const UPDATE_SBID_COMPLETE_FILE = BASE + 'succBidd/updateCompleteFile.do'; // 거래 성사 완료 신
const SELECT_SBID_FAILREASON = BASE + "succBidd/selectFailReason.do"; // 거래 불발 내역 조회

// const INSERT_SELLCAR_AND_CARINFO_MOCK = '/mock/sellcar/self/insertSellcarAndCarInfo.json';
// const UPDATE_SELLCAR_AND_CARINFO_MOCK = '/mock/sellcar/self/updateSellcarAndCarInfo.json';
// const INSERT_CARPHOTO_LIST_MOCK = '/mock/sellcar/self/insertCarPhotoList.json';
// const UPDATE_CARPHOTO_LIST_MOCK = '/mock/sellcar/self/updateCarPhotoList.json';
// const UPDATE_REQUEST_COMPLETE_MOCK = '/mock/sellcar/self/updateRequestComplete.json';
// const UPDATE_FOR_CANCEL_MOCK = '/mock/sellcar/self/updateCancel.json';
// const UPDATE_FOR_SALE_CANCEL_MOCK = '/mock/sellcar/self/updateSaleCancel.json';
// const UPDATE_RESTART_MOCK = '/mock/sellcar/self/updateRestart.json';
// const UPDATE_REVIEW_MOCK = '/mock/sellcar/self/updateReview.json';
// const UPDATE_MEMO_MOCK = '/mock/sellcar/self/updateMemo.json';
// const INSERT_BIDD_MOCK = '/mock/sellcar/self/bidd/insertBidd.json';
// const UPDATE_BIDD_INTEREST_MOCK = '/mock/sellcar/self/bidd/updateBiddInterest.json';
// const UPDATE_BIDD_MOCK = '/mock/sellcar/self/bidd/updateBidd.json';
// const UPDATE_BIDD_CANCEL_MOCK = '/mock/sellcar/self/bidd/updateBiddCancel.json';
// const UPDATE_BIDD_CHOICE_MOCK = '/mock/sellcar/self/bidd/updateBiddChoice.json';
// const UPDATE_SBID_VISITDATE_MOCK = '/mock/sellcar/self/succBidd/updateVisitDate.json'; // 방문일자 등록/수정
// const UPDATE_SBID_DELAYREASON_MOCK = '/mock/sellcar/self/succBidd/updateDelayReason.json'; // 거래지연 사유 등록/수정
// const UPDATE_SBID_FAILREASON_MOCK = '/mock/sellcar/self/succBidd/updateFailReason.json'; // 거래불발 사유 등록
// const UPDATE_SBID_CMFG_BS_EXPL_MOCK = '/mock/sellcar/self/succBidd/updateCmfgBsExpl.json'; // 위장거래 사유 등록
// const UPDATE_SBID_COMPLETE_FILE_MOCK = '/mock/sellcar/self/succBidd/updateCompleteFile.json'; // 거래 성사 완료 신고

/**
 * 신청서 :: 신청서 및 차량정보 등록
 * @param {
 *  신청서 정보,
 *  car:{
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
  console.log('API::insertSellcarAndCarInfo::params', params);
  return axiosPost(INSERT_SELLCAR_AND_CARINFO, JSON.stringify(params));
};

/**
 * 신청서 :: 신청서 및 차량정보 수정
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
 * 신청서 :: 차량 이미지 등록
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
 * 신청서 :: 차량 이미지 수정
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
 * 신청서 :: 신청 완료
 * @param {
 *  slReqId,          // 신청서 아이디 필수
 * } params
 */
const updateRequestComplete = (params) => {
  return axiosPost(UPDATE_REQUEST_COMPLETE, JSON.stringify(params));
};

/**
 * 신청서 :: 신청 취소
 * @param {} params
 */
const updateForCancel = (params) => {
  console.log('API:: self updateForCancel', params);
  return axiosPost(UPDATE_FOR_CANCEL, JSON.stringify(params));  
};

/**
 * 신청서 :: 판매 취소
 * @param {} params
 */
const updateForSaleCancel = (params) => {
  console.log('API:: self updateForSaleCancel', params);
  return axiosPost(UPDATE_FOR_SALE_CANCEL, JSON.stringify(params));  
};

const updateRestart = (params) => {
  console.log('API:: self updateRestart', params);
  return axiosPost(UPDATE_RESTART, JSON.stringify(params));
};

const updateReview = (params) => {
  console.log('API:: self updateRestart', params);
  return axiosPost(UPDATE_REVIEW, JSON.stringify(params));  
};

/**
 * 비교견적 :: 입찰하기
 * @param {*} params
 */
const insertBidd = (params) => {
  console.log('API:: self insertBidd', params);
  return axiosPost(INSERT_BIDD, JSON.stringify(params));  
};

/**
 * 비교견적 :: 관심차량으로 등록/삭제
 * @param {*} params
 */
const updateBiddInterest = (params) => {
  console.log('API:: self updateBiddInterest', params);
  return axiosPost(UPDATE_BIDD_INTEREST, JSON.stringify(params));  
};

/**
 * 비교견적 :: 본인의 입찰내용 수정하기
 * @param {*} params
 */
const updateBidd = (params) => {
  console.log('API:: self updateBidd', params);
  return axiosPost(UPDATE_BIDD, JSON.stringify(params));  
};

/**
 * 비교견적 :: 본인의 입찰 취소
 * @param {*} params
 */
const updateBiddCancel = (params) => {
  console.log('API:: self updateBiddCancel', params);
  return axiosPost(UPDATE_BIDD_CANCEL, JSON.stringify(params));  
};

/**
 * 비교견적 :: 입찰 목록에서 한 건 선택
 * @param {*} params
 */
const updateBiddChoice = (params) => {
  console.log('API:: self updateBiddChoice', params);
  return axiosPost(UPDATE_BIDD_CHOICE, JSON.stringify(params));
};

/**
 * 낙찰차량 :: 방문일자 등록/수정
 * @param {*} params
 */
const updateSbidVisitDate = (params) => {
  console.log('API:: self updateSbidVisitDate', params);
  return axiosPost(UPDATE_SBID_VISITDATE, JSON.stringify(params));
};

/**
 * 낙찰차량 :: 거래지연 사유 등록/수정
 * @param {*} params
 */
const updateSbidDelayReason = (params) => {
  console.log('API:: self updateSbidDelayReason', params);
  return axiosPost(UPDATE_SBID_DELAYREASON, JSON.stringify(params));  
};

/**
 * 낙찰차량 :: 거래불발 사유 등록
 * @param {*} params
 */
const updateSbidFailReason = (params) => {
  console.log('API:: self updateSbidFailReason', params);
  return axiosPost(UPDATE_SBID_FAILREASON, JSON.stringify(params));  
};

/**
 * 낙찰차량 :: 위장거래 사유 등록
 * @param {*} params
 */
const updateSbidCmfgBsExpl = (formData) => {  
  return aixosUpFile(UPDATE_SBID_CMFG_BS_EXPL, formData);
};

/**
 * 낙찰차량 :: 거래 성사 완료 신고
 * @param {*} params
 */
const updateSbidCompleteFile = (formData) => {  
  return aixosUpFile(UPDATE_SBID_COMPLETE_FILE, formData);
};

const updateMemoCntn = (params) => {
  console.log('API:: self updateMemoCntn', params);
  return axiosPost(UPDATE_SBID_VISITDATE, JSON.stringify(params));
};

/**
 * 비교견적 승인
 * @param {object} params
 */
const insertApprove = (params) => {
  console.log('SelfSellCarApi::insertApprove param::', params);
  return axiosPost(INSERT_APROVE, JSON.stringify(params));
};

/**
 * 비교견적 불허
 * @param {object} params
 */
const insertRefuse = (params) => {
  console.log('SelfSellCarApi::insertRefuse param::', params);
  return axiosPost(INSERT_REFUSE, JSON.stringify(params));
};

const updateSellcar = (params) => {
  console.log('SelfSellCarApi::updateSellcar param::', params);
  return axiosPost(UPDATE_SELLCAR, JSON.stringify(params));
};

const updateCarAndOption = (params) => {
  console.log('SelfSellCarApi::updateCarAndOption param::', params);
  return axiosPost(UPDATE_CAR_AND_OPTION, JSON.stringify(params));
};

// 낙찰거래 불발 내역 조회
const selectFailReason = (params) => {
  console.log('SelfSellCarApi::selectFailReason param::', params);
  return axiosPost(BASE + 'succBidd/selectFailReason.do', JSON.stringify(params));
};

export {
  insertSellcarAndCarInfo,
  updateSellcarAndCarInfo,
  insertCarPhotoList,
  updateCarPhotoList,
  updateRequestComplete,
  updateForCancel,
  updateForSaleCancel,
  updateRestart,
  updateReview,
  insertBidd,
  updateBiddInterest,
  updateBidd,
  updateBiddCancel,
  updateBiddChoice,
  updateSbidVisitDate,
  updateSbidDelayReason,
  updateSbidFailReason,
  updateSbidCmfgBsExpl,
  updateSbidCompleteFile,
  insertApprove,
  insertRefuse,
  updateSellcar,
  updateCarAndOption,
  updateMemoCntn,
  selectFailReason
};

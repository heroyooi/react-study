/**
 * @author 김민철
 */
import { axiosPost, axiosGet } from '@src/utils/HttpUtils';
import { API_SERVER } from '../config';

const BASE = `${API_SERVER}/sellcar`;
const EXIST_SELECT_SELLCAR = BASE + '/selectSellcarForExists.do';
const SELECT_SELLCAR = BASE + '/selectSellcar.do'; // 한건조회
const SELECT_SELF_LIST_BY_DEALER = BASE + '/selectSelfListByDealer.do'; // 셀프평가차량 검색
const SELECT_COMPBIDD_LIST_BY_DEALER = BASE + '/selectCompBiddListByDealer.do'; // 입찰완료 내역 검색
const SELECT_SUCCBIDD_LIST_BY_DEALER = BASE + '/selectSuccBiddListByDealer.do'; // 낙찰차량 검색
// const SELECT_CUSTOMER_DETAIL = BASE + '/selectCustomerDetail.do'; // 고객 연락처 확인
const SELECT_DEALER_DETAIL = BASE + '/selectDealerDetail.do'; // 딜러 상세 정보
const SELECT_BIDDSTATUS_BY_AUCTID = BASE + '/selectBiddStatusByAuctId.do'; // 비교견적 아이디에 해당하는 견적 목록
const SELECT_SELLCAR_REQ_CAR_USE_CHECK = BASE + '/selectSellcarReqCarUseCheck.do'; // 신청가능한 차량인지 확인
const SELECT_SELLCAR_TERMS = BASE + '/selectSellcarTerms.do'; // 약관 조회
const SELECT_MEMBER_INFO = BASE + '/selectMemberInfo.do'; // 회원 기본정보 조회
/**
 * 판매유형 구분 없이 전체 조회
 * @param {*} params
 */
const selectSellcarList = (params) => {
  console.log('API::selectSellcarList::params', JSON.stringify(params));
  return axiosPost(BASE + '/selectSellcarStatusList.do', JSON.stringify(params));
};

/**
 * 신청 유형 구분 없이 한건 조회(로그인전 신청서 있는지 확인)
 * @param {*} params
 */
const selectSellcarDetail = (params) => {
  console.log('API::selectSellcar params', params);
  return axiosPost(EXIST_SELECT_SELLCAR, params, false);
};

/**
 * 신청 유형 구분 없이 한건 조회
 * @param {*} params
 */
const selectSellcar = (params) => {
  console.log('API::selectSellcar params', params);
  return axiosPost(SELECT_SELLCAR, JSON.stringify(params));
};

/**
 * 딜러가 입찰가능한 신청서 목록 ( 미참가 / 진행 )
 * @param {*} params
 */
const selectSelfListByDealer = (params) => {
  return axiosPost(SELECT_SELF_LIST_BY_DEALER, JSON.stringify(params));
};

/**
 * 딜러가 입찰에 참가한 신청서 목록 ( 진행 / 완료(낙찰,유찰))
 * @param {*} params
 */
const selectCompBiddListByDealer = (params) => {
  return axiosPost(BASE + '/selectSellcarBiddList.do', JSON.stringify(params));
};

/**
 * 딜러가 낙찰받은 신청서 목록 ( 완료(낙찰) )
 * @param {*} params
 */
const selectSuccBiddListByDealer = (params) => {
  return axiosPost(BASE + '/selectSellcarSuccessList.do', JSON.stringify(params));
};

/**
 * 신청서에 등록된 고객의 프로필 정보
 * @param {*} params
 */
// const selectCustomerDetail = (params) => {
//   // return axiosPost(SELECT_CUSTOMER_DETAIL, JSON.stringify(params));
//   return axiosGet(SELECT_CUSTOMER_DETAIL_MOCK);
// };

/**
 * 딜러의 평점 정보 / 고객의 이용후기 목록 / 딜러작성 후기 목록
 * @param {*} params
 */
const selectDealerDetail = (params) => {
  console.log(SELECT_DEALER_DETAIL);
  console.log('api:: selectDealerDetail', params);
  return axiosPost(SELECT_DEALER_DETAIL, params);
  // return axiosGet(SELECT_DEALER_DETAIL_MOCK);
};

/**
 * 비교견적 아이디에 해당하는 견적 목록 검색
 * @param {*} params
 */
const selectBiddStatusByAuctId = (params) => {
  console.log('api:: selectBiddDealerList', params);
  return axiosPost(BASE + '/selectBiddDealerList.do', JSON.stringify(params));
};

/**
 * 신청서 작성 가능 차인지 확인
 * @param {} params
 */
const selectSellcarReqCarUseCheck = (params) => {
  console.log('api:: selectSellcarReqCarUseCheck', params);
  return axiosPost(SELECT_SELLCAR_REQ_CAR_USE_CHECK, JSON.stringify(params), false);
};

/**
 * 신청서 약관 조회
 * @param {} params
 */
const selectSellcarTerms = (params) => {
  console.log('api:: SELECT_SELLCAR_TERMS', params);
  return axiosPost(SELECT_SELLCAR_TERMS, JSON.stringify(params));
};

const selectSelfSellcarList = (params) => {
  return axiosPost(BASE + '/selectSelfSellcarList.do', JSON.stringify(params));
};

/**
 * 24시간 실시간 비교견적 입찰 결과 - 딜러목록
 */
const selectBiddDealerList = (params) => {
  return axiosPost(BASE + '/selectBiddDealerList.do', JSON.stringify(params));
};

/**
 * 회원 기본정보 조회(자동완성 기능용도)
 */
const selectMemberInfo = (params) => {
  return axiosPost(BASE + '/selectMemberInfo.do', JSON.stringify(params));
};

export {
  selectSellcarList,
  selectSellcarDetail,
  selectSellcar,
  selectSelfListByDealer,
  selectCompBiddListByDealer,
  selectSuccBiddListByDealer,
  selectDealerDetail,
  selectBiddStatusByAuctId,
  selectSellcarReqCarUseCheck,
  selectSellcarTerms,
  selectSelfSellcarList,
  selectBiddDealerList,
  selectMemberInfo
};

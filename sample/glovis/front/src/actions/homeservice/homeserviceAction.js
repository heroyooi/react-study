/**
 * 설명 : 홈서비스 관리
 * @author 김지훈
 */
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';
import * as types from './homeserviceTypes';

/**
 * 설명 : 홈서비스 입력정보 store 저장
 */
export const setInputInfo = (payload) => async (dispatch) => {
  dispatch({
    type: types.SET_INPUT_INFO,
    payload: payload
  });
};

/**
 * 설명 : 홈서비스 공통코드 조회
 */
export const getCommonCodeList = (payload) => async (dispatch) => {
  const commonCodeList = await axiosGet(`/api/commonCode/selectCommonCodeList.do?cmCdTpId=${payload}`);

  dispatch({
    type: types.GET_COMMON_CODE_LIST,
    payload: commonCodeList || payload
  });
};

/**
 * 설명 : 홈서비스 약관 조회
 */
export const getPolicy = (payload) => async (dispatch) => {
  const policyList = await axiosGet(`/api/api/homeservice/selectTerms.do?tmsTp=${payload.tmsTp}&tmsSbj=${payload.tmsSbj}&tmsDiv=${payload.tmsDiv}`);

  dispatch({
    type: types.GET_POLICY,
    payload: policyList
  });
};

/*
 * 설명 : 오토벨 보증상품 목록 조회
 */
export const getEwList = () => async (dispatch) => {
  //const ewList = await axiosGet(`/api/api/homeservice/searchHsvcWrntPrdInfo.do?seqNo=3`);
  const ewList = await axiosGet(`/api/api/homeservice/searchHsvcWrntPrdInfo.do`);

  dispatch({
    type: types.GET_EW_LIST,
    payload: ewList
  });
};

/**
 * 설명 : 홈서비스 선택 차량 데이터 조회
 * @param {String} carId 차량ID
 * @returns {map} 홈서비스 선택 차량 데이터
 */
export const getCarInfo = (dlrPrdId, cancelToken = null) => async (dispatch) => {
  const res = await axiosGet(`/api/api/homeservice/selectCarInfo.do?dlrPrdId=${dlrPrdId}`, cancelToken);
  //const res = await axiosGet(`/api/homeservice/selectCarInfo.do?dlrPrdId=DP20022000015`, cancelToken);

  dispatch({
    type: types.GET_CAR_INFO,
    payload: res
  });
};

/**
 * 설명 : 홈서비스 선택 차량 성능점검기록부 조회
 * @param {String} perfInspId 성능점검번호
 * @returns {map} 차량 성능점검기록부
 */
export const getPerfomence = (perfInspId, cancelToken = null) => async (dispatch) => {
  const res = await axiosGet(`/api/api/homeservice/selectPerfinsRecord.do?perfInspId=${perfInspId}`, cancelToken);

  dispatch({
    type: types.GET_PERFOMENCE,
    payload: res
  });
};

/**
 * 설명 : 홈서비스 선택 차량 보험이력 조회
 * @param {String} crNo 차량번호
 * @returns {map} 차량 보험이력
 */
export const getCarHistory = (crNo, cancelToken = null) => async (dispatch) => {
  const res = await axiosPost('/api/autobell/sitemanagement/carHistory/carHistoryView.do', crNo);

  dispatch({
    type: types.GET_CAR_HISTORY,
    payload: res
  });
};

/**
 * 설명 : 홈서비스 선택 차량 오토벨 상세 진단서 조회
 * @param {String} atbInspNo 오토벨검사번호
 * @returns {map} 차량 오토벨 상세 진단서
 */
export const getAtbInsp = (atbInspNo, cancelToken = null) => async (dispatch) => {
  const res = await axiosGet(`/api/api/homeservice/selectAutobellPerfinsRecord.do?atbInspNo=${atbInspNo}`, cancelToken);

  dispatch({
    type: types.GET_AUTOBELL_INSPECTION,
    payload: res
  });
};

/**
 * 설명 : 회원정보 조회
 * @param {String} mbId 회원ID
 * @returns {map} 회원정보
 */
export const getMbInfo = (mbId) => async (dispatch) => {
  const data = { mbId: mbId };
  const mbInfo = await axiosPost('/api/api/homeservice/selectMemberInfo.do', data);

  dispatch({
    type: types.GET_MEMBER_INFO,
    payload: mbInfo
  });
};

/**
 * 설명 : 홈서비스 탁송료 조회
 */
export const getConsignFee = (payload, cancelToken = null) => async (dispatch) => {
  const res = await axiosPost('/api/api/homeservice/selectConsignFee.do', payload, cancelToken);

  dispatch({
    type: types.GET_CONSIGN_FEE,
    payload: res
  });
};

/**
 * 설명 : 홈서비스 이전등록비율 조회
 */
export const getTransRate = (payload, cancelToken = null) => async (dispatch) => {
  const res = await axiosPost('/api/buycar/totalCostCalculation.do', payload, cancelToken);

  dispatch({
    type: types.GET_TRANS_RATE,
    payload: res
  });
};

/**
 * 설명 : 홈서비스 차량관리비, 이전대행료 조회
 * 관련 테이블 및 화면설계 없음
 */
export const getTransFee = () => async (dispatch) => {
  const res = { crMgmtAmt: 198000, rdpmAgcyFeeAmt: 22000 };

  dispatch({
    type: types.GET_TRANS_FEE,
    payload: res
  });
};

/**
 * 설명 : 홈서비스 진행중 설정
 * @param null
 * @returns {map}
 */
export const setHomeServiceOngoing = (payload) => async (dispatch) => {
  dispatch({
    type: types.SET_HOME_ONGOING,
    payload: payload
  });
};

/**
 * 설명 : 홈서비스 신청 완료 정보 조회
 * @param {String} hsvcId 홈서비스ID
 * @returns {map} 신청완료 정보
 */
export const getHsvcReqInfo = (hsvcId, cancelToken = null) => async (dispatch) => {
  const res = await axiosGet(`/api/api/homeservice/selectPaymentInfo.do?hsvcId=${hsvcId}`, cancelToken);

  dispatch({
    type: types.GET_HSVC_REQ_INFO,
    payload: res
  });
};

/**
 * 설명 : 홈서비스 FAQ 리스트 조회
 * @returns {map} 홈서비스 FAQ 리스트
 */
export const getReqData = (cancelToken = null) => async (dispatch) => {
  const param = {
    pageNo: 1,
    tabNo: 7
  };
  const faqList = await axiosPost('/api/admin/cs/faq/selectFaqList.do', param);

  dispatch({
    type: types.HOME_REQ_DATA,
    payload: faqList
  });
};

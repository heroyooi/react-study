/**
 * 설명 : 스마트옥션
 * @author 박진하
 */
import { isEmpty } from 'lodash';
import * as http from '@src/utils/HttpUtils';
import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';
import { convertCarOptionToStringArray, getMarketPriceAsync, getMarketPriceParameter, getPricingCarOptions } from '@src/components/pricingSystem/pricingUtil';
import * as types from './autoAuctionTypes';
const CAR_OPTIONS = getPricingCarOptions();

/**
 * 설명 : 입력정보 state 저장
 */
export const setInputInfo = (payload) => async (dispatch) => {
  dispatch({
    type: types.SET_INPUT_INFO,
    payload: payload
  });
};

/**
 * 설명 : 공통코드 조회
 * @returns {codeList} 코드 목록
 */
export const getCommonCodeList = (payload) => async (dispatch) => {
  const commonCodeList = await http.axiosGet(`/api/commonCode/selectCommonCodeList.do?cmCdTpId=${payload}`);

  dispatch({
    type: types.GET_COMMON_CODE_LIST,
    payload: commonCodeList || payload
  });
};

/**
 * 설명 : 현금영수증 코드 조회(경매)
 * @returns {codeList} 코드 목록
 */
export const getCashReceiptCodeList = () => async (dispatch) => {
  const cashReceiptCodeList = await http.axiosGet(`/api/autoauction/selectCashReceiptCodeList.do`);

  dispatch({
    type: types.GET_CASH_RECEIPT_CODE_LIST,
    payload: cashReceiptCodeList
  });
};

/**
 * 설명 : 옥션 공지사항
 * @returns {noticeList} 옥션 공지사항 목록
 */
export const getNoticeList = (pageNo) => async (dispatch) => {
  const noticeList = await http.axiosGet(`/api/notice/slectNoticeList.do?inqPageNo=${pageNo}`);

  dispatch({
    type: types.GET_AUCTION_NOTICE_LIST,
    payload: noticeList
  });
};

/**
 * 설명 : 옥션 공지사항 상세
 * @returns {notice} 옥션 공지사항 상세내용
 */
export const getNotice = (bbsNo) => async (dispatch) => {
  const notice = await http.axiosGet(`/api/notice/selectAutoBellNotice.do?bbsNo=${bbsNo}`);

  dispatch({
    type: types.GET_NOTICE,
    payload: notice
  });
};

/**
 * 설명 : 옥션 서식다운로드
 * @returns {formatList} 옥션 서식다운로드 목록
 */
export const getFormatList = (pageNo) => async (dispatch) => {
  const formatList = await http.axiosGet(`/api/format/selectFormatList.do?inqPageNo=${pageNo}&ListType=IF`);

  dispatch({
    type: types.GET_FORMAT_LIST,
    payload: formatList
  });
};

/**
 * 설명 : 옥션 서식다운로드 상세
 * @returns {format} 옥션 서식다운로드 상세내용
 */
export const getFormatInfo = (fileNo) => async (dispatch) => {
  const formatInfo = await http.axiosGet(`/api/format/selectAutoBellFormat.do?fileNo=${fileNo}`);

  dispatch({
    type: types.GET_FORMAT,
    payload: formatInfo
  });
};

/**
 * 설명 : 오토벨 FAQ
 * @returns {autobellFaq} 오토벨 FAQ 목록
 */
export const getAutobellFaqList = () => async (dispatch) => {
  //const autobellFaqList = await http.axiosGet('/api/faq/getFaqList.do?inqPageNo=1&pagePerSize=5&categoryId=2');
  const param = {
    pageNo: 1,
    tabNo: 7
  };
  const autobellFaqList = await http.axiosPost('/api/admin/cs/faq/selectFaqList.do', param);

  dispatch({
    type: types.GET_AUTOBELL_FAQ_LIST,
    payload: autobellFaqList
  });
};

/**
 * 설명 : 경매약관 조회
 * @returns {policyList} 경매약관 목록
 */
export const getPolicyList = () => async (dispatch) => {
  let policyList = await http.axiosGet('/api/autoauction/selectPolicyList.do');
  policyList = policyList.data.data.map((list) => {
    return {
      ...list
    };
  });

  dispatch({
    type: types.GET_POLICY_LIST,
    payload: policyList
  });
};

/**
 * 설명 : 경매장 기본 정보 조회
 * @returns {auctionHouseList} 경매장 목록
 */
export const getAuctionHouseList = () => async (dispatch) => {
  let auctionHouseList = await http.axiosGet('/api/autoauction/selectAuctionHouseList.do');
  auctionHouseList = auctionHouseList.data.data.map((list) => {
    return {
      ...list
    };
  });

  dispatch({
    type: types.GET_AUCTION_HOUSE_LIST,
    payload: auctionHouseList
  });
};

/**
 * 설명 : 회원정보 조회
 * @param {String} mbId 회원ID
 * @returns {map} 회원정보
 */
export const getMbInfo = (mbId) => async (dispatch) => {
  const data = { mbId: mbId };
  let apiData = await http.axiosPost('/api/autoauction/selectMemberInfo.do', data);
  apiData = apiData.data.data;

  dispatch({
    type: types.GET_MEMBER_INFO,
    payload: apiData
  });
};

/**
 * 설명 : 회원정보 저장 후 Redux 저장
 * @param {map} payload 회원정보
 */
export const setMbInfo = (payload) => async (dispatch) => {
  dispatch({
    type: types.SET_MEMBER_INFO,
    payload
  });
};

/**
 * 설명 : 경매장 정보 조회
 * @param {String} auctId 경매장 ID
 * @returns {map} auctionHouse 경매장 정보
 */
export const getAuctionHouseInfo = (auctId) => async (dispatch) => {
  const houseInfo = await http.axiosGet(`/api/autoauction/selectAuctInfo.do?auctId=${auctId}`);

  dispatch({
    type: types.GET_AUCTION_HOUSE_INFO,
    payload: houseInfo
  });
};

/**
 * 설명 : 경매장 경매 회차 목록 조회
 * @returns {auctionNoList} 경매 회차 목록
 */
export const getAuctionNoList = (auctId) => async (dispatch) => {
  const auctNoList = await http.axiosGet(`/api/autoauction/selectAuctNoList.do?auctId=${auctId}`);

  dispatch({
    type: types.GET_AUCTION_NO_LIST,
    payload: auctNoList
  });
};

/**
 * 설명 : 최근 사용 계좌 조회
 * @param {String} mbId 회원 ID
 * @returns {map} 최근 사용 계좌 목록
 */
export const getLatestAccountList = (mbId) => async (dispatch) => {
  const data = { mbId: mbId };
  const apiData = await http.axiosPost('/api/autoauction/selectBankAccList.do', data);
  console.log('LatestAccountApiData : ', apiData);

  dispatch({
    type: types.GET_LATEST_ACCOUNT_LIST,
    payload: apiData
  });
};

/**
 * 설명 : 차종 : 제조사 목록 조회
 * @returns {mnfcCdList} 차량 제조사 목록
 */
export const getMnfcCdList = () => async (dispatch) => {
  const mnfcCdList = await http.axiosGet('/api/commonCarInfo/selectManufacturerList.do?nationId=0');

  dispatch({
    type: types.GET_MNFC_CD_LIST,
    payload: mnfcCdList
  });
};

/**
 * 설명 : 스마트옥션 출품 차량 조회
 * @param {auctId} 경매장ID
 * @returns {map} 스마트옥션 출품 차량 목록
 */
export const getExhibitCarList = (auctId) => async (dispatch) => {
  const apiData = await http.axiosGet(`/api/autoauction/selectExhibitCarList.do?auctId=${auctId}`);

  dispatch({
    type: types.GET_EXHIBIT_CAR_LIST,
    payload: apiData
  });
};

/**
 * 설명 : 스마트옥션 출품 등록
 * @param {map} payload 출품 차량 정보
 * @returns {code} 등록완료 상태코드
 */
export const setExhibitCar = (payload) => async (dispatch) => {
  /* await http.axiosPost('http://10.25.44.131:8080/api/autobell/autoauction/insertExhibitCarInfo.do', payload); */

  dispatch({
    type: types.SET_EXHIBIT_CAR,
    payload
  });
};

/**
 * 설명 : 경매낙찰 정보 조회
 * @param {map} payload 차량 조회 정보
 * @returns {map} 경매낙찰 차량 목록
 */
export const getWinningBidList = (payload) => async (dispatch) => {
  console.log('searchParam: ', payload);

  let urlParams = '';
  if (!isEmpty(payload)) {
    urlParams = '?crMnfc=' + payload.mnfc + '&crMdl=' + payload.model + '&crGrade=' + payload.grade + '&frmYyyy=' + payload.frmYyyy + '&fuelCd=' + payload.fuel + '&mssCd=' + payload.mss;
  }
  const auctionWinningList = await http.axiosGet(`http://localhost:80/mock/autoAuction/auctionWinningList.json${urlParams}`);
  const dataList = auctionWinningList.data.data.map((winBid) => {
    return {
      ...winBid
    };
  });

  dispatch({
    type: types.GET_WINNING_BID_LIST,
    payload: dataList
  });
};

/**
 * 설명 : 탁송 수수료 정보
 * @param null
 * @returns {map} 경매장 탁송 수수료 목록
 */
export const getConsignmentFee = () => async (dispatch) => {
  const auctionConsignFee = await http.axiosGet('/api/autoauction/selectAuctionConsignFee.do');

  dispatch({
    type: types.GET_CONSIGMENT_FEE_LIST,
    payload: auctionConsignFee
  });
};

/**
 * 설명 : 경매등록 진행중 설정
 * @param null
 * @returns {map} 경매 등록정보
 */
export const setAuctionOngoing = (payload) => async (dispatch) => {
  dispatch({
    type: types.SET_AUCTION_ONGOING,
    payload: payload
  });
};

/**
 * 설명 : 다가오는 경매 조회
 * @param null
 * @returns {map} 다가오는 경매 정보
 */
export const getNextAuctionInfo = () => async (dispatch) => {
  const nextAuctionInfo = await http.axiosGet('/api/autoauction/selectNextAuctionInfo.do');

  dispatch({
    type: types.GET_NEXT_AUCTION_INFO,
    payload: nextAuctionInfo
  });
};

/**
 * 설명 : 탁송 희망일
 * @param null
 * @returns {map} 탁송 희망일
 */
const consignYmdArr = [{ value: '', label: '선택' }];
const today = new Date();
for (let i = 0; i < 3; i++) {
  const year = today.getFullYear();
  const month = today.getMonth() + 1 < 10 ? '0' + String(today.getMonth() + 1) : today.getMonth() + 1;
  const date = today.getDate() + i < 10 ? '0' + String(today.getDate() + i) : today.getDate() + i;
  const fullDay = String(year + '-' + month + '-' + date);
  consignYmdArr.push({ value: fullDay, label: fullDay });
}
export const consignYmdList = consignYmdArr;

/**
 * 내차사기 > 차량상세 시세정보
 * @param {Object} carInfo 차량정보
 * @param {Array} carOptions 차량옵션
 */
export const fetchMarketPriceAction = (carInfo, carOptions) => async (dispatch) => {
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
  const data = await getMarketPriceAsync(gInfoLive().id, param).then((res) => res);
  const result = {
    minPrice: data?.currentPrice?.marketMinPrice || 0,
    maxPrice: data?.currentPrice?.marketMaxPrice || 0,
    appPrice: data?.currentPrice?.price || 0,
    reportId: data?.reportId,
    uid: data?.uid
  };

  dispatch({
    type: types.GET_MARKET_PRICE,
    payload: result || {}
  });
  return result;
};

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

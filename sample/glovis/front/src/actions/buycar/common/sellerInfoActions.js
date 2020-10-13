/**
 * 내차사기 공통 판매자정보 [판매자정보, 판매중차량, 판매완료차량, 전시장]
 * @author 한관영
 */
import qs from 'qs';
import { isEmpty } from 'lodash';
import { isLoginLiveCheck } from '@src/utils/LoginUtils';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';

//화면 당 보여질 차량 수
export const ITEMS_PER_PAGE = 4;

export const types = {
  GET_SELLER_INFO: 'buycar/common/sellerInfo/GET_SELLER_INFO',
  GET_ON_SALE_CAR_LIST: 'buycar/common/sellerInfo/GET_ON_SALE_CAR_LIST',
  GET_SOLD_OUT_CAR_LIST: 'buycar/common/sellerInfo/GET_SOLD_OUT_CAR_LIST',
  GET_CAR_MODEL_LIST: 'buycar/common/sellerInfo/GET_STORE_INFO'
};

/**
 * @param {String} dlrId 딜러아이디
 */
export const getSellerInfo = (dlrId) => async (dispatch) => {
  const queryString = qs.stringify({ dlrId });
  const data = await axiosGet(`/api/buycar/searchSellerInfoByDlr.do?${queryString}`).then((res) => {
    return res?.data?.data || {};
  });
  dispatch({
    type: types.GET_SELLER_INFO,
    payload: data
  });
  return data;
};

/**
 * 내차사기 > 공통 - 판매중 차량 목록 조회
 * @param {String} dlrId 딜러아이디
 * @param {String} sttDvcd '0010' //  판매상태 코드(AM032)
 * @param {String} cho '1' //         제조국 코드
 * @param {String} currentPage '1' // 현재 페이지 번호
 * @param {String} pageSize '4' //    페이지 당 차량 개수
 */
// const condition = { dlrId, mId: cookies.id, sttDvcd: STT_ON_SALE, cho: cho1, currentPage: onSaleCurrentPage, pageSize: ITEMS_PER_PAGE };
// dispatch(getOnSaleCarList(condition));

export const getOnSaleCarList = ({ dlrId, mId, sttDvcd = '0010', cho = '', currentPage = 1, pageSize = ITEMS_PER_PAGE }) => async (dispatch) => {
  const param = { dlrId, mId, sttDvcd, currentPage, cho, pageSize };
  const data = await axiosPost(`/api/buycar/selectSearchCarSalesList${isLoginLiveCheck() ? 'Jwt' : ''}.do`, param).then((res) => {
    return res?.data?.data || {};
  });
  console.log('getOnSaleCarList prdList ::::::::::::::::: ', data.prdList);
  console.log('getOnSaleCarList totalCnt ::::::::::::::::: ', data.totalCnt);
  dispatch({
    type: types.GET_ON_SALE_CAR_LIST,
    payload1: data.prdLst || [],
    payload2: data.totalCnt || 0
  });
  return data;
};

/**
 * 내차사기 > 공통 - 판매완료 차량 목록 조회
 * @param {String} dlrId 딜러아이디
 * @param {String} sttDvcd '0010' //  판매상태 코드(AM032)
 * @param {String} cho '1' //         제조국 코드
 * @param {String} crMdlCd '현대 그랜저' // 차량모델코드
 * @param {String} slCmplDtFrom '1' //판매완료일(FROM)
 * @param {String} slCmplDtTo '1' //  판매완료일(TO)
 * @param {String} currentPage '1' // 현재 페이지 번호
 * @param {String} pageSize '4' //    페이지 당 차량 개수
 */
export const getSoldOutCarList = ({ dlrId, mId, sttDvcd = '0060', cho = '', crMdlCd, slCmplDtFrom, slCmplDtTo, currentPage = 1, pageSize = ITEMS_PER_PAGE }) => async (dispatch) => {
  const param = { dlrId, mId, sttDvcd, cho, crMdlCd, slCmplDtFrom, slCmplDtTo, currentPage, pageSize };
  const data = await axiosPost(`/api/buycar/selectSearchCarSalesList${isLoginLiveCheck() ? 'Jwt' : ''}.do`, param).then((res) => {
    return res?.data?.data || {};
  });
  dispatch({
    type: types.GET_SOLD_OUT_CAR_LIST,
    payload1: data.prdLst || [],
    payload2: data.totalCnt || 0
  });
  return data;
};

/**
 * 내차사기 > 공통 - 제조국에 따른 차량모델 목록 조회(판매완료된 차량)
 * @param {String} cho '1' //         제조국 코드
 * @param {String} sttDvcd '0060' //  판매상태 코드(AM032)
 */
export const getCarModelList = (dlrId, cho = '', sttDvcd = '0060') => async (dispatch) => {
  const param = { dlrId, sttDvcd, cho };
  const data = await axiosPost(`/api/buycar/selectCarSalesModelList.do`, param).then((res) => {
    const result = res?.data?.data?.prdLst || [];
    const firstObj = isEmpty(result) ? { value: 'empty', label: '없음' } : { value: '', label: '전체' };
    result.unshift(firstObj);
    return result;
  });

  dispatch({
    type: types.GET_CAR_MODEL_LIST,
    payload: data
  });
  return data;
};

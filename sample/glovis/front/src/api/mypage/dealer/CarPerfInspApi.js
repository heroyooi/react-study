/**
 * @author 최승희
 */
import { axiosGet, axiosPost, } from '@src/utils/HttpUtils';
import qs from 'qs';

const SERVER = '/api/mypage/dealer/';
const INSERT_DEALER_PROD = SERVER + 'insertDealerProd.do';
const SELECT_PERF_INSP_REC_BY_PERF_INSP_NO = SERVER + 'selectPerfInspRecByPerfInspNo.do';
const SELECT_SALE_CAR_PERF = SERVER + 'selectSaleCarPerf.do';
const UPDATE_SALE_CAR_PERF = SERVER + 'insertPerfInspRec.do'; //merge into

// POST /mypage/dealer/insertPerfInspRec.do

/**
 * 딜러 상품과 차량등록
 * autobell_front\lib\share\validator\sellcar\Car.js
 * @param {
 *  car{
 *    차량 정보,
 *    optionList: [
 *    ]
 *  }
 * } params kr.co.autobell.common.dealer.vo.CarMstVO
 *
 * @return {
 *   slReqId : 신청서 아이디
 * }
 */
export const insertDealerProd = (params) => axiosPost(INSERT_DEALER_PROD, params);
export const selectDealerProdbyDlrPrdId = (perfInspId) => axiosGet(SELECT_PERF_INSP_REC_BY_PERF_INSP_NO + '?' + qs.stringify({ perfInspId }));
export const selectSaleCarPerf = (dlrPrdId) => axiosGet(SELECT_SALE_CAR_PERF + '?' + qs.stringify({ dlrPrdId }));
export const updateSaleCarPerf = (params) => axiosPost(UPDATE_SALE_CAR_PERF, params);

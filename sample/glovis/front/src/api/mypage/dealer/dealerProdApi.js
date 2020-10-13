/**
 * @author 최승희
 */
import { axiosGet, axiosPost, aixosUpFile } from '@src/utils/HttpUtils';
import qs from 'qs';
const BASE = '/api/mypage/dealer/';

const INSERT_DEALER_PROD = BASE + 'insertDealerProd.do';
const SELECT_DEALER_PROD = BASE + 'selectDealerProdByDlrPrdId.do';
const SELECT_SALE_PROD_CNT = BASE + 'selectSaleProdCnt.do';
const SELECT_SALE_PROD_ITEM_LIST = BASE + 'selectSaleProdItemList.do';
const SELECT_SALE_PROD_ITEM = BASE + 'selectSaleCarInfo.do';
const UPDATE_SALE_PROD_ITEM = BASE + 'updateSaleProdItem.do';
const UPDATE_SALE_CAR_PRICE = BASE + 'updateSaleCarPrice.do';
const UPDATE_PROD_CAR_INFO = BASE + 'prodCarInfoUpdate.do';
const UPDATE_SALE_CAR_CONFIRM = BASE + 'updateSaleCarConfirm.do';
const SELECT_ADVER_BASE_INFO = BASE + 'selectAdverBaseInfo.do';
const SELECT_ANALYSIS_DATA = BASE + 'selectAnalysisData.do';
const SELECT_MY_OTHER_ADVER_PROD_LOAD = BASE + 'selectMyOtherAdverProdLoad.do';

const SELECT_SALE_CAR_PIC = BASE + 'selectSaleCarPic.do';
const INSERT_SALE_CAR_PIC = BASE + 'insertSaleCarPic.do';

const SELECT_CAR_INFO_BY_CR_NO = BASE + 'selectDealerProdByCrNo.do';
const UPDATE_SALE_CAR_PERF_NEW = BASE + 'updateNewProdCarInfo.do'; //merge into

const SELECT_ACC_HISTORY = BASE + 'selectAccHistory.do';
const DELETE_PROD_CAR = BASE + 'updateProdCarDelete.do';

const SELECT_CHOICE_OPT_SET = BASE + 'selectChoiceOPTSet.do';
const SELECT_DEALER_CONDITION = BASE + 'selectDealerCondition.do';

const INSERT_JOIN_GROUP = BASE + 'insertJoinGroup.do';
const UPDATE_PERF_INSP_REC_PIC = BASE + 'updatePerfInspRecPic.do';
const SELECT_MY_AD_PROD_LIST = BASE + 'selectMyAdProdList.do';

const UPDATE_FREE_PASS_DATA = BASE + 'updateFreePassData.do';
const UPDATE_SEND_BY_STAND_BY_CAR = BASE + 'updateSendByStandByCar.do';

const SELECT_MY_DEALER_GROUP_INFO_LIST = BASE + 'selectMyDealerGroupInfoList.do';
const INSERT_LIVE_STUDIO_BEFORE_PAY = BASE + 'saveLiveRsvtBeforePayment.do';
const INSERT_LIVE_STUDIO_AFTER_PAY = BASE + 'saveLiveRsvtAfterPayment.do';
const DELETE_LIVE_STUDIO = BASE + 'cancelLiveRsvtInfo.do';

const SELECT_FREE_PASS_MGMT_LIST = BASE + 'selectFreePassMgmtList.do';
const INSERT_LIVE_SHOT = BASE + 'insertLiveShotRsvt.do';

const SELECT_COWORKERS = BASE + 'selectCoworkers.do';
const UPDATE_SEND_ANOTHER_DEALER = BASE + 'updateSendAnotherDealer.do';

export const insertDealerProd = (params) => axiosPost(INSERT_DEALER_PROD, params);
export const selectDealerProdbyDlrPrdId = (dlrPrdId) => axiosGet(SELECT_DEALER_PROD + '?' + qs.stringify({ dlrPrdId }));

export const selectSaleProdCnt = (params) => axiosGet(SELECT_SALE_PROD_CNT + '?' + qs.stringify(params));

export const updateProdCarInfo = (params) => axiosPost(UPDATE_PROD_CAR_INFO, params);
export const updateSaleCarPrice = (params) => axiosPost(UPDATE_SALE_CAR_PRICE, params);
export const updateSaleCarConfirm = (params) => axiosPost(UPDATE_SALE_CAR_CONFIRM, params);

export const selectSaleProdItemList = (params) => axiosGet(SELECT_SALE_PROD_ITEM_LIST + '?' + qs.stringify(params));
export const selectSaleProdItem = (dlrPrdId) => axiosGet(SELECT_SALE_PROD_ITEM + '?' + qs.stringify({ dlrPrdId }));
export const updateSaleProdItem = (params) => axiosPost(UPDATE_SALE_PROD_ITEM, params);

export const selectAdverPassInfo = (dlrPrdId) => axiosGet(SELECT_ADVER_PASS_INFO + '?' + qs.stringify({ dlrPrdId }));
export const selectAdverBaseInfo = (dlrPrdId) => axiosGet(SELECT_ADVER_BASE_INFO + '?' + qs.stringify({ dlrPrdId }));
export const selectAnalysisData = (params) => axiosGet(SELECT_ANALYSIS_DATA + '?' + qs.stringify(params));
export const selectMyOtherAdverProdLoad = (params) => axiosGet(SELECT_MY_OTHER_ADVER_PROD_LOAD + '?' + qs.stringify(params));

export const insertSaleCarPic = (params) => aixosUpFile(INSERT_SALE_CAR_PIC, params);
export const selectSaleCarPic = (crId) => axiosGet(SELECT_SALE_CAR_PIC + '?' + qs.stringify({ crId }));

export const selectCarInfoByCrNo = (crNo) => axiosGet(SELECT_CAR_INFO_BY_CR_NO + '?' + qs.stringify({ crNo }));

export const updateNewProdCarInfo = (params) => axiosPost(UPDATE_SALE_CAR_PERF_NEW, params);

export const selectAccHistory = (crNo) => axiosPost(SELECT_ACC_HISTORY, { crNo });

export const deleteProdCar = (params) => axiosPost(DELETE_PROD_CAR, params);

export const selectChoiceOPTSet = (gradeId) => axiosGet(SELECT_CHOICE_OPT_SET + '?' + qs.stringify({ gradeId }));

export const selectDealerCondition = () => axiosGet(SELECT_DEALER_CONDITION);

export const insertJoinGroup = (params) => axiosPost(INSERT_JOIN_GROUP, params);

export const updatePerfInspRecPic = (params) => aixosUpFile(UPDATE_PERF_INSP_REC_PIC, params);

export const selectMyAdProdList = () => axiosGet(SELECT_MY_AD_PROD_LIST);

export const updateFreePassData = (params) => axiosPost(UPDATE_FREE_PASS_DATA, params);

export const updateSendByStandByCar = (params) => axiosPost(UPDATE_SEND_BY_STAND_BY_CAR, params);

export const selectMyDealerGroupInfoList = (orgGrpId) => axiosGet(SELECT_MY_DEALER_GROUP_INFO_LIST + '?' + qs.stringify({ orgGrpId }));
export const insertLiveStudioBeforePay = (param) => axiosPost(INSERT_LIVE_STUDIO_BEFORE_PAY, param);
export const insertLiveStudioAfterPay = (param) => axiosPost(INSERT_LIVE_STUDIO_AFTER_PAY, param);
export const cancelLiveRsvtInfo = (param) => axiosPost(DELETE_LIVE_STUDIO, param);
export const insertLiveShotRsvt = (param) => axiosPost(INSERT_LIVE_SHOT, param);

export const selectFreePassMgmtList = () => axiosGet(SELECT_FREE_PASS_MGMT_LIST);

export const selectCoworkers = (params) => axiosGet(SELECT_COWORKERS + '?' + qs.stringify(params));
export const updateSendAnotherDealer = (params) => axiosPost(UPDATE_SEND_ANOTHER_DEALER, params);


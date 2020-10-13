/**
 * @author 최승희
 */
import { axiosGet, axiosPost, frontUrl} from '@src/utils/HttpUtils';
import qs from 'qs';
const globalThis = require('globalthis')();
// const origin = 
console.log('process :::::::::::::::::::: ', process.env)

const BASE = '/api/mypage/dealer/';

const SELECT_ADVER_PASS_INFO = BASE + 'selectMyDealerUseAdPassInfo.do';
const SELECT_ADVER_PRODUCT_LIST = BASE + 'selectAdverProductList.do';
const SELECT_COUPON_LIST = BASE + 'selectCouponList.do';
const SELECT_PAYMENT = BASE + 'selectPayment.do';
const SELECT_EVIDENCE = BASE + 'selectEvidence.do';

const SELECT_DEALER_DEPOSIT_WAITING_HIS = BASE + 'selectDealerDepositWaitingHis.do';
const UPDATE_DEPOSIT_WAITING_ITEM = BASE + 'updateDepositWaitingItem.do';

const SELECT_MY_POINT_LIST = BASE + 'selectMyPoint.do';
const SELECT_DEALER_PAYMENT_HIS = BASE + 'selectDealerPaymentHis.do';

const SELECT_MY_AD_PROD_LIST = BASE + 'selectMyAdProdList.do';
const UPDATE_FREE_PASS_MGMT = BASE + 'updateFreePassMgmt.do';

const SELECT_CANCELLATION_N_REFUND_LIST = BASE + 'selectCancellationNRefundList.do';
const SELECT_REQUEST_A_REFUND_LIST = BASE + 'selectRequestARefundList.do';

const INI_STD_PAY_CANCEL_REQUEST = BASE + 'INIStdPayCancelRequest.do';


export const selectAdverPassInfo = () => axiosGet(SELECT_ADVER_PASS_INFO);
// export const selectAdverPassInfo = () => axiosGet('/mock/mypage/dealer/usingTicketList.json');
export const selectAdverProductList = (params) => axiosGet(SELECT_ADVER_PRODUCT_LIST + '?' + qs.stringify(params));
// export const selectAdverProductList = () => axiosGet('/mock/mypage/dealer/prodTicketList.json');

export const selectCouponList = () => axiosGet(SELECT_COUPON_LIST);
// export const selectCouponList = () => axiosGet(frontUrl+'/mock/mypage/dealer/couponList.json');

// export const selectPayment = () => axiosGet(SELECT_PAYMENT);
export const selectPayment = (params) => axiosGet(frontUrl+'/mock/mypage/dealer/payment.json' + "?"+ qs.stringify(params));

// export const selectEvidence = () => axiosGet(SELECT_EVIDENCE);
export const selectEvidence = (params) => axiosGet("https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/Cash_mCmReceipt.jsp?noTid=" + params + "&clpaymethod=22");

export const selectDepositWaitingList = (params) => axiosGet(SELECT_DEALER_DEPOSIT_WAITING_HIS+ "?"+ qs.stringify(params));

export const updateDepositWaitingItem = (params) => axiosPost(UPDATE_DEPOSIT_WAITING_ITEM, params);
// export const updateDepositWaitingItem = (params) => axiosPost(frontUrl+'/mock/mypage/dealer/updateWaitingItem.json', params);

export const selectMyPoint = () => 2500//axiosGet('/mock/mypage/dealer/couponList.json');

export const selectDealerPaymentHis = (params) => axiosGet(SELECT_DEALER_PAYMENT_HIS + '?' + qs.stringify(params))

export const selectMyAdProdList = (params) => axiosGet(SELECT_MY_AD_PROD_LIST)

export const updateFreePassMgmt = (params) => axiosPost(UPDATE_FREE_PASS_MGMT, params)

export const selectCancellationNRefundList = (params) => axiosGet(SELECT_CANCELLATION_N_REFUND_LIST + '?' + qs.stringify(params))

export const selectRequestARefundList = (params) => axiosGet(SELECT_REQUEST_A_REFUND_LIST + '?' + qs.stringify(params))

export const INIStdPayCancelRequest = (params) => axiosPost(INI_STD_PAY_CANCEL_REQUEST, params)

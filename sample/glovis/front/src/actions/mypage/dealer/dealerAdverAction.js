// import * as http from '@src/utils/HttpUtils' //axiosGet
import axios from 'axios';
import dealerAdverTypes from '@src/actions/mypage/dealer/dealerAdverTypes';
import {
  selectAdverPassInfo,
  selectAdverProductList,
  selectDealerPaymentHis,
  selectPayment,
  selectDepositWaitingList,
  selectEvidence,
  updateDepositWaitingItem,
  selectCancellationNRefundList
} from '@src/api/mypage/dealer/dealerAdverApi';

export const getAdverPassInfoAction = (dlrPrdId) => async (dispatch) => {
  try {
    const usingTicketList = await selectAdverPassInfo(dlrPrdId).then((res) => res?.data?.data);
    console.log('getAdverPassInfoAction -> usingTicketList', usingTicketList);

    dispatch({
      type: dealerAdverTypes.OBJECT_TO_STORE_PROPS,
      payload: {
        usingTicketList
      }
    });
  } catch (error) {
    console.error('error : ', error);
  }
};

export const getAdverProductListAction = (dlrPrdId) => async (dispatch) => {
  try {
    const payload = await selectAdverProductList(dlrPrdId).then((res) => res?.data);

    dispatch({
      type: dealerAdverTypes.OBJECT_TO_STORE_PROPS,
      payload
    });
  } catch (error) {
    console.error('error : ', error);
  }
};

export const getPaymentListAction = (params, appendList) => async (dispatch) => {
  console.log('paymentlist : ', params, appendList);
  const actionType = appendList ? dealerAdverTypes.APPEND_REQ_LIST : dealerAdverTypes.OBJECT_TO_STORE_PROPS;
  try {
    const { data, totalcnt, statusinfo } = await selectDealerPaymentHis(params).then((res) => res?.data);
    console.log('getPaymentListAction -> data', data);
    console.log('getPaymentListAction -> statusinfo.returncd', statusinfo.returncd);
    console.log('getPaymentListAction -> totalcnt', totalcnt);
    if (statusinfo.returncd === '000') {
      dispatch({
        type: actionType,
        payload: {
          paymentList: data,
          totalCount: totalcnt
        }
      });
    } else {
      dispatch({
        type: actionType,
        payload: {
          paymentList: [],
          totalCount: 0
        }
      });
    }
    // return totalcnt;
  } catch (error) {
    console.error('error : ', error);
  }
};

export const getEvidenceAction = (id) => async (dispatch) => {
  try {
    console.log('evidence : ', id);
    const payload = await selectEvidence(id).then((res) => res?.data?.data);

    // dispatch({
    //   type: dealerAdverTypes.INIT_STATE,
    //   payload
    // })
    return payload;
  } catch (error) {
    console.error('error : ', error);
  }
};

export const getDepositWaitingListAction = (params, appendList = false) => async (dispatch) => {
  const actionType = appendList ? dealerAdverTypes.APPEND_REQ_LIST : dealerAdverTypes.OBJECT_TO_STORE_PROPS;
  try {
    const { data, statusinfo, totalcnt, totalpayamt } = await selectDepositWaitingList(params).then((res) => res?.data);
    console.log('getDepositWaitingListAction -> data', data);
    console.log('getDepositWaitingListAction -> statusinfo', statusinfo);

    dispatch({
      type: actionType,
      payload: {
        depositWaitingList: data ?? [],
        depositTotalcnt: totalcnt === 0 ? '0' : totalcnt,
        depositTotalpayamt: totalpayamt === 0 ? '0' : totalpayamt
      }
    });
  } catch (error) {
    console.error('error : ', error);
  }
};

export const updateDepositWaitingItemAction = (params) => async (dispatch) => {
  try {
    const payload = await updateDepositWaitingItem(params).then((res) => res?.data?.data);
    console.log('payload : ', payload);

    // const payload = {
    //   list : 'depositWaitingList',
    //   key : 'code',
    //   value : '01'
    // }

    dispatch({
      type: dealerAdverTypes.REMOVE_ITEM_IN_LIST,
      payload
    });
    return payload;
  } catch (error) {
    console.error('error : ', error);
  }
};

export const getCancellationNRefundListAction = (params, appendList = false) => async (dispatch) => {
  const actionType = appendList ? dealerAdverTypes.APPEND_REQ_LIST : dealerAdverTypes.OBJECT_TO_STORE_PROPS;
  try {
    const { data, statusinfo, totalcnt } = await selectCancellationNRefundList(params).then((res) => res?.data);

    console.log('getCancellationNRefundListAction -> statusinfo', statusinfo);
    console.log('getCancellationNRefundListAction -> data', data);
    console.warn('totalcnt!!!', totalcnt);
    dispatch({
      type: actionType,
      payload: {
        cancelList: data ?? [],
        cancelTotalcnt: totalcnt === 0 ? '0' : totalcnt
      }
    });
  } catch (error) {
    console.error('error : ', error);
  }
};

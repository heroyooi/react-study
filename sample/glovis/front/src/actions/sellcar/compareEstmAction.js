/**
 * 비교견적 처리 Action
 */
import * as srchApi from '../../api/sellcar/AllSellcarSearchApi';
import * as api from '../../api/sellcar/SelfSellcarApi';
import * as cmprEstmTypes from './compareEstmTypes';

export const selectSelfListAction = (params) => async (dispatch) => {
  console.log("selectSelfListAction::",params);
  srchApi
    .selectSelfSellcarList(params)
    .then((res) => {
      console.log("selectSelfListAction::",res);
      const list = res.data.data;
      dispatch({
        type: cmprEstmTypes.SET_SELF_LIST,
        payload: list
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectCompBiddListAction = (params) => async (dispatch) => {
  //console.log('selectCompBiddListAction');
  srchApi
    .selectCompBiddListByDealer(params)
    .then((res) => {
      const list = res.data.data;
      console.log("selectCompBiddListAction::",res.data.data);
      dispatch({
        type: cmprEstmTypes.SET_COMPBIDD_LIST,
        payload: list
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectSuccBiddListAction = (params) => async (dispatch) => {
  console.log('selectSuccBiddListAction');
  srchApi
    .selectSuccBiddListByDealer(params)
    .then((res) => {
      const list = res.data.data;
      dispatch({
        type: cmprEstmTypes.SET_SUCCBIDD_LIST,
        payload: list
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const insertBiddAction = (params) => async (dispatch) => {
  // console.log('insertBiddAction', params);
  return await api
    .insertBidd(params)
    .then((res) => {
      console.log('insertBiddAction :: res', res);      
      if (res?.data?.statusinfo.returncd === '000') {
        // dispatch({
        //   type: cmprEstmTypes.INSERT_BIDD,
        //   payload: {
        //     hh24AuctId: params.hh24AuctId,
        //     dlrBiddNo: dlrBiddNo,
        //     biddAmt: params.biddAmt,
        //     listType: params.listType
        //   }
        // });
        return true;
      }
      return false;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const updateBiddAction = (params) => async (dispatch) => {
  console.log('updateBiddAction', params);
  return await api
    .updateBidd(params)
    .then((res) => {
      // console.log("returnCd=",res?.data?.result.returncd);
      if (res?.data?.result.returncd === '000') {
        console.log("success");
        // dispatch({
        //   type: cmprEstmTypes.UPDATE_BIDD,
        //   payload: {
        //     hh24AuctId: params.hh24AuctId,
        //     dlrBiddNo: dlrBiddNo,
        //     biddAmt: params.biddAmt,
        //     listType: params.listType
        //   }
        // });
        return true;
      }
      return false;
    })
    .catch((err) => {
      // console.log(err);
      return false;
    });
};

export const updateCancelAction = (params) => async (dispatch) => {
  return await api
    .updateBiddCancel(params)
    .then((res) => {
      console.log("res::",res.data);
      console.log("res::",res.data.result);
      console.log("res::",res.data.result.returncd);
      if(res.data.result.returncd === '000'){      
        // dispatch({
        //   type: cmprEstmTypes.CANCEL_BIDD,
        //   payload: {
        //     hh24AuctId: params.hh24AuctId,
        //     dlrBiddNo: params.dlrBiddNo,
        //     listType: params.listType
        //   }
        // });
        return true;
      }
      return false;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const toggleInterestAction = (params) => async (dispatch) => {
  console.log(params);
  api
    .updateBiddInterest(params)
    .then((res) => {
      console.log(res);
      dispatch({
        type: cmprEstmTypes.TOGGLE_INTEREST,
        payload: {
          hh24AuctId: params.hh24AuctId
        }
      });
    })
    .catch((err) => {
      console.log('err', err);
    });
};

export const updateVisitDateAction = (params) => async (dispatch) => {
  console.log('updateVisitDate', params);
  return await api
    .updateSbidVisitDate(params)
    .then((res) => {
      if ( res.data.result.returncd === '000' ) {
        const newbsSttDvcd = res?.data?.data?.bsSttDvcd;
        const newBsSttDvcdNm = res.data.data.bsSttDvcdNm;

        dispatch({
          // type: cmprEstmTypes.UPDATE_VISITDATE,
          type: cmprEstmTypes.UPDATE_PROPS,
          payload: {
            hh24AuctId: params.hh24AuctId,
            bsSttDvcd: newbsSttDvcd,
            bsSttDvcdNm: newBsSttDvcdNm,
            vstDt: params.vstDt,
            vstLocNm: params.vstLocNm,
            vstLocDtlNm: params.vstLocDtlNm
          }
        });
        return true;
      }
      return false;
    })
    .catch((err) => {
      console.log('err', err);
      return false;
    });
};

export const updateDelayRsn = (params) => async (dispatch) => {
  console.log('updateDelayRsn', params);
  return await api
    .updateSbidDelayReason(params)
    .then((res) => {
      console.log(res);
      if ( res.data.result.returncd === '000' ) {
        const newDvcd = res?.data?.data?.bsSttDvcd;
        const newDvcdNm = res?.data?.data?.bsSttDvcdNm;
        
        dispatch({
          // type: cmprEstmTypes.UPDATE_DELAYRSN,
          type: cmprEstmTypes.UPDATE_PROPS,
          payload: {
            hh24AuctId: params.hh24AuctId,
            bsSttDvcd: newDvcd,
            bsSttDvcdNm: newDvcdNm,
            bsDlRsnCntn: params.bsDlRsnCntn
          }
        });
        return true;
      }
      return false;
    })
    .catch((err) => {
      console.log('err', err);
      return false;
    });
};

export const updateFailReasonAction = (params) => async (dispatch) => {
  return await api
    .updateSbidFailReason(params)
    .then((res) => {
      if (res.data.result.returncd === '000') {
        const { bsSttDvcd, bsSttDvcdNm, failRsnTpcd, failRsnTpcdNm } = res?.data?.data;
        dispatch({
            type: cmprEstmTypes.UPDATE_PROPS,
          payload: {
            hh24AuctId: params.hh24AuctId,
            bsSttDvcd,
            bsSttDvcdNm,
            bsFailYmd: params.bsFailYmd,
            failRsnTpcd,
            failRsnTpcdNm,
            failRsnCntn: params.failRsnCntn
          }
        });
        return true;
      }
      return false;
    })
    .catch((err) => {
      return false;
    });
};

export const updateCompleteFileAction = (formData) => async (dispatch) => {
  return await api
    .updateSbidCompleteFile(formData)
    .then((res) => {
      console.log(res.data.data);
      const { bsSttDvcd, bsSttDvcdNm } = res?.data?.data;
      if (bsSttDvcd !== undefined) {
        dispatch({
          // type: cmprEstmTypes.UPDATE_COMPLETEFILE,
          type: cmprEstmTypes.UPDATE_PROPS,
          payload: {
            hh24AuctId: formData.hh24AuctId,
            bsSttDvcd,
            bsSttDvcdNm,
            lastBsYmd: formData.lastBsYmd,
            reduItmTpcd: formData.reduItmTpcd,
            reduItmRsnCntn: formData.reduItmRsnCntn,
            lastPrchAmt: formData.lastPrchAmt
          }
        });
        return true;
      }
      return false;
    })
    .catch((err) => {
      return false;
    });
};

export const updateCmfgBsExplAction = (params) => async (dispatch) => {
  return await api
    .updateSbidCmfgBsExpl(params)
    .then((res) => {
      const { bsSttDvcd, bsSttDvcdNm } = res?.data?.data;
      if (bsSttDvcd !== undefined) {
        dispatch({
          type: cmprEstmTypes.UPDATE_PROPS,
          payload: {
            bsSttDvcd,
            bsSttDvcdNm
          }
        });
        return true;
      }
      return false;
    })
    .catch((err) => {
      return false;
    });
};

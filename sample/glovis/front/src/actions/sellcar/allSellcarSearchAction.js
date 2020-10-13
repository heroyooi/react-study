import * as api from '../../api/sellcar/AllSellcarSearchApi';
import sellcarTypes from './sellCarTypes';
/**
 * 신청 목록 가져오기
 * @param {object} params 신청 목록 검색조건
 */
export const selectSellcarListAction = (params, appendReqList) => async (dispatch) => {
  // console.log('allsellcarSearchAction. params : ', params);
  const actionType = (appendReqList) ? sellcarTypes.APPEND_REQ_LIST : sellcarTypes.INIT_REQ_LIST;
  await api
    .selectSellcarList(params)
    .then((res) => {
      console.log('sellcarAction, then : ', res);
      if (res?.data?.statusinfo?.returncd === '000') {
        dispatch({
          type: actionType,
          payload: res.data.data || []
        });
      } else if (res?.data?.statusinfo?.returncd === '009') {
        dispatch({
          type: actionType,
          payload: []
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectBiddStatusByAuctIdAction = (params) => async (dispatch) => {
  return await api
    .selectBiddStatusByAuctId(params)  
    .then((res) => {
      console.log('selectBiddStatusByAuctIdAction', res);
      if (res.data.statusinfo.returncd === '000') {
        dispatch({
          type: sellcarTypes.INPUT_STATE,
          payload: {
            state: 'cmprEstm',
            value: res.data.data
          }
        });
        return true;
      }
      return false;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

/**
 * 방문평가 신청 상세 정보 가져오기
 * @param {object} params 신청 목록 검색조건
 */
export const selectSellcarAction = (params) => async (dispatch) => {
  await api
    .selectSellcar(params, JSON.stringify(params))
    .then((res) => {
      console.log(res);
      if (res.data.statusinfo.returncd === '000') {
        dispatch({
          type: sellcarTypes.FETCH_REQUEST_DETAIL,
          payload: res.data.data || {}
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setLoadingImageMobile = (loading) => async (dispatch) => {
  dispatch({
    type: sellcarTypes.SET_LOADING_IMAGE_MOBILE,
    payload: loading
  });
};

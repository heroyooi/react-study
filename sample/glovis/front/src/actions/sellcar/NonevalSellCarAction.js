/**
 * 마이페이지 내차팔기 관련 처리
 * @author : 김민철
 */
import * as api from '../../api/sellcar/NonevalSellcarApi';
import sellCarTypes from './sellCarTypes';
import { NONEVAL_STT } from '@src/constant/mbSlReqStt';

/**
 * @memberof module:sellCarAction
 * @desc 신청정보 등록
 * @param {Object} req
 * @param {String} reqType 신청서 타입
 */
export const insertReqAction = (Req) => async (dispatch) => {
  return await api
    .insertSellcarAndCarInfo(Req)
    .then((res) => {
      console.log(res);
      if (res.data.statusinfo.returncd === '000') {
        const slReqId = res.data.data.slReqId;
        const crId = res.data.data.crId;
        console.log('slReqId', slReqId);
        const payload = {
          state: 'seller',
          prop: 'crId',
          value: crId
        };
        dispatch({
          type: sellCarTypes.INPUT_PROP,
          payload
        });
        const _payload = {
          state: 'seller',
          prop: 'slReqId',
          value: slReqId
        };
        dispatch({
          type: sellCarTypes.INPUT_PROP,
          payload: _payload
        });
        const __payload = {
          state: 'car',
          prop: 'crId',
          value: crId
        };
        dispatch({
          type: sellCarTypes.INPUT_PROP,
          payload: __payload
        });
        return res.data.data;
      }
      return null;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

/**
 * @memberof module:sellCarAction
 * @desc 신청정보 수정
 * @param {*} Req
 */
export const updateReqAction = (Req) => async (dispatch) => {
  return await api
    .updateSellcarAndCarInfo(Req)
    .then((res) => {
      console.log(res);
      if (res.data.statusinfo.returncd === '000') {
        const slReqId = res.data.data.slReqId;
        console.log('slReqId', slReqId);
        const payload = {
          state: 'seller',
          prop: 'slReqId',
          value: slReqId
        };
        dispatch({
          type: sellCarTypes.INPUT_PROP,
          payload
        });
        return res.data.data;
      }
      return null;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

/**
 * @memberof module:sellCarAction
 * @desc 사진 정보 저장
 * @param {*} Req
 */
export const insertPhotoListAction = (Req, reqType) => async (dispatch) => {
  try {
    console.log('insertPhotoListAction,', Req, reqType);
    const data = await api.insertCarPhotoList(Req).then((res) => res?.data);
    console.log('TCL: updateReqAction -> data', data);
    return Req.slReqId;
  } catch (err) {
    console.error('error : 에러페이지로 리디렉션 : ', err);
  }
};

/**
 * @memberof module:sellCarAction
 * @desc 신청서 성 완료
 * @param {*} Req
 */
export const updateRequestCompleteAction = (Req, reqType) => async (dispatch) => {
  try {
    console.log('insertPhotoListAction,', Req, reqType);
    const { data } = await api.updateRequestComplete(Req).then((res) => res?.data);
    // console.log('TCL: updateReqAction -> data', data);
    return data;
  } catch (err) {
    console.error('error : 에러페이지로 리디렉션 : ', err);
  }
  return null;
};

/**
 * 계좌정보 등록하기
 * @param {object} account 계좌정보
 */
// export const saveAccount = (account) => async (dispatch) => {
//   // POST 처리
//   console.log(account);
//   dispatch({
//     type: types.SAVE_ACCOUNT,
//     payload: account
//   });
// };

/**
 * 취소처리
 * @param {String} slReqId 신청서 번호
 * @param {String} reqTpcd 신청서 종류 코드
 * @param {String} sttTpcd 신청 상태 코드
 * @param {Object} payload 기타값
 */
export const nonevalCancelAction = (slReqId) => async (dispatch) => {
  const params = { slReqId };
  return await api
    .updateCancel(params)
    .then((res) => {
      console.log(res);
      if (res?.data?.statusinfo?.returncd === '000') {
        const { reqSttTpcd, reqSttTpcdNm } = res.data.data;
        dispatch(changeStt(slReqId, reqSttTpcd, reqSttTpcdNm));
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
 * 판매취소처리
 * @param {String} slReqId 신청서 번호
 * @param {String} reqTpcd 신청서 종류 코드
 * @param {String} sttTpcd 신청 상태 코드
 * @param {Object} payload 기타값
 */
export const nonevalSaleCancelAction = (slReqId) => async (dispatch) => {
  const params = { slReqId };
  return api
    .updateSaleCancel(params)
    .then((res) => {
      console.log(res);
      if (res?.data?.statusinfo?.returncd === '000') {
        const { reqSttTpcd, reqSttTpcdNm } = res.data.data;
        dispatch(changeStt(slReqId, reqSttTpcd, reqSttTpcdNm));
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
 * [무평가] 판매진행 (1차)
 * @param {String} slReqId 신청 아이디
 */
export const noneSaleProc1 = (slReqId) => async (dispatch) => {
  // AJAX 판매신청 처리
  const returnedReqSttTpcd = NONEVAL_STT.NS004; // 리턴된 상태값을
  console.log('action none sale proc1', slReqId);
  dispatch({
    type: types.CHANGE_STATE,
    payload: {
      slReqId,
      reqSttTpcd: returnedReqSttTpcd
    }
  });
};

/**
 * [무평가] 판매신청 (최종판매처리)
 * @param {String} slReqId 신청 아이디
 */
export const noneSaleProc2 = (slReqId) => async (dispatch) => {
  // AJAX 판매신청 처리
  const returnedReqSttTpcd = NONEVAL_STT.NS006; // 리턴된 상태값을
  console.log('action none sale proc2', slReqId);
  dispatch({
    type: types.CHANGE_STATE,
    payload: {
      slReqId,
      reqSttTpcd: returnedReqSttTpcd
    }
  });
};

const changeStt = (slReqId, reqSttTpcd, reqSttTpcdNm) => async (dispatch) => {
  dispatch({
    type: sellCarTypes.INPUT_PROP_OBJ,
    payload: {
      state: 'seller',
      obj: {
        reqSttTpcd,
        reqSttTpcdNm
      }
    }
  });
  // 목록에서 해당 신청서 정보 수정
  dispatch({
    type: sellCarTypes.INPUT_REQ_LIST_PROP_OBJ,
    payload: {
      slReqId,
      obj: {
        reqSttTpcd,
        reqSttTpcdNm
      }
    }
  });
};

/**
 * 탁송 정보 조회
 */
export const selectNonevalCnsg = (params) => async (dispatch) => {
  return api.selectNonevalCnsg(params).then((res) => {
    if (res?.data?.statusinfo?.returncd === '000') {
      const cnsgInfo = res.data.data;
      dispatch({
        type: sellCarTypes.SELECT_CNSG_INFO,
        payload: cnsgInfo[0] || null
      });
    }
  });
};

/**
 * 취소탁송 정보 조회
 */
export const selectNonevalCnclCnsg = (params) => async (dispatch) => {
  return api.selectNonevalCnclCnsg(params).then((res) => {
    if (res?.data?.statusinfo?.returncd === '000') {
      const cnclCnsgInfo = res.data.data;
      dispatch({
        type: sellCarTypes.SELECT_CANCEL_CNSG_INFO,
        payload: cnclCnsgInfo[0] || null
      });
    }
  });
};

/**
 * 판매취소 (1차견적)
 */
export const updateCancel = (params) => {
  return api.updateCancel(params);
};

/**
 * 판매진행(탁송신청)
 */
export const insertAbleRequestConsign = (params) => {
  return api.insertAbleRequestConsign(params);
};

/**
 * 판매진행(2차견적 이후)
 */
export const updateSaleProcDecide = (params) => {
  return api.updateSaleProcDecide(params);
};

import { axiosGet } from '@src/utils/HttpUtils';
import * as VisitApi from '@src/api/sellcar/VisitSellcarApi';
import sellCarTypes from './sellCarTypes';

/**
 * 방문평가 신청후 신청서 번호 Redux 저장
 * @param {*} slReqId
 */
export const insertSellcarAction = (params) => async (dispatch) => {
  // console.log('insertSellcarAction params', params);
  return VisitApi.insertSellcar(params)
    .then((res) => {
      const returncd = res.data.statusinfo.returncd;
      // console.log('insertSellcarAction res', res, returncd);
      if (returncd === '000') {
        const slReqId = res.data.data.slReqId;
        dispatch({
          type: sellCarTypes.INPUT_PROP,
          payload: {
            state: 'seller',
            prop: 'slReqId',
            value: slReqId
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
 * 계좌정보 등록하기
 * @param {object} account 계좌정보
 */
export const updateAccountAction = (param) => async () => {
  return VisitApi.updateAccount(param)
    .then((res) => {
      const returncd = res.data.statusinfo.returncd;
      if (returncd === '000') {
        return true;
      }
      return false;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * 취소처리
 * @param {String} slReqId 신청서 번호
 * @param {String} reqTpcd 신청서 종류 코드
 * @param {String} sttTpcd 신청 상태 코드
 * @param {Object} payload 기타값
 */
export const visitCancelAction = (slReqId) => async (dispatch) => {
  const params = { slReqId };
  return await VisitApi.updateCancel(params)
    .then((res) => {
      if (res.data.statusinfo.returncd === '000') {
        // 디테일 정보 수정
        dispatch({
          type: sellCarTypes.INPUT_PROP,
          payload: {
            state: 'seller',
            prop: 'reqSttTpcd',
            value: res.data.data.reqSttTpcd
          }
        });
        // 목록에서 해당 신청서 정보 수정
        dispatch({
          type: sellCarTypes.INPUT_REQ_LIST_PROP_OBJ,
          payload: {
            slReqId: params.slReqId,
            obj: {
              reqSttTpcd: res.data.data.reqSttTpcd,
              reqSttTpcdNm: res.data.data.reqSttTpcdNm
            }
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
 * 설명 : 공통코드 조회
 * @returns {codeList} 코드 목록
 */
export const getCommonCodeList = (payload) => async (dispatch) => {
  const commonCodeList = await axiosGet(`/api/commonCode/selectCommonCodeList.do?cmCdTpId=${payload}`);

  dispatch({
    type: sellCarTypes.GET_COMMON_CODE_LIST,
    payload: commonCodeList || payload
  });
};

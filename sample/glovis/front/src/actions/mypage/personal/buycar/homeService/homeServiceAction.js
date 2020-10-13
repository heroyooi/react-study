/**
 * 설명 :마이페이지(개인) 내차사기 > 홈서비스 내역 조회, 구매취소, 증빙요청, 배송지 변경
 * @author 한관영
 */
import qs from 'qs';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';
import { setHpPnFormat } from '@src/utils/MemberUtil';

export const types = {
  GET_HSVC_LIST: 'mypage/personal/buycar/homeService/GET_HSVC_LIST',
  GET_HSVC_DETAIL: 'mypage/personal/buycar/homeService/GET_HSVC_DETAIL',
  REQUEST_RECEIPT: 'mypage/personal/buycar/homeService/REQUEST_RECEIPT',
  CHANGE_SHIPPING_ADDRESS: 'mypage/personal/buycar/homeService/CHANGE_SHIPPING_ADDRESS',
  CANCEL_PURCHASE: 'mypage/personal/buycar/homeService/CANCEL_PURCHASE',
  CONFIRM_PURCHASE: 'mypage/personal/buycar/homeService/CONFIRM_PURCHASE',
  HOME_SERVICE_MOBILE_DETAIL: 'mypage/personal/buycar/homeServiceDetail/HOME_SERVICE_MOBILE_DETAIL',
  SET_LOADING_IMAGE_MOBILE: 'mypage/personal/buycar/homeService/SET_LOADING_IMAGE_MOBILE',
  SET_LIST_LOADING_MOBILE: 'mypage/personal/buycar/homeService/SET_LIST_LOADING_MOBILE'
};

//화면 당 보여질 신청차량 수
export const ITEMS_PER_PAGE = 10;
// export const ITEMS_MOBILE_PER_PAGE = 10;

/**
 * 설명 :  마이페이지(개인) 내차사기 > 홈서비스 내역 - 목록
 * @returns {map} 홈서비스 내역 목록
 */
export const getHomeServiceList = (currentPage = 1, pageSize = ITEMS_PER_PAGE) => async (dispatch) => {
  const { data, totalCnt } = await axiosPost('/api/mypage/user/searchHsvcReqList.do', { currentPage, pageSize })
    .then((res) => {
      console.log('getHomeServiceList res?.data?.data :::::::::: ', res?.data?.data);
      return {
        data: res?.data?.data?.svcLst || [],
        totalCnt: res?.data?.data?.totalCnt
      };
    })
    .catch((err) => {
      console.log('getHomeServiceListErr : {}', err);
    });
  dispatch({
    type: types.GET_HSVC_LIST,
    payload: data,
    totalCnt
  });
  return data;
};

/**
 * 설명 :  마이페이지(개인) 내차사기 > 홈서비스 내역 상세 - 구매확정
 * @param {hsvcId} 홈서비스ID
 * @returns {map} 홈서비스 내역 상세
 */
export const confirmPurchase = (hsvcId, currentPage) => async (dispatch) => {
  await axiosPost(`/api/mypage/user/updateHomeSvcConfirm.do?hsvcId=${hsvcId}`)
    .then(({ data }) => {
      console.log(data.statusinfo.returncd);
      if (data.statusinfo.returncd === 'SUCCESS') {
        dispatch(getHomeServiceDetail(hsvcId));
        dispatch(getHomeServiceList(currentPage));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * 설명 :  마이페이지(개인) 내차사기 > 홈서비스 내역 - 상세
 * @param {map} 사용자ID
 * @returns {map} 홈서비스 내역 상세
 */
export const getHomeServiceDetail = (hsvcId) => async (dispatch) => {
  const queryString = qs.stringify({ hsvcId });
  const data = await axiosGet(`/api/mypage/user/searchHsvcReqDtl.do?${queryString}`)
    .then((res) => {
      console.log('res.data.data = ', res.data.data);
      return res?.data?.data || {};
    })
    .catch((err) => {
      console.log(err);
    });
  const [pn1, pn2, pn3] = setHpPnFormat(data?.reciHpPnEnc || '').split('-');
  dispatch({
    type: types.GET_HSVC_DETAIL,
    payload: data,
    addrData: {
      hsvcId: data.hsvcId,
      reciNm: data.reciNm,
      zcd: data.zcd,
      locCd: data.locCd,
      ctyCd: data.ctyCd,
      addr1: data.addr1,
      addr2: data.addr2,
      pn1,
      pn2,
      pn3,
      certNum1: '',
      certNum2: ''
    }
  });
};

/**
 * 설명 :  마이페이지(개인) 내차사기 > 홈서비스 내역 - 구매취소요청
 * @param {string} currentPage - 현재페이지번호
 * @param {string} hsvcId - 홈서비스ID
 * @param {string} cnclRsnCd - 구매취소사유 코드(FM044) 0010:단순변심, 0020:차량이상, 0030:차량정보오류, 0090:기타
 * @param {string} [cnclDtlCntn] - 구매취소사유
 * @returns {map} - 응답상태
 */
export const cancelPurchase = (currentPage, hsvcId, cnclRsnCd, cnclDtlCntn, hasMobile) => async (dispatch) => {
  return await axiosPost('/api/mypage/user/updateHomeSvcCncl.do', { hsvcId, cnclRsnCd, cnclDtlCntn }).then((res) => {
    const returncd = res?.data?.statusinfo?.returncd || 'FAIL';
    if (returncd === 'SUCCESS') {
      if (hasMobile) {
        dispatch(getHomeServiceMobDetail(hsvcId));
      } else {
        dispatch(getHomeServiceList(currentPage));
        dispatch(getHomeServiceDetail(hsvcId));
      }
    }
    return returncd;
  });
};

/**
 * 설명 :  마이페이지(개인) 내차사기 > 홈서비스 내역 - 증빙요청
 * @param {map} 사용자ID
 * @returns {map} 홈서비스 내역 목록
 */
export const requestReceipt = (hsvcId) => async (dispatch) => {
  console.log('[ACTION:REQUEST_RECEIPT] requestReceipt(hsvcId)');
  const queryString = qs.stringify({ hsvcId });
  const data = await axiosGet(`/api/mypage/user/selectHsvcRcpt.do?${queryString}`)
    .then((res) => {
      console.log('res.data.data = ', res.data.data);
      return res?.data?.data || {};
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
  dispatch({
    type: types.REQUEST_RECEIPT,
    payload: data
  });
};

export const getHomeServiceMobDetail = (hsvcId) => async (dispatch) => {
  const queryString = qs.stringify({ hsvcId });
  const data = await axiosPost(`/api/mypage/user/searchHsvcReqMobileDtl.do?${queryString}`)
    .then((res) => {
      console.log('mobileDetail response : ', res);
      return res?.data?.data || {};
    })
    .catch((err) => {
      console.log('getHomeServiceMobDetail : {}', err);
    });
  const [pn1, pn2, pn3] = setHpPnFormat(data?.reciHpPnEnc || '').split('-');
  dispatch({
    type: types.HOME_SERVICE_MOBILE_DETAIL,
    payload: data,
    addrData: {
      hsvcId: data.hsvcId,
      reciNm: data.reciNm,
      zcd: data.zcd,
      locCd: data.locCd,
      ctyCd: data.ctyCd,
      addr1: data.addr1,
      addr2: data.addr2,
      pn1,
      pn2,
      pn3,
      certNum1: '',
      certNum2: ''
    }
  });
};

export const setLoadingImageMobile = (loading) => async (dispatch) => {
  dispatch({
    type: types.SET_LOADING_IMAGE_MOBILE,
    payload: loading
  });
};

export const setListLoadingMobile = (loading) => async (dispatch) => {
  dispatch({
    type: types.SET_LIST_LOADING_MOBILE,
    payload: loading
  });
};

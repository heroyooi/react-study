/**
 * 설명 : 마이페이지(일반) 스마트옥션 출품내역
 * @author 박진하
 */
import { isEmpty } from 'lodash';
import { API_SERVER } from '@src/api/config';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';
import * as types from './autoAuctionTypes';

/**
 * 설명 : 스마트옥션 출품내역 조회
 * @param {map} 사용자ID + 조건 검색 파라미터
 * @returns {map} exhibitList 출품 목록
 */
export const getExhibitList = (payload) => async (dispatch) => {
  console.log('getExhibitList: ', payload);

  let url = `/api/autoauction/selectMemberExhibitList.do?userId=${payload.userId}`;
  if (!isEmpty(payload.searchInfo)) {
    url += '&searchType=' + payload.searchInfo.searchType;
    url += '&searchRound=' + payload.searchInfo.searchRound;
    url += '&startDt=' + payload.searchInfo.startDt;
    url += '&endDt=' + payload.searchInfo.endDt;
  }

  let exhibitList = await axiosGet(url);
  exhibitList = exhibitList.data.data.map((exhibit) => {
    return {
      ...exhibit
    };
  });

  dispatch({
    type: types.GET_EXHIBIT_LIST,
    payload: exhibitList
  });
};

export const getMemberExhibitList = (payload) => async (dispatch) => {
  console.log('getMemberExhibitList: ', payload);

  // let url = `/autoauction/selectMemberExhibitList.do?mbId=${payload.userId}`;
  // if (!isEmpty(payload.searchInfo)) {
  //   url += '&sttDvcd=' + payload.searchInfo.searchType;
  //   url += '&auctNo=' + payload.searchInfo.searchRound;
  //   url += '&startDt=' + payload.searchInfo.startDt;
  //   url += '&endDt=' + payload.searchInfo.endDt;
  // }

  const url = `/api/autoauction/selectMemberExhibitList.do`;

  console.log('JSON : ', JSON.stringify(payload));
  await axiosPost(url, payload)
    .then((res) => {
      console.log('autoauctionAction, then : ', res);
      if (res?.data?.statusinfo?.returncd === '000') {
        dispatch({
          type: types.GET_EXHIBIT_LIST,
          payload: res.data
        });
      } else if (res?.data?.statusinfo?.returncd === '009') {
        dispatch({
          type: types.GET_EXHIBIT_LIST,
          payload: []
        });
      }
      console.log('res.data.data : ', res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setLoadingImageMobile = (loading) => async (dispatch) => {
  dispatch({
    type: types.SET_LOADING_IMAGE_MOBILE,
    payload: loading
  });
};

export const getCommonCodeList = (payload) => async (dispatch) => {
  const commonCodeList = await axiosGet(`/api/commonCode/selectCommonCodeList.do?cmCdTpId=${payload}`);

  dispatch({
    type: types.GET_COMMON_CODE_LIST,
    payload: commonCodeList || payload
  });
};

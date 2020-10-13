import { axiosGet } from '@src/utils/HttpUtils';

import * as types from './commonCodeTypes';

// const domain = 'http://10.25.44.131:8080/api';
// const domain = 'http://localhost:8080/api';
export const getCommonCodeList = (cmCdTpId) => async (dispatch) => {
  const { data } = await axiosGet(`/api/commonCode/selectCommonCodeList.do?cmCdTpId=${cmCdTpId}`, null);
  console.log('commonCodeAction>getCommonCodeList>cmCdTpId=%s, data=%o', cmCdTpId, data);
  dispatch({
    type: types.GET_COMMON_CODE_LIST,
    payload: data
  });
};

export const getAutoAuctionCommonCodeList = (bigcd) => async (dispatch) => {
  const { data } = await axiosGet(`/api/commonCode/selectAutoAuctionCommonCodeList.do?bigcd=${bigcd}`, null);
  console.log('commonCodeAction>getAutoAuctionCommonCodeList>bigcd=%s, data=%o', bigcd, data);
  dispatch({
    type: types.GET_AUTOAUCTION_COMMON_CODE_LIST,
    payload: data
  });
};

export const getCommonCodeEnumList = (cmCdTpId) => async (dispatch) => {
  const { data } = await axiosGet(`/api/commonCodeEnum/selectList.do?cmCdTpId=${cmCdTpId}`, null);
  // console.log('commonCodeAction>getCommonCodeList>cmCdTpId=%s, data=%o', cmCdTpId, data);
  dispatch({
    type: types.GET_COMMON_CODE_LIST,
    payload: data
  });
};

import { isEmpty, isNil } from 'lodash';
import { axiosGet, axiosPost, axiosGetAsync } from '@src/utils/HttpUtils';
import * as types from '../sellcar/types';

export const getManagementCarList = (payload) => async (dispatch) => {
  const res = await axiosGetAsync(`/api/mypage/dealer/selectMySaleCar.do?order=PM.REG_DT&by=DESC`);

  dispatch({
    type: types.GET_MANAGEMENTCAR_LIST,
    payload: res || []
  });
};

export const getMyTime = (payload) => async (dispatch) => {
  const res = await axiosGetAsync(`/api/mypage/dealer/selectAdDlrPrdTime.do?id=PPPPPP1`);
  console.log(res);
  dispatch({
    type: types.GET_MY_TIME,
    payload: res || []
  });
};

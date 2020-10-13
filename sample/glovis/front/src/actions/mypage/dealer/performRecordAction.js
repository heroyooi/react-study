// import * as http from '@src/utils/HttpUtils' //axiosGet
import axios from 'axios';
import performRecordTypes from '@src/actions/mypage/dealer/performRecordTypes';
import { insertDealerProd, selectDealerProdbyDlrPrdId } from '@src/api/mypage/dealer/CarPerfInspApi';

export const getPerfomRecordAction = (perfInspId) => async (dispatch) => {
  try {
    console.log('getPerfomRecordAction');
    const payload = await selectDealerProdbyDlrPrdId(perfInspId);
    console.log('payload : ', payload);

    // dispatch({
    //   type: performRecordTypes.INIT_PERFOM_RECORD,
    //   payload
    // });
  } catch (error) {
    console.error('error : ', error);
  }
};

export const create = (params) => async (dispatch) => {
  console.log('TCL: params', params);
};

export const inputPropAction = (payload) => (dispatch) => {
  dispatch({
    type: performRecordTypes.INPUT_PROP,
    payload
  });
};

export const inputMainDeviceAction = (payload) => (dispatch) => {
  dispatch({
    type: performRecordTypes.INPUT_MAIN_DEVICE_PROP,
    payload
  });
};

export const inputSkinAction = (payload) => (dispatch) => {
  dispatch({
    type: performRecordTypes.INPUT_SKIN_PROP,
    payload
  });
};

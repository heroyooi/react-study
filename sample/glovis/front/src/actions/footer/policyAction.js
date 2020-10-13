import { axiosGetJson } from '@src/utils/HttpUtils';
import * as types from './policyTypes';

const selectPolicyEfrcDtListURI = '/api/main/selectPolicyEfrcDtList.do';
const selectPolicyInfoURI = '/api/main/selectPolicyInfo.do';

export const selectPolicyEfrcDtList = (param) => (dispatch) => {
  console.log('policyAction> param data=' + JSON.stringify(param));
  axiosGetJson(selectPolicyEfrcDtListURI, param)
    .then(({ data }) => {
      console.log('policyAction>data=' + JSON.stringify(data));
      dispatch({
        type: types.GET_EFRC_DT_LIST,
        payload: data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectPolicyInfo = (data) => (dispatch) => {
  console.log('policyAction> param data=' + JSON.stringify(data));
  axiosGetJson(selectPolicyInfoURI, data)
    .then(({ data }) => {
      // console.log('policyAction>data=' + JSON.stringify(data));
      dispatch({
        type: types.GET_POLICY_INFO,
        payload: data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

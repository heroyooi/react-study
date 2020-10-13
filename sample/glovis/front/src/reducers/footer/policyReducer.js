import { produce } from 'immer';
import * as types from '@src/actions/footer/policyTypes';
import moment from 'moment';

const initialState = {
  policyEfrcDtList: [],
  policyEfrcDtListTime: {},
  policyInfo: {},
  policyInfoTime: {}
};

export default function policyReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_EFRC_DT_LIST: {
      console.log('GET_EFRC_DT_LIST', action);

      return produce(state, (draft) => {
        if (action.payload.statusinfo.returncd === 'SUCCESS') {
          draft.policyEfrcDtList = action.payload.data;
          draft.policyEfrcDtListTime = moment();
        } else {
          draft.policyEfrcDtList = [];
          draft.policyEfrcDtListTime = moment();
        }
      });
    }
    case types.GET_POLICY_INFO: {
      console.log('GET_POLICY_INFO', action);

      return produce(state, (draft) => {
        if (action.payload.statusinfo.returncd === 'SUCCESS') {
          draft.policyInfo = action.payload.data;
          draft.policyInfoTime = moment();
        } else {
          draft.policyInfo = {};
          draft.policyInfoTime = moment();
        }
      });
    }

    default:
      return state;
  }
}

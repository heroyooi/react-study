/**
 * 오토벨진단 정보
 * @author 김민철
 */
import { produce } from 'immer';
import { types } from '@src/actions/buycar/autobellDiagnosisActions';

const initialState = {
  diagnosis: {}
};

/**
 * 오토벨진단 정보
 * @param {Object} state
 * @param {Object} action
 * @param {Object} action.type
 */
export default function autobellDiagnosisReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_DIAGNOSIS: {
      return produce(state, (draft) => {
        draft.diagnosis = action.payload;
      });
    }
    default: {
      return state;
    }
  }
}

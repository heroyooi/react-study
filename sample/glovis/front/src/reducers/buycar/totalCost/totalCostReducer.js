/**
 * 총비용 관련 정보
 * @author 왕태식
 */
import { produce } from 'immer';
import _ from 'lodash';
import { types } from '@src/actions/buycar/totalCost/totalCostAction';

const initialState = {
  locList: [], // 지역정보 셀렉트박스 리스트
  LocCalData: {}, // 총비용 계산시 필요 데이터
  monthlyList: [], // 할부기간 셀렉트박스 리스트
  carTaxCalData: {} // 자동차세 계산시 필요 데이터
};

/**
 * 총비용 관련 정보
 * @param {Object} state
 * @param {Object} action
 * @param {Object} action.type
 */
export default function totalCostReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_MONTHLY_INSTALL_LIST: {
      return produce(state, (draft) => {
        const clone = [];
        const tmpArray = action.payload.data.data;
        const tmp = {};
        tmpArray.forEach((val) => {
          tmp.value = val.INT_RT;
          tmp.label = val.ISTA_MNTS + '개월';
          tmp.id = val.INT_RT;
          tmp.origin = String(val.ISTA_MNTS);
          clone.push(_.cloneDeep(tmp));
        });
        draft.monthlyList = clone;
      });
    }
    case types.GET_MOB_LOC_CODE_LIST: {
      return produce(state, (draft) => {
        const clone = [];
        const tmpArray = action.payload.data.data;
        // const tgtArray = [];
        const tmp = {};

        tmpArray.map((item, idx) => {
          tmp.value = item.LOCCD;
          tmp.label = item.LOCNM;
          tmp.id = item.LOCCD;
          tmp.checked = idx === 0 ? true : false;
          tmp.disabled = false

          // tgtArray.push(tmp);
          clone.push(_.cloneDeep(tmp));
        });

        draft.locList = clone;
      });
    }
    case types.GET_LOC_CODE_LIST: {
      return produce(state, (draft) => {
        const clone = [];
        const tmpArray = action.payload.data.data;
        const tmp = {};
        tmpArray.forEach((val) => {
          tmp.value = val.LOCCD;
          tmp.label = val.LOCNM;
          clone.push(_.cloneDeep(tmp));
        });
        draft.locList = clone;
      });
    }
    case types.GET_TOTAL_COST_CAL_DATA: {
      return produce(state, (draft) => {
        draft.LocCalData = action.payload.data.data;
      });
    }
    case types.GET_CAR_TAX_CAL_DATA: {
      return produce(state, (draft) => {
        draft.carTaxCalData = action.payload.data.data;
      });
    }
    default: {
      return state;
    }
  }
}

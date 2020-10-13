import { produce } from 'immer';
import { types } from '@src/actions/buycar/recommendItemActions';

const initialState = {
  equivalentList: [], // 동급 매물 추천
  smartList: [] // 스마트 추천
};

/**
 * 추천 차량 정보
 * @param {*} state
 * @param {Object} action
 * @param {String} action.type
 * @author 김민철
 */
export default function recommendItemsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_RECOM_ITEMS: {
      return produce(state, (draft) => {
        draft.equivalentList = action.payload;
      });
    }
    case types.FETCH_SMART_ITEMS: {
      return produce(state, (draft) => {
        draft.smartList = action.payload;
      });
    }
    case types.TOGGLE_INTEREST: {
      return produce(state, (draft) => {
        draft[action.payload.listName] = state[action.payload.listName].map((car) => {
          if (car.id === action.payload.carId) {
            return { ...car, itrtProdYn: car.itrtProdYn === 'Y' ? 'N' : 'Y' };
          }
          return car;
        });
      });
    }
    default: {
      return state;
    }
  }
}

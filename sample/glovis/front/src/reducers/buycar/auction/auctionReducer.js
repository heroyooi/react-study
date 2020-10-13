import { produce } from 'immer';
import { types } from '@src/actions/buycar/auction/auctionAction';

const initialState = {
  auctionCarList: []
};

/**
 * 설명 : 내차사기 > 전체차량 > 목록(전체, 라이브스튜디오, 경매낙찰차량) 조회
 * @author 한관영
 * @param {String} action.type
 * @param {Object?} action.payload
 * @returns {map} state 차량 목록 정보를 store에 보관
 */
export default function auctionReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_CARS_AUCTION: {
      return produce(state, (draft) => {
        draft.auctionCarList = action.payload;
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
    default:
      return state;
  }
}

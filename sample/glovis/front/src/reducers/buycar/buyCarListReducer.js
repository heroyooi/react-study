import { produce } from 'immer';
import { types } from '@src/actions/buycar/buyCarListAction';

const initialState = {
  studioCarList: [],
  isStudioCarListQuery: false,
  preferCarList: [],
  auctionCarList: [],
  isAuctionCarListQuery: false,
  generalCarList: [],
  smartCarList: [],
  equivalentCarList: [],
  suggestWordsList: [],
  recommandWordsList: [],
  isLoadingImage: false,
  isListLoading: false,
  selectedWord: {},
  searchCrNo: '',
  srchOption: null,
  totalCount: 0
};

/**
 * 설명 : 내차사기 > 전체차량 > 목록(전체, 라이브스튜디오, 경매낙찰차량) 조회
 * @author 한관영
 * @param {String} action.type
 * @param {Number} action.pageSize
 * @param {Object?} action.payload
 * @returns {map} state 차량 목록 정보를 store에 보관
 */
export default function buyCarListReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_CARS_STUDIO: {
      return produce(state, (draft) => {
        console.log('인기매물(라이브스튜디오,경매차량) GET_CARS_STUDIO action=%o', action.payload);
        draft.studioCarList = action.payload !== null ? (action.payload.liveList !== null ? action.payload.liveList : []) : [];
        draft.preferCarList = action.payload !== null ? (action.payload.preferList !== null ? action.payload.preferList : []) : [];
        draft.auctionCarList = action.payload !== null ? (action.payload.auctionList !== null ? action.payload.auctionList : []) : [];
        draft.isStudioCarListQuery = true;
        draft.isAuctionCarListQuery = true;
      });
    }
    case types.GET_CARS_PREFER: {
      return produce(state, (draft) => {
        draft.preferCarList = action.payload;
      });
    }
    case types.GET_CARS_AUCTION: {
      return produce(state, (draft) => {
        draft.auctionCarList = action.payload;
      });
    }
    case types.GET_CARS_GENERAL: {
      return produce(state, (draft) => {
        if (action.isMore) {
          draft.generalCarList = action.payload.prdLst ? draft.generalCarList.concat(action.payload.prdLst) : draft.generalCarList;
        } else {
          draft.generalCarList = action.payload.prdLst;
        }
        draft.totalCount = action.payload.totalCount ? action.payload.totalCount : 0;
        draft.isLoadingImage = false;
        draft.isListLoading = true;
      });
    }
    case types.SET_LOADING_IMAGE_MOBILE: {
      return produce(state, (draft) => {
        draft.isLoadingImage = action.payload;
      });
    }
    case types.SET_LIST_LOADING_MOBILE: {
      return produce(state, (draft) => {
        draft.isListLoading = action.payload;
      });
    }
    case types.GET_CARS_SMART: {
      return produce(state, (draft) => {
        draft.smartCarList = action.payload;
      });
    }
    case types.GET_CARS_EQUIVALENT: {
      return produce(state, (draft) => {
        draft.equivalentCarList = action.payload;
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
    case types.GET_SUGGEST_WORD: {
      return produce(state, (draft) => {
        draft.suggestWordsList = action.payload;
      });
    }
    case types.GET_RECOMMAND_WORD: {
      return produce(state, (draft) => {
        draft.recommandWordsList = action.payload;
      });
    }
    case types.SET_SUGGEST_WORD: {
      return produce(state, (draft) => {
        draft.selectedWord = action.payload;
      });
    }
    case types.SET_SEARCH_CR_NO: {
      return produce(state, (draft) => {
        draft.searchCrNo = action.payload;
      });
    }
    case types.SET_SEARCH_OPTIONS: {
      return produce(state, (draft) => {
        draft.srchOption = action.payload;
      });
    }
    default:
      return state;
  }
}

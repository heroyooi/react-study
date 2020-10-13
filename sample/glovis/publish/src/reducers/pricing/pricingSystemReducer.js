import { produce } from 'immer';
import { objIsEmpty } from '@src/utils/CommonUtil';
import {
  GET_PRICING_CAR_INFO,
  GET_PRICING_AUCTION_DATA,
  GET_PRICING_MARKET_PRICE,
  GET_PRICING_VIEWABLE_CNT,
  GET_PRICING_TICKET_INFO,
  GET_PRICING_CAR_BID_LIST,
  GET_PRICING_CAR_GRADE_SPECIFICATION,
  GET_PRICING_SEARCH_CAR_COLOR,
  GET_PRICING_SEARCH_CAR_DEFAULT_OPTION,
  GET_PRICING_SEARCH_CAR_DISPLACEMENT,
  GET_PRICING_SEARCH_CAR_FUEL,
  GET_PRICING_SEARCH_CAR_NOY,
  GET_PRICING_SEARCH_CAR_TRANSMISSION,
  SET_PRICING_CAR_INFO,
  SET_PRICING_CAR_INFO_CLEAR,
  SET_PRICING_CAR_INFO_NAME,
  SET_PRICING_CAR_SELECTION_POPUP_STATE
} from '@src/actions/pricing/pricingSystemActions';
import { carmartJosnTocarInfo } from './carmartParse';

const initialState = {
  auctionInfo: {},
  bidList: [],
  hasPricing: false,
  isCarSelectionPopUp: false,
  marketPrice: null,
  pricingCarInfo: {},
  prcingTicketInfo: null,
  searchCarColors: [],
  searchCarDefaultOptions: [],
  searchCarDsplOptions: [],
  searchCarFuelOptions: [],
  searchCarMssOptions: [],
  searchCarNoyOptions: [],
  viewableCnt: 0
};

export default function pricingSystemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRICING_CAR_INFO: {
      return produce(state, (draft) => {
        const carInfo = carmartJosnTocarInfo(action.crNo, action.payload, draft.searchCarDefaultOptions);
        draft.pricingCarInfo = carInfo;
        draft.hasPricing = !objIsEmpty(carInfo) ? true : false;
      });
    }
    case GET_PRICING_MARKET_PRICE: {
      return produce(state, (draft) => {
        draft.marketPrice = action.payload;
      });
    }
    case GET_PRICING_AUCTION_DATA: {
      return produce(state, (draft) => {
        draft.auctionInfo = action.payload;
      });
    }
    case GET_PRICING_VIEWABLE_CNT: {
      return produce(state, (draft) => {
        if (action.payload && action.payload.statusinfo.ReturnCd === '000') {
          draft.viewableCnt = action.payload.viewableCount;
        } else {
          draft.viewableCnt = 0;
        }
      });
    }
    case GET_PRICING_TICKET_INFO: {
      return produce(state, (draft) => {
        draft.prcingTicketInfo = action.payload;
      });
    }
    case GET_PRICING_CAR_BID_LIST: {
      return produce(state, (draft) => {
        draft.bidList = action.payload;
      });
    }
    case GET_PRICING_CAR_GRADE_SPECIFICATION: {
      return produce(state, (draft) => {
        draft.pricingCarGradeSpec = action.payload;
      });
    }
    case GET_PRICING_SEARCH_CAR_COLOR: {
      return produce(state, (draft) => {
        draft.searchCarColors = action.payload;
      });
    }
    case GET_PRICING_SEARCH_CAR_DEFAULT_OPTION: {
      return produce(state, (draft) => {
        draft.searchCarDefaultOptions = action.payload;
      });
    }
    case GET_PRICING_SEARCH_CAR_DISPLACEMENT: {
      return produce(state, (draft) => {
        draft.searchCarDsplOptions = action.payload;
      });
    }
    case GET_PRICING_SEARCH_CAR_FUEL: {
      return produce(state, (draft) => {
        draft.searchCarFuelOptions = action.payload;
      });
    }
    case GET_PRICING_SEARCH_CAR_NOY: {
      return produce(state, (draft) => {
        draft.searchCarNoyOptions = action.payload;
      });
    }
    case GET_PRICING_SEARCH_CAR_TRANSMISSION: {
      return produce(state, (draft) => {
        draft.searchCarMssOptions = action.payload;
      });
    }
    case SET_PRICING_CAR_SELECTION_POPUP_STATE: {
      return produce(state, (draft) => {
        draft.isCarSelectionPopUp = !draft.isCarSelectionPopUp;
      });
    }
    case SET_PRICING_CAR_INFO: {
      return produce(state, (draft) => {
        draft.pricingCarInfo = action.payload;
      });
    }
    case SET_PRICING_CAR_INFO_NAME: {
      return produce(state, (draft) => {
        if (objIsEmpty(draft.pricingCarInfo)) {
          draft.pricingCarInfo = action.payload;
        } else {
          draft.pricingCarInfo = Object.assign(draft.pricingCarInfo, action.payload);
        }
      });
    }
    case SET_PRICING_CAR_INFO_CLEAR: {
      return produce(state, (draft) => {
        draft.pricingCarInfo = null;
        draft.marketPrice = null;
        draft.hasPricing = false;
        draft.bidList = null;
      });
    }
    default:
      return state;
  }
}

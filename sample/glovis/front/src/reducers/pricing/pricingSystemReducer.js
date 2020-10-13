import { produce } from 'immer';
import { objIsEmpty } from '@src/utils/CommonUtil';
import {
  GET_PRICING_CAR_INFO,
  GET_PRICING_MARKET_PRICE,
  GET_PRICING_MARKET_PRICE_RESET,
  GET_PRICING_VIEWABLE_CNT,
  GET_PRICING_TICKET_INFO,
  GET_PRICING_CAR_BID_LIST,
  GET_PRICING_SEARCH_CAR_COLOR,
  GET_PRICING_SEARCH_CAR_DEFAULT_OPTION,
  GET_PRICING_SEARCH_CAR_DISPLACEMENT,
  GET_PRICING_SEARCH_CAR_FUEL,
  GET_PRICING_SEARCH_CAR_NOY,
  GET_PRICING_SEARCH_CAR_SEPC_INFO,
  GET_PRICING_SEARCH_CAR_TRANSMISSION,
  SET_PRICING_CAR_INFO,
  SET_PRICING_CAR_INFO_CLEAR,
  SET_PRICING_CAR_INFO_NAME,
  SET_PRICING_CAR_INFO_PRICE,
  SET_PRICING_CAR_SELECTION_POPUP_STATE,
  SET_PRICING_RESET
} from '@src/actions/pricing/pricingSystemActions';
import { carmartJosnTocarInfo } from './carmartParse';

const initialState = {
  auctionInfo: {},
  bidList: [],
  hasCarInfo: false,
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
  viewableCnt: null
};

export default function pricingSystemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRICING_CAR_INFO: {
      return produce(state, (draft) => {
        const carInfo = carmartJosnTocarInfo(action.crNo, action.reqParam, action.payload, action.searchCarDefaultOptions, action.searchCarColors);
        draft.pricingCarInfo = carInfo;
        draft.hasCarInfo = !objIsEmpty(carInfo) ? true : false;
      });
    }
    case GET_PRICING_MARKET_PRICE: {
      return produce(state, (draft) => {
        draft.marketPrice = action.payload;
        draft.hasPricing = true;
        draft.viewableCnt = 0;
        if (objIsEmpty(draft.pricingCarInfo.resStatus)) {
          draft.pricingCarInfo = Object.assign(
            { ...draft.pricingCarInfo },
            {
              resStatus: {
                uid: action.reqParam.uid,
                tsKey: '',
                rstCode: '',
                cDay: ''
              }
            }
          );
        }
      });
    }
    case GET_PRICING_MARKET_PRICE_RESET: {
      return produce(state, (draft) => {
        draft.hasPricing = false;
        draft.marketPrice = null;
        draft.bidList = null;
      });
    }
    case SET_PRICING_RESET: {
      return produce(state, (draft) => {
        draft.pricingCarInfo = null;
        draft.hasCarInfo = false;
        draft.hasPricing = false;
        draft.marketPrice = null;
        draft.bidList = null;
      });
    }
    case GET_PRICING_VIEWABLE_CNT: {
      return produce(state, (draft) => {
        // if (action.payload && action.payload.statusinfo && action.payload.statusinfo.returncd === 'SUCCESS') {
        //   draft.viewableCnt = action.payload.viewableCount === 0 ? 1 : 0;
        // } else {
        //   draft.viewableCnt = 0;
        // }
        draft.viewableCnt = 1; //테스트를 위해 하루 1회 무료를 영구히 1회로 바꿔둠
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
        draft.searchCarNormalDsplOptions = action.payload;
      });
    }
    case GET_PRICING_SEARCH_CAR_FUEL: {
      return produce(state, (draft) => {
        draft.searchCarNormalFuelOptions = action.payload;
      });
    }
    case GET_PRICING_SEARCH_CAR_NOY: {
      return produce(state, (draft) => {
        draft.searchCarNormalNoyOptions = action.payload;
      });
    }
    case GET_PRICING_SEARCH_CAR_TRANSMISSION: {
      return produce(state, (draft) => {
        draft.searchCarNormalMssOptions = action.payload;
      });
    }
    case GET_PRICING_SEARCH_CAR_SEPC_INFO: {
      return produce(state, (draft) => {
        draft.searchCarMssOptions = objIsEmpty(action.payload.mssOptions) ? draft.searchCarNormalMssOptions : action.payload.mssOptions;
        draft.searchCarNoyOptions = objIsEmpty(action.payload.noyOptions) ? draft.searchCarNormalNoyOptions : action.payload.noyOptions;
        draft.searchCarDsplOptions = objIsEmpty(action.payload.dsplOptions) ? draft.searchCarNormalDsplOptions : action.payload.dsplOptions;
        draft.searchCarFuelOptions = objIsEmpty(action.payload.fuelOptions) ? draft.searchCarNormalFuelOptions : action.payload.fuelOptions;

        const newCarCond = {};
        if (!objIsEmpty(action.payload.dsplOptions) && action.payload.dsplOptions.length === 1) {
          newCarCond.dspl = action.payload.dsplOptions[0].value;
        }
        if (!objIsEmpty(action.payload.fuelOptions) && action.payload.fuelOptions.length === 1) {
          newCarCond.fuel = action.payload.fuelOptions[0].value;
        }
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
        draft.hasCarInfo = false;
        draft.hasPricing = false;
        draft.bidList = null;
      });
    }
    case SET_PRICING_CAR_INFO_PRICE: {
      return produce(state, (draft) => {
        draft.pricingCarInfo = action.carInfo;
        draft.marketPrice = action.marketPrice;
        draft.hasCarInfo = true;
        draft.hasPricing = true;
        draft.viewableCnt = 0;
      });
    }
    default:
      return state;
  }
}

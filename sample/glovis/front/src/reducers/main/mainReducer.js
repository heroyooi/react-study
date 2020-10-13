import { produce } from 'immer';
import * as types from '@src/actions/main/mainTypes';

const initialState = {
  todayPopCarInfo: {},
  popularByCategoryList: [],
  compareBoxList: [],
  compareBoxListTotalcount: 0,
  currentPageCompare: 1,
  interList: [],
  totalCountInterest: 0,
  currentPageInterest: 1,
  popularCarPrice: {},
  mainBannerInfo: {},
  isPartnerQuestInsert: false,
  isCertifiedMallProdListQuery: false,
  isCarCompareBox: false,
  isPartnerReqPopupShow: false,
  carPriceChartData: { currentPrice: {} }
};

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_TODAY_POP_CAR_INFO: {
      console.log('GET_TODAY_POP_CAR_INFO=%o', action);

      return produce(state, (draft) => {
        if (action.payload.data.statusinfo.returncd === '000') {
          draft.todayPopCarInfo = action.payload.data?.data;
        } else {
        }
      });
    }
    case types.GET_POPULAR_BY_CATEGORY_LIST: {
      console.log('인기매물(인증몰) GET_POPULAR_BY_CATEGORY_LIST', action);

      return produce(state, (draft) => {
        if (action.payload.data.statusinfo.returncd === '000') {
          console.log('GET_POPULAR_BY_CATEGORY_LIST>[prdLst]=%o', action.payload.data.data.prdLst);
          draft.popularByCategoryList = action.payload.data.data.prdLst;
        } else {
          draft.popularByCategoryList = [];
        }
        draft.isCertifiedMallProdListQuery = true;
      });
    }
    case types.GET_POPULAR_CAR_PRICE: {
      console.log('GET_POPULAR_CAR_PRICE', action);

      return produce(state, (draft) => {
        draft.popularCarPrice = action.payload;
      });
    }

    case types.POST_PARTNER_QUEST: {
      return produce(state, (draft) => {
        console.log('mainReducer>POST_PARTNER_QUEST>action=%o', action);
        if (action.payload.data.statusinfo.returncd === 'SUCCESS') {
          draft.isPartnerQuestInsert = true;
        } else draft.isPartnerQuestInsert = false;
      });
    }

    case types.POST_INSERT_CAR_COMPARE_BOX: {
      return produce(state, (draft) => {
        console.log('mainReducer>POST_INSERT_CAR_COMPARE_BOX>action=%o', action);
        if (action.payload.statusinfo.returncd === 'SUCCESS') {
          draft.isCarCompareBox = true;
        } else draft.isCarCompareBox = false;
      });
    }
    case types.GET_MAINBANNER_INFO: {
      return produce(state, (draft) => {
        console.log('GET_MAINBANNER_INFO> [payload]=%o', action.payload);
        if (action.payload.data.statusinfo.returncd === 'SUCCESS') {
          const name = 'AM054' + action.payload.data.banGbnCd;
          console.log('GET_MAINBANNER_INFO> [name] =%s,[data]=%o', name, action.payload.data);
          draft.mainBannerInfo[name] = action.payload.data.data;
        } else {
          draft.mainBannerInfo = {};
        }
        draft.isCertifiedMallProdListQuery = true;
      });
    }
    case types.FETCH_MARKET_PRICE: {
      return produce(state, (draft) => {
        console.log('FETCH_MARKET_PRICE> [payload]=%o', action.payload);
        const priceData = { price: action.payload.appropriatePrice, marketMinPrice: action.payload.minPrice, marketMaxPrice: action.payload.maxPrice };
        console.log('FETCH_MARKET_PRICE> [priceData]=%o', priceData);
        draft.carPriceChartData.currentPrice = priceData;
      });
    }
    case types.GET_CAR_COMPAREBOX_LIST: {
      //차량비교함 조회
      return produce(state, (draft) => {
        console.log('차량비교함> GET_CAR_COMPAREBOX_LIST> [payload]=%o', action.payload);
        if (action.payload.data.statusinfo.returncd === 'SUCCESS') {
          draft.compareBoxList = action.payload.data.data;
          draft.compareBoxListTotalcount = action.payload.data.inqRsltCnt;
          draft.currentPageCompare = action.payload.data.pagingInfo.currentPageNo; //차량비교함 현재 페이지 currentPageNo
        } else {
          draft.compareBoxList = [];
          draft.compareBoxListTotalcount = 0;
          draft.currentPageCompare = 1; //차량비교함 현재 페이지
        }
      });
    }
    case types.GET_INTEREST_CAR_LIST: {
      //관심차량 조회
      return produce(state, (draft) => {
        console.log('관심차량>GET_CAR_COMPAREBOX_LIST> [payload]=%o', action.payload);
        if (action.payload.data.statusinfo.returncd === '000') {
          draft.interList = action.payload.data.data;
          draft.totalCountInterest = action.payload.data.totalCount;
          draft.currentPageInterest = action.payload.data.currentPage; //관심차량 현재 페이지
        } else {
          draft.interList = [];
          draft.totalCountInterest = 0;
          draft.currentPageInterest = 1; //관심차량 현재 페이지
        }
      });
    }
    case types.SET_PC_PARTNER_REQUEST_POPUP:
      return produce(state, (draft) => {
        console.log('SET_PC_PARTNER_REQUEST_POPUP>=action.data.isPopup=%o', action.data.isPopup);
        draft.isPartnerReqPopupShow = action.data.isPopup;
      });
    default:
      return state;
  }
}

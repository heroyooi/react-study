import {
  LOGIN_SUCCESS, LOGOUT_SUCCESS,
  SECTION_MAIN, SECTION_EVENT, SECTION_GUIDE,
  SECTION_MYPAGE, SECTION_MEMBER, SECTION_CUSTOMER,
  SECTION_BUY, SECTION_SELL,
  SECTION_MARKET_PRICE, SECTION_HOME_SERVICE,
  SECTION_AUTO_AUCTION, SECTION_PRICING_SYSTEM,
  MOBILE_HEADER_TYPE_MAIN, MOBILE_HEADER_TYPE_SUB, MOBILE_HEADER_TYPE_NONE, 
  MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE
} from "../actions/types";

const initialState = {
  isLogin: true,
  isIE: false,
  isSection: null,
  userInfo: {
    userName: '김현대'
  },
  mHeaderType: 'main',
  mHeaderTitle: '타이틀',
  mHeaderOptions: [],
  mHeaderEvents: [],
  mPdBottom: 0,
  mBgColor: '#ffffff',
  mFullpagePopup: false,
  mFullpagePopupTitle: '타이틀',
  mFullpagePopupOptions: [],
};

export default function commonReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLogin: false,
      }

    case SECTION_MAIN:
      return {
        ...state,
        isSection: 'main'
      }
    case SECTION_EVENT:
      return {
        ...state,
        isSection: 'event'
      }
    case SECTION_GUIDE:
      return {
        ...state,
        isSection: 'guide'
      }
    case SECTION_MYPAGE:
      return {
        ...state,
        isSection: 'mypage'
      }
    case SECTION_MEMBER:
      return {
        ...state,
        isSection: 'member'
      }
    case SECTION_CUSTOMER:
      return {
        ...state,
        isSection: 'customer'
      }
    case SECTION_BUY:
      return {
        ...state,
        isSection: 'buy'
      }
    case SECTION_SELL:
      return {
        ...state,
        isSection: 'sell'
      }
    case SECTION_MARKET_PRICE:
      return {
        ...state,
        isSection: 'marketPrice'
      }
    case SECTION_HOME_SERVICE:
      return {
        ...state,
        isSection: 'homeService'
      }
    case SECTION_AUTO_AUCTION:
      return {
        ...state,
        isSection: 'autoAuction'
      }
    case SECTION_PRICING_SYSTEM:
      return {
        ...state,
        isSection: 'pricingSystem'
      }

    case MOBILE_HEADER_TYPE_MAIN:
      return {
        ...state,
        mHeaderType: "main",
      }
    case MOBILE_HEADER_TYPE_SUB:
      return {
        ...state,
        mHeaderType: "sub",
        mHeaderTitle: action.data.title,
        mHeaderOptions: action.data.options,
        mHeaderEvents: action.data.events,
      }
    case MOBILE_HEADER_TYPE_NONE:
      return {
        ...state,
        mHeaderType: "none",
      }
    case MOBILE_CONTENT_STYLE:
      return {
        ...state,
        mPdBottom: action.data.bottom,
        mBgColor: action.data.color,
      }
    case MOBILE_FULLPAGE_POPUP:
      return {
        ...state,
        mFullpagePopup: action.data.isPopup,
        mFullpagePopupTitle: action.data.title,
        mFullpagePopupOptions: action.data.options,
      }
    case MOBILE_FULLPAGE_POPUP_CLOSE:
      return {
        ...state,
        mFullpagePopup: false,
      }

    default:
      return state;
  }
}

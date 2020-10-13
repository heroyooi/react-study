import { produce } from 'immer';
import { types } from '@src/actions/buycar/certificationmall/certiMallViewAction';

const initialState = {
  cmllDetail: {
    amllId: '2',
    mbId: 'DDDDDD1',
    deleShopId: '1',
    prtnKncd: '0020',
    prtnDvcd: '01',
    logoImgUrl: '/img/wtflogo4.png',
    bnrImgUrl: '/img/wtfbnr4.png',
    bnrTtlNm: '인증몰 배너 타이틀',
    subTtlNm: '인증몰 배너 서브타이틀입니다.',
    amllNm: 'BMW',
    crMnfcCd: '67',
    regDt: 1583247600000,
    rgstId: '1',
    updDt: 1583247600000,
    updtId: '1'
  },
  selMnfcList: [],
  selAreaList: [],
  selModelList: [],
  selFuelList: [],
  carList: [],
  selShopList: [],
  shopDetail: {},
  isLoadingImage: false
};

/**
 * 설명 : 내차사기 > 인증몰
 * @author 한관영
 * @param {String} action.type
 * @param {Number} action.pageSize
 * @param {Object?} action.payload
 * @returns {map} state 차량 목록 정보를 store에 보관
 */
export default function buyCarListReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_CMLL_DETAIL: {
      return produce(state, (draft) => {
        draft.cmllDetail = action.payload;
      });
    }
    case types.GET_AREA_LIST: {
      return produce(state, (draft) => {
        draft.selAreaList = action.payload;
      });
    }
    case types.GET_MNFC_LIST: {
      return produce(state, (draft) => {
        draft.selMnfcList = action.payload;
      });
    }
    case types.GET_MODEL_LIST: {
      return produce(state, (draft) => {
        draft.selModelList = action.payload;
      });
    }
    case types.GET_FUEL_LIST: {
      return produce(state, (draft) => {
        draft.selFuelList = action.payload;
      });
    }
    case types.GET_CMLL_SHOP_LIST: {
      return produce(state, (draft) => {
        draft.selShopList = action.payload;
      });
    }
    // case types.GET_CMLL_SHOP_DETAIL: {
    //   return produce(state, (draft) => {
    //     draft.shopDetail = action.payload;
    //   });
    // }
    case types.GET_CARS: {
      return produce(state, (draft) => {
        draft.carList = action.payload.prdLst;
        draft.totalCount = action.payload.totalCnt ? action.payload.totalCnt : 0;
        draft.isLoadingImage = false;
      });
    }
    case types.SET_LOADING_IMAGE_GET_CAR: {
      return produce(state, (draft) => {
        draft.isLoadingImage = action.payload;
      });
    }
    default:
      return state;
  }
}

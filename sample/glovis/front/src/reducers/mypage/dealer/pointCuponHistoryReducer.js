/**
 * 설명 : 포인트/쿠폰 내역 목록
 * @author 박진하
 */
import { produce } from 'immer';
import _ from 'lodash';
import moment from 'moment';
import * as types from '@src/actions/mypage/dealer/mypageDealerTypes';

const initialState = {
  usePoint: 0,
  expirationPoint: 0,
  pointHistoryList: [],
  useCoupon: 0,
  expirationCoupon: 0,
  couponHisoryList:[],
  couponData: {}
};

/**
 * 설명 : 포인트/쿠폰 내역 목록
 * @author 박진하
 * @param {String} action.type
 * @returns {map} state 포인트/쿠폰 내역 목록을 state에 보관
 */
export default function pointCuponHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_POINT_HISTORY_LIST: {
      console.log('GET_POINT_HISTORY_LIST', action);
      /*
      let expirationPoint = 0;

      action.payload.map((lists) => {
        if (lists.gpntDvcd === '적립' && moment(lists.gpntVldYmd).diff(moment(), 'd') > -1 && moment(lists.gpntVldYmd).diff(moment(), 'd') < 8) {
          expirationPoint = expirationPoint + lists.acmlGpntPnt;
        } else if (lists.gpntDvcd === '사용' && moment(lists.gpntVldYmd).diff(moment(), 'd') > -1 && moment(lists.gpntVldYmd).diff(moment(), 'd') < 8) {
          expirationPoint = expirationPoint - lists.useGpntPnt;
        }
      });

      return produce(state, (draft) => {
        draft.pointHistoryList = action.payload;
        draft.expirationPoint = expirationPoint;
        draft.residualPoint = action.payload[action.payload.length - 1].restGpntPnt;
      });*/
      return produce(state, (draft) => {
        draft.pointHistoryList = action.payload.data;
        draft.usePoint = action.payload.usePoint.point;
        draft.expirationPoint = action.payload.expirationPoint.point;
      });
    }
    case types.GET_COUPON_HISTORY_LIST: {
      console.log('GET_COUPON_HISTORY_LIST', action);

      return produce(state, (draft) => {
        draft.couponHisoryList = action.payload.data;
        draft.useCoupon = action.payload.useCoupon.cnt;
        draft.expirationCoupon = action.payload.ddayCoupon.cnt;
        //draft.expirationCouponList = expirationCouponList;
        //draft.expirationCoupon = expirationCoupon;
      });
    }
    case types.SET_COUPON_HISTORY: {
      console.log('SET_COUPON_HISTORY', action);

      return produce(state, (draft) => {
        const useCouponList = state.useCouponList;

        action.payload.coupHstId = _.maxBy(useCouponList, 'coupHstId').coupHstId + 1;
        draft.useCouponList = _.concatf(state.useCouponList, action.payload);
      });
    }
    case types.GET_COUPON: {
      console.log('GET_COUPON', action);

      return produce(state, (draft) => {
        draft.couponData = action.payload;
      });
    }
    case types.SET_COUPON: {
      console.log('SET_COUPON', action);

      return produce(state, (draft) => {
        const tempObj = _.cloneDeep(state.couponData);
        tempObj.registCoupYn = 'Y';
        draft.couponData = tempObj;
      });
    }
    default:
      return state;
  }
}

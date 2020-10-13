import * as types from './carOptionType';
import { axiosGetAsync, axiosPut, axiosPost, axiosGet } from '@src/utils/HttpUtils';
import { isEmpty, isNil, orderBy, filter } from 'lodash';

export const getDealerServiceInfo = (userId) => (dispatch) => {
  // if (isEmpty(userId)) {
  //   return;
  // }
  const res = {
    serviceInfo: {
      homeserviceYn: 'Y',
      pricingTicketYn: 'Y',
      autoauctionMemberYn: 'Y',
      franchiseYn: 'Y'
    },
    alarmInfo: {
      homeserviceCount: 2,
      unAnsweredNoteCount: 1,
      totalAlarmCount: 3,
      noticeCount: 1,
      compareBiddingCount: 1
    },
    pointScore: 12000,
    couponCount: 43
  };

  dispatch({
    type: types.GET_DEALER_SERVICE_INFO,
    payload: res
  });
};

export const getLnbMenuList = (userId) => (dispatch) => {
  // if (isEmpty(userId)) {
  //   return;
  // }
  const res = [
    {
      title: '내차팔기',
      url: 'url',
      sub: [
        { title: '등록차량 및 광고관리', url: '/buycar/buyCarList' },
        { title: '차량등록', url: '/buycar/livestudio/buyCarList' },
        { title: '나의 설명글 관리', url: '/buycar/auction/buyCarList' },
        { title: '홈서비스 예약/판매 현황', url: '/buycar/certificationmall/buyCarCertiMall' },
        { title: '보증 차량 판매 현황', url: '/buycar/certificationmall/buyCarCertiMall' },
        { title: 'Live Studio 촬영 예약', url: '/buycar/certificationmall/buyCarCertiMall' }
      ]
    },
    {
      title: '내차사기',
      url: 'url',
      sub: [
        { title: '24시간 실시간 비교견적', url: '/sellcar/visit/visitValuationRequest' },
        { title: '스마트옥션 이용현황', url: '/sellcar/self/selfSellCuide' },
        { title: '경매회원 안내', url: '/sellcar/nonValue/noneValuationGuide' },
        { title: '경매장 이용현황', url: '/sellcar/nonValue/noneValuationGuide' }
      ]
    },
    {
      title: '프라이싱센터 바로가기',
      url: 'url'
    },
    {
      title: '회원정보 관리',
      url: 'url',
      sub: [
        { title: '회원정보/소개 관리', url: '/dealingguide/ewGoos' },
        { title: '차량 판매 후기 관리', url: '/dealingguide/buyGuide' }
      ]
    }
  ];

  dispatch({
    type: types.GET_LNB_MENU_LIST,
    payload: res
  });
};

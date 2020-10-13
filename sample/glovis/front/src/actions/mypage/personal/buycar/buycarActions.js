/**
 * 설명 : 마이페이지(일반) 나의관심 목록
 * @author 김지훈
 */
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';
import * as types from './buycarTypes';

/**
 * 설명 :  나의관심 목록 조회
 * @param {map} 사용자ID
 * @returns {map} inquireList 문의 목록
 */
export const getinterList = (param) => async (dispatch) => {
  console.log('getinterList: ', param);
  const { data } = await axiosPost(`/api/mypage/user/interest/selectInterestMemberCar.do`, param);

  dispatch({
    type: types.GET_INTEREST_LIST,
    payload: data
  });
};


export const getSearchInterestList = (param) => async (dispatch) => {
  console.log('getSearchInterestList: ', param);

  const {data} = await axiosPost(`/api/mypage/user/interest/searchInterestMemberCar.do`, param);
  dispatch({
    type: types.GET_SEARCH_INTEREST_LIST,
    payload: data
  });
};


export const getLastViewList = (param) => async (dispatch) => {
  console.log('getinterList: ', param);

  const {data} = await axiosPost(`/api/mypage/user/recentlyList.do`, param);
  dispatch({
    type: types.GET_LASTVIEW_LIST,
    payload: data
  });
};

export const getLastQuickViewList = (param) => async (dispatch) => {
  console.log('getLastQuikViewList: ', param);

  const {data} = await axiosPost(`/api/mypage/user/quickViewRecentRacList.do`, param);
  dispatch({
    type: types.GET_LAST_QUICK_VIEW_LIST,
    payload: data
  });
};



export const getMessageCarList = (payload) => async (dispatch) => {
  console.log('getMessageCarList: ', payload);
  const res = [
    {
      id: 1,
      date: '2019-09-19',
      imgSrc: '/images/dummy/product-img-06.png',
      imgAlt: '차량 이미지',
      subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
      sellerName: '박현대',
      sellerMobile: '010-3333-7777',
      inquiryContent: '가격할인이 되나요?',
      replyState: '답변완료'
    },
    {
      id: 2,
      date: '2019-09-19',
      imgSrc: '/images/dummy/product-img-06.png',
      imgAlt: '차량 이미지',
      subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
      sellerName: '박현대',
      sellerMobile: '010-3333-7777',
      inquiryContent: '가격할인이 되나요?',
      replyState: '답변완료'
    },
    {
      id: 3,
      date: '2019-09-19',
      imgSrc: '/images/dummy/product-img-06.png',
      imgAlt: '차량 이미지',
      subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
      sellerName: '박현대',
      sellerMobile: '010-3333-7777',
      inquiryContent: '가격할인이 되나요?',
      replyState: '답변완료'
    },
    {
      id: 4,
      date: '2019-09-19',
      imgSrc: '/images/dummy/product-img-06.png',
      imgAlt: '차량 이미지',
      subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
      sellerName: '박현대',
      sellerMobile: '010-3333-7777',
      inquiryContent: '가격할인이 되나요?',
      replyState: '답변완료'
    },
    {
      id: 5,
      date: '2019-09-19',
      imgSrc: '/images/dummy/product-img-06.png',
      imgAlt: '차량 이미지',
      subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
      sellerName: '박현대',
      sellerMobile: '010-3333-7777',
      inquiryContent: '가격할인이 되나요?',
      replyState: '답변완료'
    }
  ];

  dispatch({
    type: types.GET_MESSAGECAR_LIST,
    payload: res
  });
};
export const messageSendAction = (payload) => async (dispatch) => {
  console.log('getMessageCarList: ', payload);
  const res = [];

  dispatch({
    type: types.GET_MESSAGECAR_LIST,
    payload: res
  });
};

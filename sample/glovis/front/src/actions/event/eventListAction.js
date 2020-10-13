/**
 * 설명 : 이벤트 타입 선언
 * @fileoverview 이벤트 > 진행중/종료된 이벤트
 * @requires [eventTypes]
 * @author 추호진
 */
import { axiosGetAsync, axiosPut, axiosPost, axiosGet } from '@src/utils/HttpUtils';
import * as eventTypes from './eventTypes';

/**
 * 설명 : 이벤트 타입들 정의.
 * @param {eventList} 진행중/종료된 이벤트
 * @returns {eventList} 진행중/종료된 이벤트
 */

export const getEventLists = (param, eventType) => async (dispatch) => {
  // const res = await axiosGetAsync(`/myBoardList/${userId}`, cancelToken);
  const data = await axiosGet(`/api/event/selectEventList.do?inqPageNo=${param}&eventType=${eventType}`).then((res) => {
    console.log('test getEventLists res => ', res);
    return res;
  });
  dispatch({
    type: eventTypes.GET_EVENT_LISTS,
    payload: data
  });
};


export const getEventListBanner = (param, eventType) => async (dispatch) => {
  // const res = await axiosGetAsync(`/myBoardList/${userId}`, cancelToken);
  const data = await axiosGet(`/api/event/selectEventListBanner.do?inqPageNo=${param}&eventType=${eventType}`).then((res) => {
    console.log('test getEventLists res => ', res);
    return res;
  });
  dispatch({
    type: eventTypes.GET_EVENT_LIST_BANNER,
    payload: data
  });
};

export const getEventEndLists = (param) => async (dispatch) => {
  const data = await axiosGet(`/api/event/selectEventList.do?inqPageNo=${param}&eventType=03`).then((res) => {
    console.log(res);
    return res;
  });
  dispatch({
    type: eventTypes.GET_EVENT_END_LISTS,
    payload: data
  });
};

export const getEventListsClear = () => (dispatch) => {
  dispatch({
    type: eventTypes.GET_EVENT_LISTS,
    payload: { data: { data: null, pagingInfo: null } }
  });
};

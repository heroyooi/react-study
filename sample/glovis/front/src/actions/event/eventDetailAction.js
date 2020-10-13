/**
 * 설명 : 이벤트 상세 타입 선언
 * @fileoverview 진행중/종료된 이벤트 상세페이지
 * @requires [eventTypes]
 * @author 추호진
 */
import { axiosGetAsync, axiosPut, axiosPost, axiosGet } from '@src/utils/HttpUtils';
import * as eventTypes from './eventTypes';

/**
 * 설명 : 이벤트 상세 타입 선언 정의.
 * @param {eventDetail} 진행중/종료된 이벤트 상세페이지
 * @returns {eventDetail} 진행중/종료된 이벤트 상세페이지
 */

export const getEventDetail = (id, code) => async (dispatch) => {
  const data = await axiosGet(`/api/event/selectEventInfo.do?evtNttId=${id}&eventType=${code}`).then((res) => {
    console.log('test getEvent res => ', res);
    return res;
  });
  dispatch({
    type: eventTypes.GET_EVENT_DETAIL,
    payload: data
  });
};

/**
 * 설명 : Live show 배정 리스트
 * @author 왕태식
 */
import { isEmpty, isNil } from 'lodash';
import * as http from '@src/utils/HttpUtils';
import * as types from './liveStudioAssignTypes';

/**
 * 설명 : Live show 배정 리스트 목록 조회
 * @param {json} param api필수값
 * @returns {map} commentList Live show 배정 리스트 목록
 */
export const getLiveStudioList = (param) => async (dispatch) => {
  // 추후 axiosPost or axiosGet로 변경
  const data = await http.axiosPost('/api/liveshot/liveshotAssignList.do', param);

  console.log('getLiveStudioList data =>>', data.data);

  dispatch({
    type: types.GET_LIVE_STUDIO_ASSIGN_LIST,
    payload: data
  });
};

export const getTodayCnt = () => async (dispatch) => {
  const data = await http.axiosPost('/api/liveshot/lastUpdateDateDay.do', null);
  dispatch({
    type: types.GET_TODAY_CNT,
    payload: data
  });
};

export const getWeekCnt = () => async (dispatch) => {
  const data = await http.axiosPost('/api/liveshot/lastUpdateDateWeek.do', null);
  dispatch({
    type: types.GET_WEEK_CNT,
    payload: data
  });
};

export const getLiveAssignDetail = (param) => async (dispatch) => {
  const data = await http.axiosPost('/api/liveshot/liveshotAssignView.do', param);
  dispatch({
    type: types.GET_LIVE_ASSIGN_DETAIL,
    payload: data
  });
};

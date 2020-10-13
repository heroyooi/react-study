import { axiosGetJson } from '@src/utils/HttpUtils';
import * as types from './layoutTypes';

//GNB메뉴 조회
export const getGnbMenuList = (param) => (dispatch) => {
  axiosGetJson('/api/auth/main/selectMenuInfo.do', param).then((res) => {
    dispatch({
      type: types.GET_GNB_MENU_LIST,
      payload: res
    });
  });
};

//마이페이지>left top 정보 조회
export const selectMemberMypage = (param) => (dispatch) => {
  console.log('layoutAction>GET_DEALER_MYPAGE_INFO=%o', param);
  axiosGetJson('/api/member/selectMemberMypage.do', param).then((res) => {
    dispatch({
      type: types.GET_DEALER_MYPAGE_INFO,
      payload: res
    });
  });
};

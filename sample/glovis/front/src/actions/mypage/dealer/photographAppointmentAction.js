/**
 * 설명 : 라이브스튜디오 촬영 예약
 * @author 박진하
 */
import { axiosPost } from '@src/utils/HttpUtils';
import * as types from './mypageDealerTypes';

/**
 * 설명 : 라이브스튜디오 촬영 예약 목록 조회
 * @param {String} userId 사용자ID
 * @param {map} searchInfo 검색조건 쿼리
 * @returns {map} liveRsvtList 라이브스튜디오 촬영 예약 목록
 */
export const getLiveRsvtList = (searchInfo) => async (dispatch) => {
  console.log(searchInfo);
  const url = `/api/mypage/dealer/selectLiveRsvtInfo.do`;
  const liveRsvtList = await axiosPost(url, searchInfo);
  const dataList = liveRsvtList.data;

  dispatch({
    type: types.GET_LIVE_STUDIO_LIST,
    payload: dataList
  });
};

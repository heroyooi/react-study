import { isEmpty, isNil } from 'lodash';
import * as homeservicetypes from './homeserviceTypes';
//import { axiosGetAsync } from '@src/utils/HttpUtils';

export const getFilterList = (userId /*cancelToken = null*/) => async (dispatch) => {
  if (isEmpty(userId)) {
    return;
  }

  // const res = await axiosGetAsync(`/myBoardList/${userId}`, cancelToken);
  const res = {
    test: 'test'
  };

  dispatch({
    type: homeservicetypes.GET_MY_BOARD_LIST,
    payload: res
  });
};

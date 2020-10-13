/**
 * 설명 : 재고관리
 * @author 왕태식
 */
import { isEmpty, isNil } from 'lodash';
import Router, { withRouter } from 'next/router';
import * as http from '@src/utils/HttpUtils';
import * as types from './inventoryTypes';

/**
 * 설명 : 재고관리 목록 조회
 * @param {json} param api필수값
 * @returns {map} commentList 재고관리 목록
 */
export const getInventoryList = (param) => async (dispatch) => {
  // 추후 axiosPost or axiosGet로 변경
  const data = await http.axiosPost('/api/selectInventoryManagementList.do', param);

  console.log('getInventoryList data =>>', data.data);

  dispatch({
    type: types.GET_INVENTORY_LIST,
    payload: data
  });
};
/**
 * 설명 : 총비용
 * @author 왕태식
 */
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';
import { isEmpty } from 'lodash';

export const types = {
  GET_LOC_CODE_LIST: 'buycar/common/GET_LOC_CODE_LIST',
  GET_TOTAL_COST_CAL_DATA: 'buycar/common/GET_TOTAL_COST_CAL_DATA',
  GET_MONTHLY_INSTALL_LIST: 'buycar/common/GET_MONTHLY_INSTALL_LIST',
  GET_CAR_TAX_CAL_DATA: 'buycar/common/GET_CAR_TAX_CAL_DATA',
  GET_MOB_LOC_CODE_LIST: 'buycar/common/GET_MOB_LOC_CODE_LIST'
};

export const getMobLocCodeList = () => async (dispatch) => {
  const data = await axiosPost(`/api/buycar/locCodeInfo.do`);
  console.log('getMobLocCodeList =>', data);
  dispatch({
    type: types.GET_MOB_LOC_CODE_LIST,
    payload: data
  });
};

/**
 * 설명 : 지역정보 리스트
 * @returns {map} locList 지역정보 셀렉트 박스 목록
 */
export const getLocCodeList = () => async (dispatch) => {
  const data = await axiosPost(`/api/buycar/locCodeInfo.do`);
  console.log('getLocCodeList => ', data);
  dispatch({
    type: types.GET_LOC_CODE_LIST,
    payload: data
  });
};

/**
 * 설명 : 총비용 -- 등록세,취득세, 공채매입비율, 공채매입비용
 * @returns {map} LocCalData 총비용 계산 데이터
 */
export const getTotalCostCalData = (param) => async (dispatch) => {
  const data = await axiosPost(`/api/buycar/totalCostCalculation.do`, param);
  console.log('getTotalCostCalData => ', data);
  dispatch({
    type: types.GET_TOTAL_COST_CAL_DATA,
    payload: data
  });
};

/**
 * 설명 : 할부내역조회 리스트
 * @returns {map} monthlyList 할부내역조회 셀렉트 박스 목록
 */
export const getMonthlyInstallList = () => async (dispatch) => {
  const data = await axiosGet(`/api/buycar/selectMonthlyInstallmentList.do`, null);
  console.log('getMonthlyInstallList => ', data);
  dispatch({
    type: types.GET_MONTHLY_INSTALL_LIST,
    payload: data
  });
};

/**
 * 설명 : 자동차세 세액 경감률
 * @returns {map} carTaxCalData 자동차세 세액 경감률 데이터
 */
export const getCarTaxCalData = (param) => async (dispatch) => {
  const data = await axiosPost(`/api/buycar/carTaxCalculation.do`, param);
  console.log('getCarTaxCalData => ', data);
  dispatch({
    type: types.GET_CAR_TAX_CAL_DATA,
    payload: data
  });
};

const selectYear = [];
for (let year = new Date().getFullYear(); year > 1980; year--) {
  selectYear.push({ id: year, min: year, max: year, value: year, label: year + '년' });
}

export const yearList = selectYear;

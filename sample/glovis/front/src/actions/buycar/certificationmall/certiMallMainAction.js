import { axiosGet } from '@src/utils/HttpUtils';

export const types = {
  GET_IMPORT_CERTI_MALL: 'buycar/certificationmall/GET_IMPORT_CERTI_MALL',
  GET_FINANCE_CERTI_MALL: 'buycar/certificationmall/GET_FINANCE_CERTI_MALL',
  GET_FRANCHISE_CERTI_MALL: 'buycar/certificationmall/GET_FRANCHISE_CERTI_MALL'
};

export const codeParam = {
  '0010': 'GET_IMPORT_CERTI_MALL', // 수입 인증
  '0020': 'GET_FINANCE_CERTI_MALL', // 금융사 인증
  '0030': 'GET_FRANCHISE_CERTI_MALL' // 프랜차이즈 인증
};
//Promise.all 로 3번 호출
export const getBrandListByCode = (prtnKncd) => async (dispatch) => {
  const data = await axiosGet(`/api/buycar/selectCertifiedMallList.do?prtnKncd=${prtnKncd}`).then((res) => {
    return res?.data?.data?.brdLst || [];
  });
  dispatch({
    type: types[codeParam[prtnKncd]],
    payload: data || []
  });
};

// import * as http from '@src/utils/HttpUtils' //axiosGet
import axios from 'axios';
import dealerProdTypes from '@src/actions/mypage/dealer/dealerProdTypes';
import { insertDealerProd, selectDealerProdbyDlrPrdId, selectSaleProdItem, updateProdCarInfo, selectSaleProdCnt, selectAdverBaseInfo, selectAnalysisData, selectDealerProdByCrNo } from '@src/api/mypage/dealer/dealerProdApi';
import { adverEffectTypes } from '@src/reducers/mypage/dealer/dealerAdverEffectReducer'


export const getDealerProdAction = (dlrPrdId) => async (dispatch) => {
  try {
    console.log('getDealerProdAction : ', dlrPrdId);
    // const payload = await axios.get(`/mock/mypage/dealer/prod.json`, { params }).then((res) => res?.data?.data || {});
    // console.log('TCL: getDealerProdAction -> payload', payload);
    // const payload = await selectDealerProdbyDlrPrdId(dlrPrdId).then((res) => res?.data?.data);
    const payload = await selectSaleProdItem(dlrPrdId).then((res) => res?.data);
    console.log("getDealerProdAction -> payload", payload)

    dispatch({
      type: dealerProdTypes.INIT_DEALER_PROD,
      payload
    });
    return payload
  } catch (error) {
    console.error('error : ', error);
  }
};

export const insertDealerProdAction = (params) => async (dispatch) => {
  try {
    // const [carMartData] = await Promise.alal([axios.get(`http://localhost/mock/sellcar/carMart.json?crNo=${crNo}`)]).then((res) => res.map((res) => res?.data?.data));
    // const { car } = carMartData;
    const data = await insertDealerProd(params);

    // dispatch({
    //   type: sellCarTypes.INIT_CAR_STATE,
    //   payload: { car } || {}
    // });

    return data;
  } catch (err) {
    console.error('error : 에러페이지로 리디렉션 : ', err);
  }
};

export const inputPropAction = (payload) => (dispatch) => {
  console.log('inputPropAction payload : ', payload)
  dispatch({
    type: dealerProdTypes.INPUT_PROP,
    payload
  });
};

export const inputChildProdAction = (payload) => (dispatch) => {
  console.log("inputChildProdAction -> payload", payload)
  dispatch({
    type: dealerProdTypes.INPUT_CHILD_PROP,
    payload
  });
};

export const inputChildPropsAction = (payload) => (dispatch) => {
  dispatch({
    type: dealerProdTypes.INPUT_OBJECT_TO_CHILD_PROPS,
    payload
  });
};

export const resetDealerProdAction = () => async (dispatch) => {
  try {
    dispatch({
      type: dealerProdTypes.RESET_PROD,
    });
  } catch (error) {
    console.error(error);
  }
};


export const inputProdCar = () => async (dispatch) => {
  try {
    dispatch({
      type: dealerProdTypes.RESET_PROD,
    });
  } catch (error) {
    console.error(error);
  }
};


export const updateProdCarInfoAction = (payload) => async (dispatch) => {
  try {
    const { data } = await updateProdCarInfo(payload)
    console.log("updateProdCarInfoAction -> data", data)


    return data
  } catch (error) {
    console.error(error);
  }
};

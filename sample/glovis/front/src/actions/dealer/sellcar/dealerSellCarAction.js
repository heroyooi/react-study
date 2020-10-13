// import * as http from '@src/utils/HttpUtils'
import axios from 'axios';
import * as types from './types';

export const getCarInfo = carNum => async dispatch => {
      console.log('getCarInfo');
      const {data} = await axios.get(`/mock/dealer/selcar/carInfo.json?carNum=${carNum}`);
      dispatch({
          type: types.dealerSellCarType.GET_CAR_INFO,
          payload: data || {}
      })
  }

export const getCarDefaultData = carNum => async dispatch => {
  console.log('getCarInfo');
  const {data} = await axios.get(`/mock/dealer/selcar/defaultCarInfo.json?carNum=${carNum}`);
  dispatch({
    type: types.dealerSellCarType.GET_DEFAULT_DATA,
    payload: data || {}
  })
}
export const getCarInfoTest = carNum => async dispatch => {
  console.log('getCarInfoTest');
  dispatch({
    type: types.dealerSellCarType.GET_CAR_INFO_TEST,
  })
}

  
  export const resetCarInfo = () => dispatch => {
    dispatch({
      type: types.dealerSellCarType.RESET_CAR_INFO
    })
  }


export const INPUT_DATA = payload => dispatch => {
  dispatch({
    type:  types.dealerSellCarType.INPUT_DATA,
    payload
  })
}

export const UPDATE_OP = payload => dispatch => {
  dispatch({
    type:  types.dealerSellCarType.UPDATE_OP,
    payload
  })
}

export const UPDATE_ADD_OP = payload => dispatch => {
  dispatch({
    type:  types.dealerSellCarType.UPDATE_ADD_OP,
    payload
  })
}

export const UPDATE_EX_OP = payload => dispatch => {
  dispatch({
    type:  types.dealerSellCarType.UPDATE_EX_OP,
    payload
  })
}


  export const setCarInfo = (data) => async (dispatch) => {
    // const res = await axiosPost(url, data);
    const res = data;
  
    dispatch({
      type: types.dealerSellCarType.SET_CAR_INFO,
      payload: res
    });
  }
  
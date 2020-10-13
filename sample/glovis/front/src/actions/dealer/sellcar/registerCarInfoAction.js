import * as http from '@src/utils/HttpUtils'
import * as types from './types';

export const INPUT_REGI_CAR = payload => dispatch => {
  dispatch({
    type:  types.dealerSellCarType.INPUT_REGI_CAR,
    payload
  })
}


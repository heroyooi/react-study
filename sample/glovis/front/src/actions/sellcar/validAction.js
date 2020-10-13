/**
 * 비교견적 처리 Action
 */
import validTypes from './validTypes';

export const restValidAction = () => async (dispatch) => {
  dispatch({
    type:validTypes.RESET_LIST
  });
};

export const insertValidAction = (params) => async (dispatch) => { 
  let errorData = {};
  params.forEach( e => {
    let data = {};
    data[e.field] = e.label;
    errorData = { ...errorData, ...data };
  })
  dispatch({
    type:validTypes.INSERT_LIST,
    payload:errorData
  });
};
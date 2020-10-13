export const LIVE_SHOT_REG_DATA = 'LIVE_SHOT_REG_DATA';

export const setLiveShotCarInfo = (crId, crNo, crType, itnspItems) => (dispatch) => {
  dispatch({
    type: LIVE_SHOT_REG_DATA,
    payload: {
      crId,
      crNo,
      crType,
      itnspItems
    }
  });
};

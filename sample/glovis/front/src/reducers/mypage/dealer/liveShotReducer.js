import { produce } from 'immer';
import { LIVE_SHOT_REG_DATA } from '@src/actions/dealer/sellcar/liveShotAction';

const initialState = {
  liveShotCarInfo: null
};

export default function liveShotReducer(state = initialState, action) {
  switch (action.type) {
    case LIVE_SHOT_REG_DATA: {
      return produce(state, (draft) => {
        draft.liveShotCarInfo = action.payload;
      });
    }
    default:
      return state;
  }
}

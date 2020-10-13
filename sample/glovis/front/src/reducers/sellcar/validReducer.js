import { produce } from 'immer';
import validTypes from '../../actions/sellcar/validTypes';

const initialState = {
  validation: {}
};

export default function validReducer(store = initialState, action) {
  switch (action.type) {
    case validTypes.RESET_LIST: {
      return produce(store, (draft) => {
        draft.validation = {};
      });
    }
    case validTypes.INSERT_LIST: {
      return produce(store, (draft) => {
        draft.validation = action.payload;
      });
    }
    default: {
      return store;
    }
  }
}

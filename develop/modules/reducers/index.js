import { combineReducers } from 'redux';

import user from './user';

// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
  user,
});

export default rootReducer;
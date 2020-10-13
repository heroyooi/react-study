import { combineReducers } from 'redux';
import commonReducer from './commonReducer';
import counterReducer from './counterReducer';
import login from './member';
import member from './member/memberReducer';
import pricing from './pricing';

export default combineReducers({
  common: commonReducer,
  counter: counterReducer,
  ...login,
  ...member,
  ...pricing
});

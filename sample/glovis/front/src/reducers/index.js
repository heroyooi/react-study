import { combineReducers } from 'redux';
import commonReducer from './commonReducer';
import counterReducer from './counterReducer';
import myPageReducer from './myPageReducer';
import homeservice from './homeservice';
import sellcar from './sellcar';
import mypageDealer from './mypage/dealer';
import layoutReducer from './layout/layoutReducer';
import main from './main';
import dealerSellCarReducer from './dealer/sellcar/dealerSellCarReducer';
import memberInfoReducer from './mypage/dealer/memberInfoReducer';
import personalMemberInfoReducer from './mypage/personal/info/memberInfoReducer';
import buycar from './buycar';
import epilogueReducer from './mypage/dealer/selfsell/epilogueReducer';
import mypageLeftDealer from './mypage/common';
import basicInfoReducer from './dealer/sellcar/basicInfoReducer';
// import selfbuycar from './mypage/dealer/buycar';
import dealerManagementReducer from './mypage/party/dealerManagementReducer';
import event from './event';
import autoAuction from './autoAuction';
// import mypageSellCarReducer from './mypage/sellcar';
import login from './member';
import cscenterReducer from './cscenter';
import memberReducer from './member/memberReducer';
import personalMypageSellcar from './mypage/personal/sellcar';
import pricing from './pricing';
import personalMypageInfo from './mypage/personal/info';
import personalMypageBuycar from './mypage/personal/buycar';
import carManagementReducer from './mypage/dealer/sellcar/carManagementReducer';
import commonCodeReducer from './common/commonCodeReducer';
import memberMng from './mypage/member/memberMngReducer';
import policy from './footer/policyReducer';
import pointCuponReducer from './mypage/dealer/pointCuponHistoryReducer';

export default combineReducers({
  common: commonReducer,
  counter: counterReducer,
  myPage: myPageReducer,
  ...homeservice,
  dealerSell: dealerSellCarReducer,
  regiCarInfo: basicInfoReducer,
  ...sellcar,
  ...mypageDealer,
  memberInfo: memberInfoReducer,
  personalMemberInfo: personalMemberInfoReducer,
  layout: layoutReducer,
  ...main,
  epliogue: epilogueReducer,
  ...buycar,
  ...mypageLeftDealer,
  dealerMngt: dealerManagementReducer,
  ...event,
  ...autoAuction,
  // ...mypageSellCarReducer,
  ...login,
  ...cscenterReducer,
  member: memberReducer,
  ...personalMypageSellcar,
  ...pricing,
  ...personalMypageInfo,
  ...personalMypageBuycar,
  carManagement: carManagementReducer,
  commonCode: commonCodeReducer,
  memberMng,
  policy,
  pointCupon: pointCuponReducer
});

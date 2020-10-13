import homeServiceReqReducer from './homeServiceREQReducer';
import homeServiceReducer from './homeserviceReducer';
import homeServiceInfoReducer from './homeServiceInfoReducer';

export default {
  home: homeServiceReducer,
  homeReq: homeServiceReqReducer,
  homeInfo: homeServiceInfoReducer
};

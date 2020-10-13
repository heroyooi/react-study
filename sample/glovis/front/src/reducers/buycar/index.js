import buyCarDetailReducer from './buyCarDetailReducer';
import buyCarListReducer from './buyCarListReducer';
import recommentItemsReducer from './recommendItemsReducer';
import autobellDiagnosisReducer from './autobellDiagnosisReducer';
import liveStudioReducer from './livestudio/liveStudioReducer';
import auctionReducer from './auction/auctionReducer';
import certiMallMainReducer from './certificationmall/certiMallMainReducer';
import certiMallViewReducer from './certificationmall/certiMallViewReducer';
import sellerInfoReducer from './common/sellerInfoReducer';
import totalCostReducer from './totalCost/totalCostReducer';
export default {
  buyCarList: buyCarListReducer,
  liveStudioCarList: liveStudioReducer,
  auctionCarList: auctionReducer,
  certiMallMain: certiMallMainReducer,
  certiMallView: certiMallViewReducer,
  buyCarDetail: buyCarDetailReducer,
  recommentItems: recommentItemsReducer,
  autobellDiagnosis: autobellDiagnosisReducer,
  commonSellerInfo: sellerInfoReducer,
  totalCost: totalCostReducer
};

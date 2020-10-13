import carDescriptionReducer from './carDescriptionReducer';
import homeServiceReducer from './homeServiceReducer';
import pointCuponHistoryReducer from './pointCuponHistoryReducer';
import photographAppointmentReducer from './photographAppointmentReducer';
import counselCarReducer from './common/counselCarReducer';
import dealerProdReducer from './dealerProdReducer';
import dealerProdListReducer from './dealerProdListReducer';
import dealerAdverReducer from './dealerAdverReducer';
import performRecordReducer from './performRecordReducer';
import carManagementReducer from './sellcar/carManagementReducer';
import auctionMemberReducer from './auction/auctionMemberReducer';
import currentListReducer from '@src/reducers/mypage/dealer/auction/currentListReducer';
import inventoryReducer from './inventory/inventoryReducer';
import guarantCarReducer from './guarantCarReducer';
import liveStudioAssignReducer from './liveStudioAssignReducer';
import liveShotReducer from './liveShotReducer';
import dealerAdverEffectReducer from './dealerAdverEffectReducer';

export default {
  carComment: carDescriptionReducer,
  myHomeService: homeServiceReducer,
  pointCupon: pointCuponHistoryReducer,
  lvRsvt: photographAppointmentReducer,
  dealerProd: dealerProdReducer,
  dealerProdList: dealerProdListReducer,
  dealerAdver: dealerAdverReducer,
  performRecord: performRecordReducer,
  counselCar: counselCarReducer,
  carManagement: carManagementReducer,
  auctionMember: auctionMemberReducer,
  inventory: inventoryReducer,
  guarantCar: guarantCarReducer,
  liveAssign: liveStudioAssignReducer,
  liveShot: liveShotReducer,
  dealerAdverEffect: dealerAdverEffectReducer,
  currentList : currentListReducer,
};

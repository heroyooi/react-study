import { produce } from 'immer';
import { types } from '@src/actions/buycar/common/sellerInfoActions';

const initialState = {
  /**====================================================
   * 차량상세 공통 판매자 정보 + 판매점 정보
   * URL: GET /
   * @param(M): dlrId
   *  */
  sellerInfo: {
    dlrId: '', // 'D191379',
    dlrNm: '', // '01187885655이름',
    dlrHpPnEnc: '', // 'E084F54D26002897C92384B543BBDAC5',
    dlrEn: '', // '511138882900',
    dlrEntrCorpNm: '', // '(주) 가짜',
    dlrProfFileUrl: null, // null,
    dlrStrPn: '', // '02-1234-5678',
    dlrStrFaxno: '', // '02-2345-6789',
    dlrStrAddr: '', // '서울시 강남구 역삼동 임시1',
    dlrStrSlHmCntn: '', // '월~토요일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00)\r\n일요일/공휴일 휴무',
    onSaleCarCnt: 0, // 17,
    cmplSaleCarCnt: 0, // 17,
    cmpl12MonthSaleCarCnt: 0, // 17,
    hSvcUseCnt: 0, // 1,
    aSvcUseCnt: 0, // 0,
    pSvcUseCnt: 0 // 0
  },

  /**====================================================
   * 차량상세 공통 판매중 차량 목록
   * URL: GET /
   * @param(M): dlrId
   *  */
  onSaleCarList: [],
  onSaleTotalCnt: 0,

  /**====================================================
   * 차량상세 공통 판매완료 차량 목록
   * URL: GET /
   * @param(M): dlrId
   *  */
  soldOutCarList: [],
  soldOutTotalCnt: 0,

  /** ====================================================
   * 차량상세 공통 판매장 정보
   * URL: GET /buycar/
   * @param(M): dlrId : 'D191379' //판매자 아이디
   * @param(M): sttDvcd : '0010' //판매상태 코드
   * @param(O): cho : '1' //제조국 코드
   *  */
  crMdlList: []
};

/**
 * 설명 : 내차사기 > 차량 상세 조회
 * @author 한관영
 * @param {String} action.type
 * @param {Object?} action.payload
 * @returns {map} state 차량 상세 정보를 store에 보관
 */
export default function sellerInfoReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_SELLER_INFO: {
      return produce(state, (draft) => {
        draft.sellerInfo = action.payload;
      });
    }
    case types.GET_ON_SALE_CAR_LIST: {
      return produce(state, (draft) => {
        draft.onSaleCarList = action.payload1;
        draft.onSaleTotalCnt = action.payload2;
      });
    }
    case types.GET_SOLD_OUT_CAR_LIST: {
      return produce(state, (draft) => {
        draft.soldOutCarList = action.payload1;
        draft.soldOutTotalCnt = action.payload2;
      });
    }
    case types.GET_CAR_MODEL_LIST: {
      return produce(state, (draft) => {
        draft.crMdlList = action.payload;
      });
    }
    default: {
      return state;
    }
  }
}

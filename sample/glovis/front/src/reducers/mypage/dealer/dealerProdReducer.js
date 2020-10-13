import { produce } from 'immer';
import dealerProdTypes from '@src/actions/mypage/dealer/dealerProdTypes';

const initialDealerProdState = {
  // dlrPrdId : null, //딜러 상품 ID
  // crId : null, //차량아이디
  // slAmt : null, //판매 금액
  // sttDvcd : null, //상태 구분코드
  // prdDelDt : null, //상품 삭제 일시
  // prdDelCntn : null, //상품 삭제 내용
  // lvstdCrYn : null, //라이브 스튜디오 차량 여부
  // auctSbidCrYn : null, //경매 낙찰 차량 여부
  // frnchsCrYn : null, //프렌차이즈 차량 여부
  // hsvcCrYn : null, //홈서비스 차량 여부
  // sbidCrYn : null, //낙찰 차량 여부
  // prdTpcd : null, //상품 유형코드
  // dlrMbId : null, //딜러 회원 ID
  // regDt : null, //등록 일시
  // rgstId : null, //등록자 ID
  // updDt : null, //수정 일시
  // updtId : null, //수정자 ID
  // crMvUrl : null, //차량 동영상 URL
  // szrMorCnt : null, //압류 저당수
  // ewCrYn : null, //???
  // prfdCrYn : null, //???
  // affDeleMbId : null, //???
  // icmAcrtCrYn : {}, // 수입인증차량여부
  // financeCrYn : {}, // 금융사차량여부
  // lvshotCrYn : {}, // 라이브샷차량여부
  // assgnDlrTelEnc : {}, // 배정딜러전화번호암호화
  // assgnDlrId : {}, // 배정딜러ID
  // omcTelNo : {}, // 오마이콜전화번호
  // crPrsnNum : {}, // 차량제시번호
  cmnt: {
    // dlrPrdId : null, //딜러 상품 ID
    // kpntCntn : null, //키포인트 내용
    // scrcCntn : null, //흠집 내용
    // hstCntn : null, //이력 내용
    // opnCntn : null, //소견 내용
    // etcCntn : null, //기타 내용
    // kpntYn : null, //키포인트 여부
    // scrcYn : null, //흠집 여부
    // hstYn : null, //이력 여부
    // opnYn : null, //소견 여부
    // etcYn : null, //기타 여부
    // regDt : null, //등록 일시
    // rgstId : null, //등록자 ID
    // updDt : null, //수정 일시
    // updtId : null, //수정자 ID
  },
  car : {

  },
  analysis: {}
};

export default function dealerProdReducer(store = initialDealerProdState, action) {
  switch (action.type) {
    case dealerProdTypes.INIT_DEALER_PROD:
      return produce(store, (draft) => {
        const { data = { cmnt: {}, car: {}, analysis:{} } } = action.payload;

        Object.keys(data).forEach((key) => {
          draft[key] = data[key];
        });
      });
    case dealerProdTypes.INPUT_PROP:
      return produce(store, (draft) => {
        const { value, name } = action.payload;

        if (![name, value].some((item) => item === undefined)) {
          draft[name] = value;
        }
      });
    case dealerProdTypes.INPUT_CHILD_PROP:
      return produce(store, (draft) => {
        const { prop, value, name } = action.payload;

        if (![prop, name, value].some((item) => item === undefined)) {
          draft[prop][name] = value;
        }
      });
    case dealerProdTypes.INPUT_OBJECT_TO_CHILD_PROPS:
      return produce(store, (draft) => {
        const { prop, values } = action.payload;

        Object.keys(values).forEach(key => {
          if (![key, values[key]].some((item) => item === undefined)) {
            draft[prop][key] = values[key];
          }
        })
      });
    case dealerProdTypes.RESET_PROD:
      return initialDealerProdState
    default:
      return store;
  }
}

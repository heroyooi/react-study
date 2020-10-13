import CmntSchema from './cmnt';
import CarSchema from '@lib/share/validator/sellcar/Car';
import PerformSchema from '@lib/share/validator/mypage/dealer/perfInsp';

export default {
  dlrPrdId: {},
  rgstTpcd : {},
  totInqCnt: {
    type: 'number'
  },
  totItrtCnt: {
    type: 'number'
  },
  crId: {},
  slAmt: {
    type: 'number',
    minimum: 1,
    label : '판매가격'
    // required: true,
    // messages: {
    //   'any.required': '판매 금액을 입력하세요'
    // }
  },
  sttDvcd: {},
  prdDelDt: {
    format: 'date'
  },
  prdDelCntn: {},
  lvstdCrYn: {},
  auctSbidCrYn: {},
  frnchsCrYn: {
    // required: true,
    // messages: {
    //   'any.required': '노출유형을 선택하세요',
    //   'string.base': '노출유형을 선택하세요'
    // }
  },
  hsvcCrYn: {},
  sbidCrYn: {},
  prdTpcd: {},
  dlrMbId: {},
  regDt: {
    // type: 'date',
    // format: 'YYYY-MM-DD HH:mm:ss'
  },
  rgstId: {},
  updDt: {
    // type: 'date',
    // format: 'YYYY-MM-DD HH:mm:ss'
  },
  updtId: {},
  crMvUrl: {},
  szrMorCnt: {
    type: 'number',
    label:'압류/저당',
  },
  ewCrYn: {},
  prfdCrYn: {},
  affDeleMbId: {},
  icmAcrtCrYn : {label:'수입인증차량여부'}, // 수입인증차량여부
  financeCrYn : {label:'금융사차량여부'}, // 금융사차량여부
  lvshotCrYn : {label:'라이브샷차량여부'}, // 라이브샷차량여부
  assgnDlrTelEnc : {label:'배정딜러 연락처'}, // 배정딜러전화번호암호화
  assgnDlrId : {label:'배정딜러'}, // 배정딜러ID
  omcTelNo : {label:'오마이콜전화번호'}, // 오마이콜전화번호
  crPrsnNum : {
    type:'string',
    pattern: '[a-zA-Z0-9]',
    maxLength:20,
    label:'차량제시번호',
  }, // 차량제시번호
  mbId : {label:'차량제시번호'}, // 차량제시번호
  slDelRsnCd : {label:'판매삭제사유'}, // 판매삭제사유 코드
  slDelRsn : {label:'판매삭제사유'}, // 판매삭제사유
  perfInspRecVO: {
    // type : 'any'
  },
  // perfInspRecVO: {
  //   type: 'object',
  //   props: PerformSchema
  // },
  cmnt: {
    type: 'object',
    properties: CmntSchema
  },
  car: {
    type: 'object',
    properties: CarSchema
  },
  analysis : {
  },
  saleDt : {
  },
  dailyView : {
  },
  twoWeeksItrtPrd : {
  },
  totalSize:{
  },
  dlrPrdAdLstList : {
    type: 'array',
  }
};



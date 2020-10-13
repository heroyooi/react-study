import CarSchema from '@lib/share/validator/sellcar/Car';

export default {
  slReqId: {},
  reqTpcd: {},
  reqTpcdNm: {},
  reqSttTpcd: {},
  reqSttTpcdNm: {},
  rgstId: {},
  regDt: {},
  updtId: {},
  updtDt: {},
  rgstTpcd: {},
  rgstTpcdNm: {},
  mbId: {},
  nmbNm: {
    type: 'string'
  },
  hpPn: {
    type: 'string'
  },
  rgstRsdcAddrCd: {
    'label': '시/도 지역을 선택해주세요.'
  },
  rgstRsdcAddrCdNm: {},
  rgstRsdcDtlAddrCd: {
    'label': '시군구 지역을 선택해주세요.'
  },
  rgstRsdcDtlAddrCdNm: {},
  bankCd: {
    'label': '은행을 선택해주세요.'
  },
  accountNo: {
    'label': '계좌번호를 입력해주세요'
  },
  accountNm: {
    'label': '예금주 성함을 입력해주세요'
  },
  applcntRsdcAddAddr: {},
  cnclRsnTpcd: {
    type: 'string'
  },
  cnclRsnTpcdNm: {
    type: 'string'
  },
  cnclRsnCntn: {
    type: 'string'
  },
  usePs1Cntn: {
    type: 'number'
  },
  usePs2Cntn: {
    type: 'number'
  },
  usePs3Cntn: {
    type: 'number'
  },
  usePs4Cntn: {
    type: 'string'
  },
  vltrNm: {
    type: 'string'
  },
  vltrPhnNo: {
    type: 'string'
  },
  vltrDt: {
    type: 'string'
  },
  vltrHh: {
    type: 'string'
  },
  vlrrMm: {
    type: 'string'
  },
  estmAmt: {
    type: 'number'
  },
  nomNm: {
    type: 'string'
  },
  nomPhnNo: {
    type: 'string'
  },
  nomLocCd: {
    type: 'string'
  },
  nomLocCdNm: {
    type: 'string'
  },
  nomCtyCd: {
    type: 'string'
  },
  nomCtyCdNm: {
    type: 'string'
  },
  nomAddAddr: {
    type: 'string'
  },
  memoCntn: {
    type: 'string'
  },
  crId: {
    type: 'string'
  },
  count: {
    type: 'number'
  },
  zcd: {
    type: 'string',
    'label': '우편번호를 선택해주세요.'
  },
  addr: {
    type: 'string',
    'label': '주소를 입력해주세요.'
  },
  dtlAddr: {
    type: 'string',
    'label': '상세 주소를 입력해주세요.'
  },
  car: {
    type: 'object',
    properties: CarSchema
  },
  cmprEstm: {
    type: 'object'
  },
  saleMethod: {
    type: 'object'
  },
  collectAgree:{},
  provideAgree:{},
  nonevalAgree1:{},
  nonevalAgree2:{}
};

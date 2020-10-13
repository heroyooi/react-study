
export const REQ_TPCD = {
  VISIT: '00001',
  SELF: '00002',
  NONEVAL: '00003'
};

export const VISIT_STT = {
  PUBLIC_TEMP: '0001',
  PUBLIC_FORM_COMPLETE: '0002',
  VISITSALE_EVALUATOR_ASSIGNED: 'VS002',
  VISITSALE_VISIT_INFORMED: 'VS003',
  VISITSALE_IPGO: 'VS004',
  VISITSALE_ESTIMATE_COMPLETE:'VS005',
  VISITSALE_CANCEL:'VS006',
  PUBLIC_CANCEL:'0003',
  PUBLIC_FINAL:'0004'
};

export const VISIT_STT_LIST = [
  { value: '0001', label: '임시서장' },
  { value: '0002', label: '신청서 작성 완료' },
  { value: 'VS002', label: '평가사 배정' },
  { value: 'VS003', label: '방문 및 견적안내' },
  { value: 'VS004', label: '입고' },
  { value: 'VS005', label: '견적완료 및 판매결정' }
];

export const SELF_STT = {
  PUBLIC_TEMP:              '0001',
  PUBLIC_FORM_COMPLETE:     '0002',
  SELFSALE_COMPARE_APPROVE: '0014',
  SELFSALE_CHECK_ESTIMATES: '0010',
  SELFSALE_DECIDED_TO_SALE: '0011',
  SELFSALE_CONSIGNMENT:     '0012',
  SELFSALE_CANCEL:          '0013',
  PUBLIC_CANCEL:            '0003',
  PUBLIC_FINAL:             '0004',
  SELF_BIDDING: '0010',
  SELF_DEALING: '0011'
};

export const SELF_STT_LIST = [
  { value: SELF_STT.PUBLIC_TEMP,              label: '임시서장' },
  { value: SELF_STT.PUBLIC_FORM_COMPLETE,     label: '신청서 작성 완료' },
  { value: SELF_STT.SELFSALE_COMPARE_APPROVE, label: '승인' },  
  { value: SELF_STT.SELFSALE_DECIDED_TO_SALE, label: '판매결정' },
  { value: SELF_STT.SELFSALE_CONSIGNMENT,     label: '차량탁송/명의이전' },
  { value: SELF_STT.PUBLIC_FINAL,             label: '완료' },
  { value: SELF_STT.SELFSALE_CANCEL,          label: '판매취소' },
  { value: SELF_STT.PUBLIC_CANCEL,            label: '취소' }
];

export const AUCT_STT_DVCD = {
  APPROVED:        '02',
  PROGRESSING:     '03',
  END:             '05',
  CANCEL:          '04',
  SUCCEED_BIDDING: '06',
  FAILED_BIDDING:  '07',
  DENIED:          '08'
}

export const AUCT_STT_DVCD_LIST = [
  { value : AUCT_STT_DVCD.APPROVED, label:'승인'},
  { value : AUCT_STT_DVCD.PROGRESSING, label:'진행'},
  { value : AUCT_STT_DVCD.END, label:'종료'},
  { value : AUCT_STT_DVCD.CANCEL, label:'취소'},
  { value : AUCT_STT_DVCD.SUCCEED_BIDDING, label:'낙찰'},
  { value : AUCT_STT_DVCD.FAILED_BIDDING, label:'유찰'},
  { value : AUCT_STT_DVCD.DENIED, label:'거절'}
]

export const BS_STT_DVCD = {
  SUCCESS_BID:      '01',
  VISIT_SCHEDULED:  '02',
  DELAYED:          '03',
  FAILURE_COMMENT:  '04',
  FAILURE_COMPLETE: '05',
  SALE_COMPLETE:    '06',
  UNACCEPTABLE_RSN: '07',
  DEAL_FAILED:      '08',
  SALE_FINAL:       '09',
  FAILURE_CONFIRM:  '10'
}

export const BS_STT_DVCD_LIST = [
  { value:BS_STT_DVCD.SUCCESS_BID,      label:'낙찰완료'},
  { value:BS_STT_DVCD.VISIT_SCHEDULED,  label:'방문예정'},
  { value:BS_STT_DVCD.SALE_COMPLETE,    label:'거래완료(수수료입금)'},
  { value:BS_STT_DVCD.SALE_FINAL,       label:'거래완료'},
  { value:BS_STT_DVCD.DELAYED,          label:'거래지연됨'},
  { value:BS_STT_DVCD.DEAL_FAILED,      label:'거래불발'},
  { value:BS_STT_DVCD.FAILURE_COMMENT,  label:'거래불발(소명필요)'},
  { value:BS_STT_DVCD.FAILURE_COMPLETE, label:'거래불발(확인완료)'},
  { value:BS_STT_DVCD.UNACCEPTABLE_RSN, label:'소명 불가 사유확인'},
  { value:BS_STT_DVCD.FAILURE_CONFIRM,  label:'거래불발(소명 확인'},
]

export const NONEVAL_STT = {
  PUBLIC_TEMP: '0001',              // '차량정보등록'       '임시저장'
  PUBLIC_FORM_COMPLETE: '0002',     // '신청완료'           '신청완료'
  PUBLIC_CANCEL: '0003',            // '예상견적확인'       '신청완료(1차견적)'
  PUBLIC_FINAL: '0004',             // '차량상태점검'       '신청완료(1차견적)'
  NONEVAL_CHECK_ESTIMATE: 'NS002',  // '견적확인'
  NONEVAL_CONSIGNMENT: 'NS004',     // '차량탁송 명의이전'
  NONEVAL_DECIDED_TO_SALE: 'NS003', // '판매결정'
  NONEVAL_CANCEL: 'NS101'           // '취소'
};

export const NONEVAL_STT_LIST = [
  { value: '0001', label: '임시서장' },
  { value: '0002', label: '신청서 작성 완료' },
  { value: 'NS002', label: '견적확인' },
  { value: 'NS003', label: '판매결정' },
  { value: 'NS004', label: '차량탁송/명의이전' }
];

export const REQ_STT_TPCD_LIST = {
  '00001': VISIT_STT_LIST,
  '00002': SELF_STT_LIST,
  '00003': NONEVAL_STT_LIST
};

export const REQ_TPCD_NM = {
  '00001' : '방문평가',
  '00002' : '셀프평가',
  '00003' : '무평가'
}

export const carUsages = [
  { value: '1', label: '일반' },
  { value: '2', label: '렌트' }
];

export const frmYyyyList = [
  { label: '2020', value: '2020' },
  { label: '2019', value: '2019' },
  { label: '2018', value: '2018' },
  { label: '2017', value: '2017' },
  { label: '2016', value: '2016' },
  { label: '2015', value: '2015' },
  { label: '2014', value: '2014' },
  { label: '2013', value: '2013' },
  { label: '2012', value: '2012' },
  { label: '2011', value: '2011' },
  { label: '2010', value: '2010' },
  { label: '2009', value: '2009' },
  { label: '2008', value: '2008' },
  { label: '2007', value: '2007' },
  { label: '2006', value: '2006' },
  { label: '2005', value: '2005' },
  { label: '2004', value: '2004' },
  { label: '2003', value: '2003' },
  { label: '2002', value: '2002' },
  { label: '2001', value: '2001' },
  { label: '2000', value: '2000' },
  { label: '1999', value: '1999' },
  { label: '1998', value: '1998' },
  { label: '1997', value: '1997' },
  { label: '1996', value: '1996' },
  { label: '1995', value: '1995' },
  { label: '1994', value: '1994' }
];

export const HH24_STT = {
  BS01: 'BS01', // 신청
  BS02: '02', // 승인
  BS03: '03', // 진행
  BS04: '04', // 취소
  BS05: '05', // 종료
  BS06: '06', // 낙찰
  BS07: '07' // 유찰
};


export const REQ_STT = {
  '00001': {
    NAME: '방문평가',
    STATE: {
      '0002': {
        NAME: '신청완료',
        STEPNO: 1
      },
      VS002: {
        NAME: '평가사배정',
        STEPNO: 2
      },
      VS003: {
        NAME: '방문및견적안내',
        STEPNO: 3
      },
      VS004: {
        NAME: '견적완료 및 판매결정',
        STEPNO: 4
      },
      VS005: {
        NAME: '견적완료 및 판매결정',
        STEPNO: 4
      },
      VS101: {
        NAME: '취소',
        STEPNO: 0
      }
    }
  },
  '00002': {
    NAME: '셀프평가',
    STATE: {
      SS001: {
        NAME: '차량정보등록',
        STEPNO: 1
      },
      SS002: {
        NAME: '신청완료',
        STEPNO: 2
      },
      SS003: {
        NAME: '비교견적진행중',
        STEPNO: 3
      },
      SS004: {
        NAME: '비교견적완료',
        STEPNO: 4
      },
      SS005: {
        NAME: '거래완료',
        STEPNO: 5
      },
      SS101: {
        NAME: '취소',
        STEPNO: 0
      }
    }
  },
  '00003': {
    NAME: '무평가',
    STATE: {
      NS001: {
        NAME: '차량정보등록',
        STEPNO: 1
      },
      NS002: {
        NAME: '신청완료',
        STEPNO: 2
      },
      NS003: {
        NAME: '예상견적확인',
        STEPNO: 3
      },
      NS004: {
        NAME: '차량상태점검',
        STEPNO: 4
      },
      NS005: {
        NAME: '견적완료 및 판매결정',
        STEPNO: 5
      },
      NS006: {
        NAME: '견적완료 및 판매결정',
        STEPNO: 6
      },
      NS101: {
        NAME: '취소',
        STEPNO: 0
      }
    }
  }
};

export const CNCL_RSN_TPCD = {
  CN01: '단순변심',
  CN02: '정보수정필요',
  CN03: '견적불만',
  CN04: '기타'
};

export const FAIL_RSN_TPCD = {
  f001: '매입단가 불일치',
  f002: '차량정보 불일치',
  f003: '고객성향 불량',
  f004: '기타'
};

export const REDU_ITM_TPCD = {
  R001: '외판이상',
  R002: '사고이력',
  R003: '차량정보 불일치(옵션등)',
  R004: '기타'
};

export const REQ_STT_PTEMP = '0001';
export const REQ_STT_PCOMP = '0002';
export const REQ_STT_PCNCL = '0003';
export const REQ_STT_PFINL = '0004';
export const REQ_STT_BIDDG = '0010';
export const REQ_STT_SDEAL = '0011';
export const AUCTSTT_ACNCL = '04';
export const AUCTSTTD_AVAIL = '000';
export const AUCTSTTD_DISBL = '001';
export const AUCTSTTD_BDING = '002';
export const AUCTSTTD_BDEND = '003';
export const AUCTSTTD_MOBID = '004';
export const BSSTTDTL_SUBB = "001";
export const BSSTTDTL_SUBB_DELAY = "002";

export const selfStt = new Object();
selfStt[REQ_STT_PTEMP]                 = {name:'임시저장',  activeNo:1, priceDp:0};
selfStt[REQ_STT_PCOMP]                 = {name:'신청완료',  activeNo:2, priceDp:0};
selfStt[REQ_STT_BIDDG] = new Object();
selfStt[REQ_STT_BIDDG][AUCTSTTD_AVAIL] = {name:'진행중',    activeNo:3, priceDp:2};
selfStt[REQ_STT_BIDDG][AUCTSTTD_DISBL] = {name:'진행중',    activeNo:3, priceDp:2};
selfStt[REQ_STT_BIDDG][AUCTSTTD_BDING] = {name:'진행중',    activeNo:3, priceDp:3};
selfStt[REQ_STT_BIDDG][AUCTSTTD_BDEND] = {name:'견적완료',  activeNo:4, priceDp:4};
selfStt[REQ_STT_BIDDG][AUCTSTTD_MOBID] = {name:'견적완료',  activeNo:4, priceDp:5};
selfStt[REQ_STT_SDEAL]                 = {name:'거래진행중',activeNo:5, priceDp:6};
selfStt[REQ_STT_PFINL]                 = {name:'거래완료',  activeNo:6, priceDp:6};
selfStt[REQ_STT_PCNCL]                 = new Object();
selfStt[REQ_STT_PCNCL][undefined]      = {name:'신청취소',  activeNo:0, priceDp:0};
selfStt[REQ_STT_PCNCL][AUCTSTT_ACNCL]  = {name:'신청완료',  activeNo:6, priceDp:1};
